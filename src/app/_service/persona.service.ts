import { Persona } from './../_model/Persona';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = `${environment.HOST}\personas`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Persona[]>(this.url);
  }
}
