const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuario = require('./usuario');
var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Tela Inicial - Index')
})

app.get(`/${usuario.atributo}`, (req, res) => {
    res.send(usuario.lista());
});

app.get(`/${usuario.atributo}/:id`, (req, res) => {
    res.send(usuario.porId(req.params.id));
});


app.post(`/${usuario.atributo}`, (req, res) => {
    res.send(usuario.adiciona({ id: null, nome: req.body.nome,idade: req.body.idade }));
});

app.put(`/${usuario.atributo}/:id`, (req, res) => {
    res.send(usuario.altera({ id: req.params.id, nome: req.body.nome,idade: req.body.idade }));
});

app.put(`/${usuario.atributo}`, (req, res) => {
    res.send(usuario.altera({ id: req.body.id, nome: req.body.nome, idade: req.body.idade }));
});


app.delete(`/${usuario.atributo}/:id`, (req, res) => {
    res.send(usuario.remove(req.params.id));
});

app.listen(3000)