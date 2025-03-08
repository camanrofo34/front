import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';

/**
 * @class ModifyComponentVehiculos
 * @description Componente para modificar los datos de un vehículo existente en el sistema.
 * Permite cargar los datos del vehículo, validarlos y actualizar la información.
 *
 * @author Tu Nombre <tuemail@example.com>
 */
@Component({
  selector: 'app-app-modify', // Selector del componente
  templateUrl: './app-modify.component.html', // Ruta de la plantilla HTML
  styleUrl: './app-modify.component.css', // Ruta del archivo de estilos
  imports: [RouterModule, FormsModule, CommonModule] // Módulos requeridos
})
export class ModifyComponentVehiculos implements OnInit {

  /**
   * Objeto que almacena los datos del vehículo a modificar.
   * @type {Vehiculo}
   */
  vehiculo: Vehiculo = {
    idVehiculo: 0,
    nombre: '',
    marca: '',
    modelo: '',
    descripcion: '',
    stock:  0,
    precio: 0
  };

  /**
   * ID del vehículo a modificar, obtenido de la URL.
   * @type {number}
   */
  idVehiculo: number = 0;

  /**
   * @constructor
   * @param {ActivatedRoute} route - Servicio para capturar parámetros de la URL.
   * @param {VehiculoService} vehiculosService - Servicio para gestionar vehículos.
   * @param {Router} router - Servicio para redirigir a otras páginas.
   */
  constructor(
    private route: ActivatedRoute,
    private vehiculosService: VehiculoService,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.  
   * Obtiene el ID del vehículo desde la URL y carga sus datos.
   * @returns {void}
   */
  ngOnInit(): void {
    this.idVehiculo = +this.route.snapshot.paramMap.get('idVehiculo')!;

    if (this.idVehiculo) {
      this.cargarVehiculo(this.idVehiculo);
    }
  }

  /**
   * @method cargarVehiculo
   * @description Carga los datos del vehículo desde el servicio usando su ID.
   * @param {number} idVehiculo - ID del vehículo a cargar.
   * @returns {void}
   */
  cargarVehiculo(idVehiculo: number): void {
    this.vehiculosService.buscarVehiculoPorId(idVehiculo).subscribe({
      next: (data) => {
        this.vehiculo = data;
      },
      error: (error) => {
        console.error('Error al cargar vehículo:', error);
      }
    });
  }

  /**
   * @method validarRequeridos
   * @description Verifica que los campos obligatorios estén llenos.
   * @returns {boolean} Retorna `true` si algún campo está vacío, de lo contrario `false`.
   */
  validarRequeridos(): boolean {
    return this.vehiculo.nombre.trim() === '' || 
           this.vehiculo.descripcion.trim() === '' || 
           this.vehiculo.modelo.trim() === '' || 
           this.vehiculo.precio === 0;
  }

  /**
   * @method validarPrecio
   * @description Verifica que el precio del vehículo sea mayor a 0.
   * @param {number} precio - Precio ingresado para el vehículo.
   * @returns {boolean} Retorna `true` si el precio es válido, de lo contrario `false`.
   */
  validarPrecio(precio: number): boolean {
    return precio > 0;
  }

  /**
   * @method validarStock
   * @description Verifica que el stock del vehículo sea mayor a 0.
   * @param {number} stock - Cantidad en stock del vehículo.
   * @returns {boolean} Retorna `true` si el stock es válido, de lo contrario `false`.
   */
  validarStock(stock: number): boolean {
    return stock > 0;
  }

  /**
   * @method onSubmit
   * @description Valida los datos y envía la solicitud para actualizar el vehículo.  
   * En caso de éxito, redirige a la lista de gestión de vehículos.
   * @returns {void}
   */
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
          console.log('Vehículo actualizado correctamente');
          this.router.navigate(['/vehiculos/gestion']); // Redirigir a la página de gestión
        },
        error: (error) => {
          console.error('Error al actualizar vehículo:', error);
          alert('Error al actualizar vehículo. Inténtalo de nuevo.');
        }
      });
    }
  }
}
