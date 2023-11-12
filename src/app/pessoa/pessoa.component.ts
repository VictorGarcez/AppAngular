import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PessoasService } from '../pessoas.service';
import { CepService } from '../cep.service';
import { Pessoa } from '../Pessoa';
import { DatePipe, formatDate } from '@angular/common'
import DataTable from 'datatables.net-dt';

declare function CarregarDataTablePessoas(): void;

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent {
  
  formulario!: FormGroup;
  formularioCep! : FormGroup;
  pessoas: Pessoa[] | undefined;
  visibilidadeFormulario: boolean = false;
  tituloFormulario: string = "";
  idPessoa: any;
  
  constructor(private pessoasService : PessoasService, public datepipe: DatePipe, private cepService : CepService, private formBuilder: FormBuilder) {
    
  }
  ngOnInit() : void {
    this.pessoasService.Get().subscribe(res => {
      this.pessoas = res;
    });
      
      this.iniciarFormPessoa();
      this.iniciarFormCep();
      
  }
  ngAfterContentChecked() :void {
    CarregarDataTablePessoas();  
  }

  
  get nome(){
    return this.formulario.get('nome')!;
  }
  get email(){
    return this.formulario.get('email')!;
  }
  get dataNasc(){
    return this.formulario.get('dataNasc')!;
  }
  get cep(){
    return this.formulario.get('cep')!;
  }

  exibirFormularioCadastro(): void {

    this.formularioCep.reset();
    this.formulario.reset();
    if(this.visibilidadeFormulario == false)
    {
      
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
    this.pessoasService.GetById(idPessoa).subscribe(res => {
      this.idPessoa = idPessoa;
      this.formulario = this.formBuilder.group({
        nome: [res.nome, [Validators.required]],
        email: [res.email, [Validators.required, Validators.email]],
        dataNasc: [formatDate(res.dataNasc!, 'yyyy-MM-dd', 'en'), [Validators.required]],
        cep: [res.cep, [Validators.required]]
    });
        this.BuscarCep();
        this.visibilidadeFormulario = true;
    })
  }

  excluirPessoa(idPessoa :any) : void{
    this.pessoasService.Delete(idPessoa).subscribe(res => {
      alert('Pessoa excluida com sucesso');
    });
    window.location.reload();
  }

  BuscarCep(): void{
    if(this.formulario.value.cep != null && this.formulario.value.cep.length > 5){
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
      this.formularioCep.reset();
    }
  }

  iniciarFormCep(){
    this.formularioCep= new FormGroup({
      logradouro: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      estado: new FormControl(''),
      ddd: new FormControl('')
    });
    
  }
  iniciarFormPessoa(){
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataNasc: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required])
      });
  }
  enviarFormulario() : void {
    const pessoa : Pessoa = this.formulario.value;
    if(this.idPessoa != undefined){
      pessoa.idPessoa = this.idPessoa;
      this.pessoasService.Update(pessoa).subscribe( res =>  {
        alert('Atualizado com sucesso')
      });
    }
    else{
      this.pessoasService.Add(pessoa).subscribe(resultado => {
        alert('Inserido com sucesso')
      });
    }
    window.location.reload();
  }
}
