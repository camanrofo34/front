import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Cliente } from '../domain/cliente.model';


@Injectable({
    providedIn: 'root'
  })
export class ClienteService {

    private apiUrl: string;

    constructor(private http: HttpClient, 
        private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${apiConfigService.getApiUrl()}/clientes`;
     }

      // Método para obtener el token JWT desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

      // Método para crear un cliente
      crearCliente(cliente : Cliente): Observable<Cliente> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        const { idCliente, ...clienteSinId } = cliente; 
    
        return this.http.post<Cliente>(this.apiUrl, clienteSinId, { headers }).pipe(
          catchError(this.handleError)
        );
      }
      
    
      // Método para listar todos los clientes
      listarClientes(): Observable<Cliente[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Cliente[]>(this.apiUrl, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para buscar un cliente por ID
      buscarClientePorId(id: number): Observable<Cliente> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para buscar clientes por nombre legal
      buscarClientePorNombreLegal(nombreCliente: string): Observable<Cliente[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Cliente[]>(`${this.apiUrl}/buscar?nombreLegal=${nombreCliente}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para actualizar un cliente
      actualizarCliente(id: number, cliente: Cliente): Observable<void> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.put<void>(`${this.apiUrl}/${id}`, cliente, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para eliminar un cliente
      eliminarCliente(id: number): Observable<void> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }

    // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}