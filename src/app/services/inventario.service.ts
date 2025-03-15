import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Impuesto } from '../domain/impuesto.model';

/**
 * Servicio para gestionar los documentos de inventario.
 */
@Injectable({
  providedIn: 'root'
})
export class InventarioService {

    /**
   * URL base de la API para los documentos de inventario.
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
      this.apiUrl = `${apiConfigService.getApiUrl()}/reportes`;
  }

  /**
   * Obtiene el token de autenticación almacenado en localStorage.
   * @returns El token JWT como string.
   */
  private getAuthToken(): string {
      return localStorage.getItem('token') || '';
  }

  /**
   * Recupera el reporte de inventario actual
   */
  descargarReporteInventario(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`, // Incluye el token JWT
      'Accept': 'application/pdf' // Indica que esperas un PDF como respuesta
    });
  
    return this.http.get(`${this.apiUrl}/inventario`, { headers, responseType: 'blob' }).pipe(
      catchError(this.manejarError)
    );
  }

  /**
   * Manejo de errores para las solicitudes HTTP.
   */
  private manejarError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error al descargar el reporte de inventario. Inténtelo de nuevo más tarde.'));
  }

}