import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GestionListaVehiculosComponent } from "./app-gestion-lista/app-gestion-lista.component";
import { InventarioService } from '../../services/inventario.service';

/**
 * Componente encargado de la gestión de vehículos.
 * Permite listar, buscar por nombre y buscar por ID, además de manejar la sesión del usuario.
 * @class GestionComponentVehiculos
 * @component GestionComponentVehiculos
 * @style ./app-gestion.component.css
 */
@Component({
  selector: 'app-gestion-vehiculos', // Selector del componente en el HTML
  templateUrl: './app-gestion.component.html', // Archivo de plantilla asociado
  styleUrls: ['./app-gestion.component.css'], // Archivo de estilos asociado
  imports: [GestionListaVehiculosComponent, FormsModule, CommonModule, RouterModule] // Módulos requeridos
})
export class GestionVehiculosComponent implements OnInit {

  /**
   * Término de búsqueda utilizado para filtrar vehículos por nombre.
   */
  searchTerm: string = '';

  /**
   * Lista de vehículos filtrados según la búsqueda.
   */
  vehiculosFiltrados: Vehiculo[] = [];

  /**
   * Lista completa de vehículos obtenidos del servicio.
   */
  allVehiculos: Vehiculo[] = [];

  /**
   * ID del vehículo a buscar.
   */
  searchId: number | null = null;

  /**
   * Constructor del componente.
   * @param vehiculoService Servicio para gestionar vehículos.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(
    private vehiculoService: VehiculoService, 
    private inventarioService: InventarioService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente cargando la lista de vehículos.
   */
  ngOnInit(): void {
    this.cargarVehiculos();
  }

  /**
   * Carga la lista completa de vehículos desde el servicio.
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
   * Filtra los vehículos por nombre utilizando el término de búsqueda.
   * Si no se introduce un nombre, se muestran todos los vehículos.
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
   * Busca un vehículo específico por su ID.
   * Si no se proporciona un ID, se vuelve a listar todos los vehículos.
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

  generarReporte(): void {
    this.inventarioService.descargarReporteInventario().subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (error) => {
        console.error('Error al descargar el reporte:', error);
      }
    });
  }

  /**
   * Cierra la sesión del usuario eliminando los datos de almacenamiento local y de sesión.
   * Luego, redirige a la página de clientes.
   */
  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/clientes']);
  }
}
