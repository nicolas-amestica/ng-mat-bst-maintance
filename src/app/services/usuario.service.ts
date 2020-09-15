import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { process } from '../../environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlListUsers = process.env.URL_API_USER + '/api/usuarios/listUsers';
  private urlListUsersByRut = process.env.URL_API_USER + '/api/usuarios/listByRut';
  private apikey = process.env.API_KEY_USER;

  header: HttpHeaders = new HttpHeaders();

  constructor( private http: HttpClient) {

  }

  listarUsuarios(): Observable<UsuarioModel[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.apikey,
        token: localStorage.getItem('token')
      })
    };

    return this.http.get<UsuarioModel[]>(this.urlListUsers, httpOptions)
      .pipe(
        map(resp => {
          return resp['Items'];
        })
      );

  }

  listarUsuariosByRut(rut: string): Observable<UsuarioModel[]> {

    const httpOptions = {
      headers: { 'x-api-key': this.apikey, token: localStorage.getItem('token') },
      params: { rut }
    };

    return this.http.get<UsuarioModel[]>(this.urlListUsersByRut, httpOptions )
      .pipe(
        map(resp => {
          return resp['Item'];
        })
      );

  }

}
