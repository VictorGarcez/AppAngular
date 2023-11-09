import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from './Cep';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  url = 'https://viacep.com.br/ws/';
  type = 'json/';
  constructor(private http: HttpClient) { }

  ConsultaCep(cep: string) {
    return this.http.get<Cep>(`${this.url}/${cep}/${this.type}`);
  }
}
