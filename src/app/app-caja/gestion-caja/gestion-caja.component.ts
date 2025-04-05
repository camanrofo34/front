import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-caja.component.html',
  styleUrls: ['./gestion-caja.component.css']
})
export class GestionCajaComponent {
  facturas = [
    { id: 1, cliente: 'Juan Pérez', descripcion: 'Compra de productos A y B', total: 150000 },
    { id: 2, cliente: 'María López', descripcion: 'Servicios prestados', total: 230000 },
    
  ];

  imprimirFactura(id: number) {
    console.log('Imprimir factura con id:', id);
    // Segun GPT, aquí se integra la lógica para generar el PDF con jsPDF, html2pdf o lo que william haya usado
  }
 
  trackById(index: number, item: any) {
    return item.id;
  }
}
