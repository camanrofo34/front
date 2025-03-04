import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Para redirigir después del registro
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class RegistroComponentVehiculos {
  vehicle: Vehiculo = {
    idVehiculo: 0,
    nombre: '',
    descripcion: '',
    marca: 'Speedorz',
    modelo: '',
    stock: 0,
    precio: 0
  }; // Objeto para almacenar los datos del vehículo

  constructor(
    private vehiculoService: VehiculoService, // Inyecta el servicio VehiculoService
    private router: Router // Inyecta el Router para redirigir
  ) {}


  // Método para validar el formulario
  validarRequeridos(): boolean {
    return this.vehicle.nombre.trim() === '' || this.vehicle.descripcion.trim() === '' || this.vehicle.modelo.trim() === '' || this.vehicle.stock === 0 || this.vehicle.precio === 0;
  }

  // Método para validar el precio
  validarPrecio(precio: number): boolean {
    return precio > 0;
  }

  // Método para validar el stock
  validarStock(stock: number): boolean {
    return stock > 0;
  }


  // Método para registrar el vehículo
  registerVehicle(): void {
    if (this.validarRequeridos()){
      alert('Todos los campos son requeridos.');
      return;
    }
    if (!this.validarPrecio(this.vehicle.precio)){
      alert('El precio debe ser mayor a 0.');
      return;
    }
    if (!this.validarStock(this.vehicle.stock)){
      alert('El stock debe ser mayor a 0.');
      return;
    }
    this.vehiculoService.crearVehiculo(this.vehicle).subscribe({
      next: (response) => {
        console.log('Vehículo registrado:', response);
        this.irAListaVehiculos(); // Redirigir a la lista de vehículos después del registro
      },
      error: (error) => {
        console.error('Error al registrar vehículo:', error);
        alert('Error al registrar vehículo. Inténtalo de nuevo.');
      }
    });
  }

  // Método para redirigir a la lista de vehículos
  irAListaVehiculos(): void {
    this.router.navigate(['/vehiculos/gestion']); // Redirigir a la lista de vehículos
  }
}