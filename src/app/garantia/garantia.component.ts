import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-garantia',
  imports: [CommonModule, FormsModule],
  templateUrl: './garantia.component.html',
  styleUrl: './garantia.component.css'
})
export class GarantiaComponent {

  constructor() {

  }
  
  kmUso: number = 0;
  fechaCompra: string = "yyyy-mm-dd";
  garantia: boolean | null = null;

  public validarGarantia(): void  {
    if (this.kmUso < 0 || this.fechaCompra == "yyyy-mm-dd" || new Date(this.fechaCompra).getTime() > new Date().getTime()) {
      this.garantia = null;
      alert("Los valores de km o fecha son incorrectos");
      return;
    }
    this.garantia = this.kmUso <= 50000 && new Date(this.fechaCompra).getTime() >= new Date().getTime() - (3 * 365 * 24 * 60 * 60 * 1000);

    if (this.garantia) {
      Swal.fire({
        title: '!El producto cumple con la garantía!',
        text: 'El producto se encuentra dentro del periodo y distancia recorrida de garantía. A continuación se le brindará información' +
        ' para el agendamiento de cita de la revisión del vehículo.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } else {
      Swal.fire({
        title: '!El producto no cumple con la garantía!',
        text: 'El producto no se encuentra dentro del periodo y distancia recorrida de garantía.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
    this.garantia = null;
    this.kmUso = 0;
    this.fechaCompra = "yyyy-mm-dd";
  }

}
