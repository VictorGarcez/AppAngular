import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PessoasService } from '../pessoas.service';
import { CepService } from '../cep.service';
import { Pessoa } from '../Pessoa';
import { DatePipe, formatDate } from '@angular/common'

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent {
  
  formulario: any;
  formularioCep : any;
  pessoas: Pessoa[] | undefined;
  visibilidadeFormulario: boolean = false;
  tituloFormulario: string = "";
  idPessoa: any;
  
  



  constructor(private pessoasService : PessoasService, public datepipe: DatePipe, private cepService : CepService) {
    

  }
  ngOnInit() : void {
    this.pessoasService.Get().subscribe(res => {
      this.pessoas = res;
    });


    
  }

  exibirFormularioCadastro(): void {

    if(this.visibilidadeFormulario == false)
    {
      this.formulario= new FormGroup({
        nome: new FormControl(null),
        email: new FormControl(null),
        dataNasc: new FormControl(null),
        cep: new FormControl(null)
        });
      this.BuscarCep();
      this.tituloFormulario = "Adicionar Pessoa";
      this.visibilidadeFormulario = true;
    }  
    else{
      this.visibilidadeFormulario = false;
    }
  }
  fecharFormularioCadastro(): void {
    this.visibilidadeFormulario = false;
    this.idPessoa = null;
  }

  exibirFormularioAlteracao(idPessoa : any): void {
    this.tituloFormulario = "Atualizar Pessoa";
    debugger;
    this.pessoasService.GetById(idPessoa).subscribe(res => {
      this.idPessoa = idPessoa;
      this.formulario = new FormGroup({
        nome: new FormControl(res.nome),
        email: new FormControl(res.email),
        dataNasc: new FormControl(res.dataNasc),
        cep: new FormControl(res.cep)
        });

        this.BuscarCep();
        this.visibilidadeFormulario = true;
    })
  }

  excluirPessoa(idPessoa :any) : void{
    debugger;
    this.pessoasService.Delete(idPessoa).subscribe(res => {
      alert('Pessoa excluida com sucesso');
    });
  }

  BuscarCep(): void{
    if(this.formulario.value.cep != null){
      this.cepService.ConsultaCep(this.formulario.value.cep).subscribe(res => {
        
        this.formularioCep= new FormGroup({
          logradouro: new FormControl(res.logradouro),
          complemento: new FormControl(res.complemento),
          bairro: new FormControl(res.bairro),
          localidade: new FormControl(res.localidade),
          estado: new FormControl(res.uf),
          ddd: new FormControl(res.ddd)
          });
          
      })
    }
    else{
      this.formularioCep= new FormGroup({
        logradouro: new FormControl(null),
        complemento: new FormControl(null),
        bairro: new FormControl(null),
        localidade: new FormControl(null),
        estado: new FormControl(null),
        ddd: new FormControl(null)
      });
    }
  }


  enviarFormulario() : void {
    const pessoa : Pessoa = this.formulario.value;
    if(this.idPessoa != undefined){
      pessoa.idPessoa = this.idPessoa;
      this.pessoasService.Update(pessoa).subscribe( res =>  {
        alert('Atualizado com sucesso')
        this.fecharFormularioCadastro();

      });
    }
    else{
      this.pessoasService.Add(pessoa).subscribe(resultado => {
        alert('Inserido com sucesso')
      });
    }
  }
}
