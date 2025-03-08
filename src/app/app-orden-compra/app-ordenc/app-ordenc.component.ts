import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOrdencTablaComponent } from "./app-ordenc-tabla/app-ordenc-tabla.component";
import { OrdenCompraDTO } from '../../domain/orden-compra-dto.model';
import { OrdenVehiculoDTO } from '../../domain/orden-vehiculo-dto.model';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { FormsModule } from '@angular/forms';

/**
 * @class AppOrdencComponent
 * @description Componente para la gestión de órdenes de compra.  
 * Permite la actualización de vehículos en la orden y su almacenamiento en el servidor.
 *
 * @author Tu Nombre <tuemail@example.com>
 */
@Component({
  selector: 'app-app-ordenc', // Selector del componente
  imports: [CommonModule, AppOrdencTablaComponent, FormsModule, CommonModule], // Módulos importados
  templateUrl: './app-ordenc.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './app-ordenc.component.css' // Ruta del archivo de estilos CSS
})
export class AppOrdencComponent {

  /**
   * @constructor
   * @param {OrdenCompraService} ordenCompraService - Servicio para gestionar órdenes de compra.
   */
  constructor(
    private ordenCompraService: OrdenCompraService
  ) { }

  /**
   * Representa la orden de compra en proceso.
   * @type {OrdenCompraDTO}
   */
  ordenCompra: OrdenCompraDTO = new OrdenCompraDTO();

  /**
   * Bandera utilizada para indicar si se debe refrescar la lista de órdenes.
   * @type {boolean}
   */
  refrescarListas: boolean = false;

  /**
   * @method actualizarOrdenVehiculos
   * @description Actualiza la lista de vehículos asociados a la orden de compra.
   * @param {OrdenVehiculoDTO[]} ordenVehiculos - Lista de vehículos a asignar a la orden.
   * @returns {void}
   */
  actualizarOrdenVehiculos(ordenVehiculos: OrdenVehiculoDTO[]): void {
    this.ordenCompra.ordenVehiculos = ordenVehiculos;
  }

  /**
   * @method guardarOrden
   * @description Guarda la orden de compra en el sistema.  
   * Asigna la fecha actual antes de enviarla al servicio y maneja la respuesta del servidor.
   * @returns {void}
   */
  guardarOrden(): void {
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

  /**
   * @method emitirActualizacion
   * @description Activa la bandera `refrescarListas` para notificar la actualización de las órdenes.  
   * Se reinicia después de un tiempo para permitir futuras actualizaciones.
   * @returns {void}
   */
  emitirActualizacion(): void {
    this.refrescarListas = true;
    setTimeout(() => {
      this.refrescarListas = false; // Reinicio para permitir futuras actualizaciones
    });
  }
}