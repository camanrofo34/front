import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Descuento } from '../domain/descuento.model';


/**
 * Servicio para gestionar los descuentos en la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  /**
   * URL base de la API para los descuentos.
   */
  private apiUrl: string;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a la API.
   * @param apiConfigService Servicio de configuración de la API.
   */
  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {
      this.apiUrl = `${apiConfigService.getApiUrl()}/descuentos`;
   }

  /**
   * Obtiene el token de autenticación almacenado en localStorage.
   * @returns El token JWT como string.
   */
  private getAuthToken(): string {
      return localStorage.getItem('token') || '';
  }
    
  /**
   * Lista todos los descuentos disponibles.
   * @returns Un observable con un array de descuentos.
   */
  listarDescuentos(): Observable<Descuento[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.get<Descuento[]>(this.apiUrl, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo de errores en las solicitudes HTTP.
   * @param error Objeto de error HTTP.
   * @returns Un observable que lanza un error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
      console.error('An error occurred:', error);
      return throwError('Something bad happened; please try again later.');
  }
}
