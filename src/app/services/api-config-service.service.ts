import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  
  private readonly apiUrl: string = 'http://localhost:8080';

  getApiUrl(): string {
    return this.apiUrl;
  }

}
