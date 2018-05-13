const fs = require("fs");
let lista = [];
const atributo = "usuario";
module.exports.atributo = atributo;
lista = JSON.parse(fs.readFileSync(atributo + ".json"));

module.exports.adiciona = (item) => {
    if (lista.length == 0) {
        item.id = 1;
    }
    else {
        item.id = lista[lista.length - 1].id + 1;
    }
    lista.push(item);
    fs.writeFileSync(atributo + ".json", JSON.stringify(lista));
    return item;
}

module.exports.lista = () => {
    return lista;
}

module.exports.porId = (id) => {
    let i = lista.find(item => item.id == id);
    if (i) {
        return i;
    }
    return {};
}

module.exports.altera = (item) => {
    let r = {};
    lista.forEach(it => {
        if (it.id == item.id) {
            console.log(it, item, it.id == item.id, it.id === item.id);
            it.nome = item.nome;
            r = it;
            fs.writeFileSync(atributo + ".json", JSON.stringify(lista));
        }
    })
    return r;
}

module.exports.remove = (id) => {
    let r = { id: id, nome: null };
    lista = lista.filter(it => it.id != id);
    fs.writeFileSync(atributo + ".json", JSON.stringify(lista));
    return r;
}