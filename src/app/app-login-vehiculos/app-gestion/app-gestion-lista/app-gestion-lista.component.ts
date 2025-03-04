import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from '../../../domain/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculos.service';

@Component({
  selector: 'app-gestion-lista-vehiculos',
  templateUrl: './app-gestion-lista.component.html',
  styleUrls: ['./app-gestion-lista.component.css']
})
export class GestionListaVehiculosComponent {
  @Input() vehiculosFiltrados: Vehiculo[] = [];
  @Output() vehiculoActualizado = new EventEmitter<void>();

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  // Método para modificar un vehículo
  modificarVehiculo(id: number): void {
    this.router.navigate(['/vehiculos/modify', id]); // Navegar a la página de modificación
  }

  // Método para eliminar un vehículo
  eliminarVehiculo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(id).subscribe({
        next: () => {
          console.log('Vehículo eliminado:', id);
          this.vehiculoActualizado.emit(); // Notificar al componente padre que se actualizó un vehículo
        },
        error: (error) => {
          console.error('Error al eliminar vehículo:', error);
          alert('Error al eliminar vehículo. Inténtalo de nuevo.');
        }
      });
    }
  }
}