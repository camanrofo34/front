import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-impuestos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-impuestos.component.html',
  styleUrls: ['./app-impuestos.component.css']
})
export class AppImpuestosComponent { 
  impuestoId: string = ''; // Propiedad para el ID del impuesto

  constructor(private router: Router) {}

  /**
   * @method onSubmit
   * @description Valida y procesa el formulario del impuesto.
   */
  onSubmit(): void {
    if (!this.impuestoId.trim()) {
      alert('Por favor, ingrese un ID de impuesto válido.');
      return;
    }
    console.log('Formulario enviado. ID del impuesto:', this.impuestoId);
  }

  /**
   * @method navegarAImpuesto
   * @description Redirige a la página de gestión de impuestos con el ID ingresado.
   */
  navegarAImpuesto(): void {
    if (!this.impuestoId.trim()) {
      alert('Ingrese un ID de impuesto válido antes de continuar.');
      return;
    }
    this.router.navigate(['/impuestos/gestion', this.impuestoId]);
  }
}
