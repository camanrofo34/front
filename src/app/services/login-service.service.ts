import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl = 'http://127.0.0.1:8080'; // URL de tu API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiUrl}/autenticacion/login-adminusuarios`, body, {
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