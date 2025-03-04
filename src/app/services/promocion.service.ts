import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {}

  getVehiculos(): Observable<any> {
    return this.http.get(`${this.apiConfigService.getApiUrl()}/promocion`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError('Error en la petición al servidor');
  }
}