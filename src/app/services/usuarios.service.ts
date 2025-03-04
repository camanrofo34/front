import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../domain/usuario.model'; // Importa la clase Usuario
import { ApiConfigService } from './api-config-service.service';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl: string;

  constructor(private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.getApiUrl()}/usuarios`;
  }

  // Método para obtener el token JWT desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  

  // Método para crear un usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    const { idUsuario, ...usuarioSinId } = usuario; 

    return this.http.post<Usuario>(this.apiUrl, usuarioSinId, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  // Método para listar todos los usuarios
  listarUsuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.get<Usuario[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para buscar un usuario por ID
  buscarUsuarioPorId(id: number): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para buscar usuarios por nombre de usuario
  buscarUsuarioPorNombreUsuario(nombreUsuario: string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?nombreUsuario=${nombreUsuario}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar un usuario
  actualizarUsuario(id: number, usuario: Usuario): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para cambiar el estado de un usuario
  cambiarEstadoUsuario(id: number, estado: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.patch<void>(`${this.apiUrl}/${id}/estado?estado=${estado}`, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}