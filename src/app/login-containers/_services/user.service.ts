import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IIncidenteFormInterface, IDetalleItem, IncidenteAreaEnum, IncidenteDetallesEnum } from '../../servicios/evento-operaciones.interface';

import { User } from '../_models/user';

import { catchError, delay } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class UserService {

    private config = {
        apiUrl: 'http://localhost:4000'
      };
    private handleError: HandleError;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.config.apiUrl}/users`);
    }

    getOne(usuario: String, token: String) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`})
      };
      return this.http.get<User[]>(`${this.config.apiUrl}/users/one/${usuario}`, httpOptions)
      .pipe(map(user => {
        return user;
    }));
  }

    register(user: User) {
        return this.http.post(`${this.config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.config.apiUrl}/users/${id}`);
    }
}