import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Descuento } from '../domain/descuento.model';


@Injectable({
    providedIn: 'root'
  })
export class DescuentoService {

    private apiUrl: string;

    constructor(private http: HttpClient, 
      private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${apiConfigService.getApiUrl()}/descuentos`;
     }

      // Método para obtener el token JWT desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }
      
      // Método para listar todos los clientes
      listarDescuentos(): Observable<Descuento[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
        });
    
        return this.http.get<Descuento[]>(this.apiUrl, { headers }).pipe(
          catchError(this.handleError)
        );
      }


    // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}