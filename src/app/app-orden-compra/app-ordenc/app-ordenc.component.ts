import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOrdencTablaComponent} from "./app-ordenc-tabla/app-ordenc-tabla.component";
import { OrdenCompraDTO } from '../../domain/orden-compra-dto.model';
import { OrdenVehiculoDTO } from '../../domain/orden-vehiculo-dto.model';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-ordenc',
  imports: [CommonModule, AppOrdencTablaComponent, FormsModule, CommonModule],
  templateUrl: './app-ordenc.component.html',
  styleUrl: './app-ordenc.component.css'
})
export class AppOrdencComponent {

constructor(
  private ordenCompraService: OrdenCompraService
) { }


ordenCompra: OrdenCompraDTO = new OrdenCompraDTO();
refrescarListas: boolean = false;


actualizarOrdenVehiculos(ordenVehiculos: OrdenVehiculoDTO[]) {
  this.ordenCompra.ordenVehiculos = ordenVehiculos;
}

guardarOrden() {
  this.ordenCompra.fecha = new Date().toISOString();

  console.log('Orden a guardar:', this.ordenCompra);

  this.ordenCompraService.crearOrdenCompra(this.ordenCompra).subscribe({
    next: (respuesta) => {
      console.log('Respuesta del servidor:', respuesta);
      alert(`Orden guardada exitosamente. Respuesta: ${JSON.stringify(respuesta)}`);
      this.emitirActualizacion();
    },
    error: (error) => {
      console.error('Error al guardar orden', error);
      alert('Error al guardar la orden');
    }
  });
}

emitirActualizacion() {
  this.refrescarListas = true;
  setTimeout(() => {
    this.refrescarListas = false; // Reinicio para permitir futuras actualizaciones
  });
}




}