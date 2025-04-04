import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 importar esto
import { GestionCajaComponent } from './gestion-caja/gestion-caja.component';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionCajaComponent], 
  templateUrl: './app-caja.component.html',
  styleUrls: ['./app-caja.component.css']
})
export class AppCajaComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Aquí va tu lógica de autenticación para caja
    console.log('Caja:', this.username);
    console.log('Contraseña:', this.password);
  }
}