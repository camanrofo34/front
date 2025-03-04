import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GestionListaVehiculosComponent } from "./app-gestion-lista/app-gestion-lista.component";


@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './app-gestion.component.html',
  styleUrls: ['./app-gestion.component.css'],
  imports: [GestionListaVehiculosComponent, FormsModule, CommonModule, RouterModule, GestionListaVehiculosComponent]
})
export class GestionVehiculosComponent implements OnInit {
  searchTerm: string = ''; // Término de búsqueda
  vehiculosFiltrados: Vehiculo[] = []; // Lista de vehículos filtrados
  allVehiculos: Vehiculo[] = []; // Lista completa de vehículos
  searchId: number | null = null;
  constructor(private vehiculoService: VehiculoService, 
  private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos(); // Cargar todos los vehículos al iniciar
  }

  // Método para cargar todos los vehículos
  cargarVehiculos(): void {
    this.vehiculoService.listarVehiculos().subscribe({
      next: (data) => {
        this.allVehiculos = data; // Guardar la lista completa de vehículos
        this.vehiculosFiltrados = data; // Mostrar todos los vehículos inicialmente
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    });
  }

  // Método para buscar vehículos
  buscarVehiculos(): void {
    if (this.searchTerm.trim()) {
        this.vehiculoService.buscarVehiculoPorNombreUsuario(this.searchTerm).subscribe({
        next: (data) => {
            this.vehiculosFiltrados = data; // Mostrar vehículos filtrados
            }
        });
    } else {
      this.vehiculosFiltrados = this.allVehiculos; // Si no hay término de búsqueda, mostrar todos los vehículos
    }
  }

  buscarVehiculoPorId(): void {
    if (this.searchId === null) {
      this.vehiculoService.listarVehiculos().subscribe({
        next: (data) => {
            this.vehiculosFiltrados = data;
        }
    });
      return;
    }else{
      this.vehiculoService.buscarVehiculoPorId(this.searchId).subscribe({
        next: (data) => {
            this.vehiculosFiltrados = [data];
        },
        error: (error) => {
            console.error('No existe vehículo con ese id', error);
            this.vehiculosFiltrados = [];
        }
    });
  }
}

  cerrarSesion(): void {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/clientes']);

  }
}