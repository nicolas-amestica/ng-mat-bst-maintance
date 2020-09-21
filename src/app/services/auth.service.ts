import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { process } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject<UsuarioModel>(new UsuarioModel);

  private url    = process.env.URL_API_AUTH + '/api/auth2';
  private apikey = process.env.API_KEY_AUTH;

  userToken: string;

  header: HttpHeaders = new HttpHeaders();

  constructor( private http: HttpClient) {

    this.leerToken();
    this.verifyCurrentSession();

  }

  verifyCurrentSession() {

    let currentSession = this.obtenerDataSession();
    if (currentSession) {
      this.setUserData(JSON.parse(currentSession));
    }

  }

  setUserData(user: UsuarioModel) {

    this.userData.next(user);

  }

  getUserData() {

    return this.userData.asObservable();

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    localStorage.removeItem('data');
    this.setUserData(new UsuarioModel());

  }

  login(usuario: UsuarioModel) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Api-Key': this.apikey,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true'

      })
    };

    const authData = {
      ...usuario
    };

    return this.http.post( this.url, authData, httpOptions )
      .pipe(
        map( resp => {
          this.guardarToken(resp['token'], resp['data']);
          return resp;
        })
      );

  }

  private guardarToken(idToken: string, user: UsuarioModel) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let userModel: UsuarioModel = {
      ID : user.ID,
      EMAIL: user.EMAIL,
      NOMBRE : user.NOMBRE,
      APATERNO : user.APATERNO,
      AMATERNO : user.AMATERNO,
      TOKEN : idToken,
      ISLOGGED : true
    };

    localStorage.setItem('data', JSON.stringify(userModel));

    let hoy = new Date();
    hoy.setSeconds(process.env.SEED_EXPIRE);

    localStorage.setItem('expira', JSON.stringify(hoy.getTime()));

    this.setUserData(userModel);

  }

  private leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  obtenerDataSession() {

    let currentSession = localStorage.getItem('data');
    return currentSession;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));

    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

  }

}
