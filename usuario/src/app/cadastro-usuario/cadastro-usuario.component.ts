import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service'

@Component({
  selector: 'app-cadastro-usuario',
  template: `
     <ul>
        <li *ngFor="let item of lista">
          {{item.id}},   
          {{item.nome}},
          {{item.idade}} - 
          <button (click)="alterar(item.id)"> Alterar </button> - 
          <button (click)="deletar(item.id)"> X </button>
        </li>
     </ul>

     Nome:<input type="text" [(ngModel)]="nome" /> <br />
     Idade:<input type="text" [(ngModel)]="idade" /> <br /> <br />
     <button (click)="inserir()" >Inserir</button> <br /> <br />
  `,
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  nome = "";
  idade = "";
  lista = [];
  objeto = [];

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.atualiza();
  }

  atualiza() {
    this.usuarioService.consulta().then(
      usuarios => {this.lista = usuarios}
    );
  }

  inserir() {
    this.usuarioService.inserir(this.nome, this.idade)
    .then(()=>{
      this.nome="";
      this.idade="";
      this.atualiza();
    });
  }

  alterar(id) {
    this.usuarioService.alterar(id, this.nome, this.idade)
    .then(()=>{
      this.nome="";
      this.idade="";
      this.atualiza();
    });
  }

  deletar(id) {
    this.usuarioService.remover(id)
    .then(()=>{
      this.atualiza();
    });
  }
}