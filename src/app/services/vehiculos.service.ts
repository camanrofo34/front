import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Vehiculo } from '../domain/vehiculo.model';


@Injectable({
    providedIn: 'root'
  })
export class VehiculoService {

    private apiUrl: string;

    constructor(private http: HttpClient, 
      private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${apiConfigService.getApiUrl()}/vehiculos`;
     }

      // Método para obtener el token JWT desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

      // Método para crear un vehiculo
      crearVehiculo(vehiculo : Vehiculo): Observable<Vehiculo> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        const { idVehiculo, ...vehiculoSinId } = vehiculo; 
    
        return this.http.post<Vehiculo>(this.apiUrl, vehiculoSinId, { headers }).pipe(
          catchError(this.handleError)
        );
      }
      
    
      // Método para listar todos los clientes
      listarVehiculos(): Observable<Vehiculo[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Vehiculo[]>(this.apiUrl, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para buscar un vehiculo por ID
      buscarVehiculoPorId(id: number): Observable<Vehiculo> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Vehiculo>(`${this.apiUrl}/${id}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para buscar clientes por nombre legal
      buscarVehiculoPorNombreUsuario(nombreVehiculo: string): Observable<Vehiculo[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Vehiculo[]>(`${this.apiUrl}/buscar?nombre=${nombreVehiculo}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para actualizar un cliente
      actualizarVehiculo(id: number, vehiculo: Vehiculo): Observable<void> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.put<void>(`${this.apiUrl}/${id}`, vehiculo, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Método para eliminar un vehiculo
      eliminarVehiculo(id: number): Observable<void> {
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