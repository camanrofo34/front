import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 importar esto
import { GestionCajaComponent } from './gestion-caja/gestion-caja.component';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, FormsModule, ], 
  templateUrl: './app-caja.component.html',
  styleUrls: ['./app-caja.component.css']
})
export class AppCajaComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username && this.password) {
      this.router.navigate(['/caja/gestion']);
    } else {
      alert('Por favor, complete ambos campos');
    }
  }
}