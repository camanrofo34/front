import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-repuestos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-repuestos.component.html',
  styleUrls: ['./app-repuestos.component.css']
})
export class AppRepuestosComponent {
  repuestos = [
    { id: 1, nombre: 'Filtro de aire', categoria: 'Motor', cantidad: 25, precio: 35000 },
    { id: 2, nombre: 'Pastillas de freno', categoria: 'Frenos', cantidad: 40, precio: 60000 },
    { id: 3, nombre: 'Aceite 10W40', categoria: 'Lubricantes', cantidad: 60, precio: 28000 },
  ];

  verDetalle(id: number) {
    console.log('Ver detalle del repuesto con ID:', id);
    // Aquí puedes enlazar con un modal, ruta o lógica de detalle
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
