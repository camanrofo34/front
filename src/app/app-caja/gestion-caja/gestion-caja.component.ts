import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-caja',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gestion-caja">
      <h2>Gestión de Caja</h2>
      <!-- Aquí va la lógica de gestión -->
    </div>
  `,
  styleUrls: ['./gestion-caja.component.css']
})
export class GestionCajaComponent {}
