import { InstanciaModel } from 'src/app/models/instancia.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { process } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstanciaService {

  instancia: InstanciaModel[];

  private urlListInstances = process.env.URL_API_INSTANCIA + '/api/instancias/listInstances';
  private urlApagarInstancia = process.env.URL_API_INSTANCIA + '/api/instancias/powerOff';
  private urlEcenderInstancia = process.env.URL_API_INSTANCIA + '/api/instancias/powerOn';
  private urlDescribeStatusInstancia = process.env.URL_API_INSTANCIA + '/api/instancias/describeStatus';
  private apikey = process.env.API_KEY_INSTANCIA;

  // header: HttpHeaders = new HttpHeaders();

  constructor( private http: HttpClient) { }

  listarInstancias(): Observable<any[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.apikey,
        token: localStorage.getItem('token')
      })
    };

    return this.http.get<InstanciaModel>(this.urlListInstances, httpOptions)
      .pipe(
        map(resp => {
          return resp['data'];
        })
      );

  }

  encenderInstancia(instanciaId): Observable<InstanciaModel[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.apikey,
        token: localStorage.getItem('token')
      })
    };

    const httpBody = [
      instanciaId
    ];

    return this.http.post(this.urlEcenderInstancia, httpBody, httpOptions)
      .pipe(
        map(resp => {
          return resp['data'].StartingInstances[0].CurrentState;
        })
      );

  }

  apagarInstancia(instanciaId): Observable<InstanciaModel[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.apikey,
        token: localStorage.getItem('token')
      })
    };

    const httpBody = [
      instanciaId
    ];

    return this.http.post(this.urlApagarInstancia, httpBody, httpOptions)
      .pipe(
        map(resp => {
          return resp['data'].StoppingInstances[0].CurrentState;
        })
      );

  }

  describeStatus(ID) {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.apikey,
        token: localStorage.getItem('token')
      })
    };

    const httpParams = new HttpParams()
      .set('ID', ID);

    return this.http.get<InstanciaModel>(`${this.urlDescribeStatusInstancia}?${httpParams.toString()}`, httpOptions)
      .pipe(
        map(resp => {
          return resp['data'];
        })
      );

  }

}