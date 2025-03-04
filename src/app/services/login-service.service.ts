import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {}

  loginAdminUsuarios(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-adminusuarios`, body, {
      headers: { 'Content-Type': 'application/json' }, // Configura el header para JSON
      responseType: 'text' // Indica que la respuesta es texto plano, no JSON
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token en localStorage
      }),
      catchError(this.handleError) // Maneja errores
    );
  }

  loginAdminRecepcion(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-recepcion`, body, {
      headers: { 'Content-Type': 'application/json' }, // Configura el header para JSON
      responseType: 'text' // Indica que la respuesta es texto plano, no JSON
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token en localStorage
      }),
      catchError(this.handleError) // Maneja errores
    );
  }

  loginSecretario(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-secretario`, body, {
      headers: { 'Content-Type': 'application/json' }, // Configura el header para JSON
      responseType: 'text' // Indica que la respuesta es texto plano, no JSON
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token en localStorage
      }),
      catchError(this.handleError) // Maneja errores
    );
  }

  loginAdminInventario(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-admininventario`, body, {
      headers: { 'Content-Type': 'application/json' }, // Configura el header para JSON
      responseType: 'text' // Indica que la respuesta es texto plano, no JSON
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token en localStorage
      }),
      catchError(this.handleError) // Maneja errores
    );
  }


  loginAsesorComercial(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-asesorcomercial`, body, {
      headers: { 'Content-Type': 'application/json' }, // Configura el header para JSON
      responseType: 'text' // Indica que la respuesta es texto plano, no JSON
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token en localStorage
      }),
      catchError(this.handleError) // Maneja errores
    );
  }


  logout(): void {
    localStorage.removeItem('token'); // Borra el token
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token guardado
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}