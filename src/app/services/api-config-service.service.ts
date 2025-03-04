import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  
  private readonly apiUrl: string = 'http://localhost:8081';

  getApiUrl(): string {
    return this.apiUrl;
  }

}
