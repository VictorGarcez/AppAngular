import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import * as ngxBootstrap from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasService } from './pessoas.service';
import { CepService } from './cep.service';
import { PessoaComponent } from './pessoa/pessoa.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DatePipe
  ],
  providers: [HttpClientModule, PessoasService, DatePipe, CepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
