import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private readonly apiUrl: string = environment.apiUrl;

  getApiUrl(): string {
    return this.apiUrl;
  }

}
