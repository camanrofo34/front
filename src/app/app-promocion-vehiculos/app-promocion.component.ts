import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../domain/vehiculo.model';
import { PromocionService } from '../services/promocion.service';

@Component({
  selector: 'app-sample-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-promocion.component.html',
  styleUrls: ['./app-promocion.component.css']
})
export class SampleCustomerComponent {
  vehiculos : Vehiculo[] = [  ];


  constructor(private promocionService: PromocionService) {
    this.getVehiculos();
  }

    getVehiculos(): void {
        this.promocionService.getVehiculos().subscribe({
        next: (response) => {
            this.vehiculos = response;
        },
        error: (error) => {
            console.error('Error al obtener los vehículos', error);
        }
        });
    }

}