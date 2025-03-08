import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GestionListaVehiculosComponent } from "./app-gestion-lista/app-gestion-lista.component";

/**
 * @class GestionVehiculosComponent
 * @description Componente encargado de la gestión de vehículos.  
 * Permite listar, buscar por nombre y buscar por ID, además de manejar la sesión del usuario.
 */
@Component({
  selector: 'app-gestion-vehiculos', // Selector del componente
  templateUrl: './app-gestion.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./app-gestion.component.css'], // Ruta del archivo de estilos
  imports: [GestionListaVehiculosComponent, FormsModule, CommonModule, RouterModule] // Módulos requeridos
})
export class GestionVehiculosComponent implements OnInit {

  /**
   * Término de búsqueda utilizado para filtrar vehículos por nombre.
   * @type {string}
   */
  searchTerm: string = '';

  /**
   * Lista de vehículos filtrados según la búsqueda.
   * @type {Vehiculo[]}
   */
  vehiculosFiltrados: Vehiculo[] = [];

  /**
   * Lista completa de vehículos obtenidos del servicio.
   * @type {Vehiculo[]}
   */
  allVehiculos: Vehiculo[] = [];

  /**
   * ID del vehículo a buscar (si aplica).
   * @type {number | null}
   */
  searchId: number | null = null;

  /**
   * @constructor
   * @param {VehiculoService} vehiculoService - Servicio para gestionar vehículos.
   * @param {Router} router - Servicio para la navegación entre rutas.
   */
  constructor(
    private vehiculoService: VehiculoService, 
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.  
   * Carga la lista de vehículos al iniciar.
   * @returns {void}
   */
  ngOnInit(): void {
    this.cargarVehiculos();
  }

  /**
   * @method cargarVehiculos
   * @description Carga la lista completa de vehículos desde el servicio.
   * @returns {void}
   */
  cargarVehiculos(): void {
    this.vehiculoService.listarVehiculos().subscribe({
      next: (data) => {
        this.allVehiculos = data;
        this.vehiculosFiltrados = data;
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    });
  }

  /**
   * @method buscarVehiculos
   * @description Filtra los vehículos por nombre utilizando el término de búsqueda.
   * Si no se introduce un nombre, se muestran todos los vehículos.
   * @returns {void}
   */
  buscarVehiculos(): void {
    if (this.searchTerm.trim()) {
      this.vehiculoService.buscarVehiculoPorNombreUsuario(this.searchTerm).subscribe({
        next: (data) => {
          this.vehiculosFiltrados = data;
        },
        error: (error) => {
          console.error('Error al buscar vehículos:', error);
          this.vehiculosFiltrados = [];
        }
      });
    } else {
      this.vehiculosFiltrados = this.allVehiculos;
    }
  }

  /**
   * @method buscarVehiculoPorId
   * @description Busca un vehículo específico por su ID.
   * Si no se proporciona un ID, se vuelve a listar todos los vehículos.
   * @returns {void}
   */
  buscarVehiculoPorId(): void {
    if (this.searchId === null) {
      this.cargarVehiculos();
    } else {
      this.vehiculoService.buscarVehiculoPorId(this.searchId).subscribe({
        next: (data) => {
          this.vehiculosFiltrados = [data];
        },
        error: (error) => {
          console.error('No existe vehículo con ese ID:', error);
          this.vehiculosFiltrados = [];
        }
      });
    }
  }

  /**
   * @method cerrarSesion
   * @description Cierra la sesión del usuario eliminando los datos de almacenamiento local y de sesión.
   * Luego, redirige a la página de clientes.
   * @returns {void}
   */
  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/clientes']);
  }
}