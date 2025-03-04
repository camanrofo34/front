import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { OrdenCompraDTO } from '../domain/orden-compra-dto.model';
import { OrdenCompra } from '../domain/orden-compra.model';


@Injectable({
    providedIn: 'root'
  })
export class OrdenCompraService {

    private apiUrl: string;

    constructor(private http: HttpClient, 
      private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${apiConfigService.getApiUrl()}/ordenescompra`;
     }

      // Método para obtener el token JWT desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }
      
      // Método para listar todos los clientes
  crearOrdenCompra(ordenCompraDTO: OrdenCompraDTO): Observable<OrdenCompra> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.post<OrdenCompra>(this.apiUrl, ordenCompraDTO, { headers }).pipe(
      catchError(this.handleError)
    );
  }


    // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}