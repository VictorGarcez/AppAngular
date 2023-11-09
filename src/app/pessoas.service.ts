import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
url = 'https://localhost:44388/api/Pessoas';
  constructor(private http: HttpClient) { }

  Get() : Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  GetById(idPessoa: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${idPessoa}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  Add(pessoa : Pessoa) : Observable<any> {
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  Update(pessoa: Pessoa) : Observable<any> {
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }
  Delete(idPessoa: number) :Observable<any> {
    const apiUrl = `${this.url}/${idPessoa}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
