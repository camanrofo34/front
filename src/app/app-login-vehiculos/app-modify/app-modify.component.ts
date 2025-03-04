import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-app-modify',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app-modify.component.html',
  styleUrl: './app-modify.component.css'
})

export class ModifyComponentVehiculos implements OnInit{
    vehiculo: Vehiculo = {
        idVehiculo : 0,
      nombre: '',
      marca: '',
      modelo: '',
      descripcion: '',
      stock:  0,
      precio: 0
    }
    idVehiculo : number = 0;
  constructor(
    private route: ActivatedRoute, // Servicio para capturar parámetros de la ruta
    private vehiculosService : VehiculoService, // Servicio para obtener los datos del usuario
    private router: Router // Servicio para redirigir a otras páginas
  ) {}

  ngOnInit(): void {
    // Capturar el parámetro idUsuario de la URL
    this.idVehiculo = +this.route.snapshot.paramMap.get('idVehiculo')!;

    // Si el idUsuario es válido, cargar los datos del usuario
    if (this.idVehiculo) {
      this.cargarVehiculo(this.idVehiculo);
    }
  }

  // Método para cargar los datos del usuario
  cargarVehiculo(idVehiculo: number): void {
    this.vehiculosService.buscarVehiculoPorId(idVehiculo).subscribe({
      next: (data) => {
        this.vehiculo = data; // Asignar los datos del usuario
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      }
    });
  }

  validarRequeridos(): boolean {
    return this.vehiculo.nombre.trim() === '' || this.vehiculo.descripcion.trim() === '' || this.vehiculo.modelo.trim() === '' || this.vehiculo.precio === 0;
  }

  // Método para validar el precio
  validarPrecio(precio: number): boolean {
    return precio > 0;
  }

  // Método para validar el stock
  validarStock(stock: number): boolean {
    return stock > 0;
  }

  onSubmit(): void {
    if (this.vehiculo && this.idVehiculo) {
      if (this.validarRequeridos()) {
        alert('Todos los campos son requeridos.');
        return;
      }
      if (!this.validarPrecio(this.vehiculo.precio)) {
        alert('El precio debe ser mayor a 0.');
        return;
      }
      if (!this.validarStock(this.vehiculo.stock)) {
        alert('El stock debe ser mayor a 0.');
        return;
      }
      this.vehiculosService.actualizarVehiculo(this.vehiculo.idVehiculo, this.vehiculo).subscribe({
        next: () => {
          console.log('Vehiculo actualizado correctamente');
          this.router.navigate(['/vehiculos/gestion']); // Redirigir a la página de gestión
        },
        error: (error) => {
          console.error('Error al actualizar vehiculo:', error);
          alert('Error al actualizar vehiculo. Inténtalo de nuevo.');
        }
      });
    }
}
}