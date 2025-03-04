import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Descuento } from '../../../domain/descuento.model';
import { Impuesto } from '../../../domain/impuesto.model';
import { Vehiculo } from '../../../domain/vehiculo.model';
import { DescuentoService } from '../../../services/descuentos.service';
import { ImpuestoService } from '../../../services/impuestos.service';
import { VehiculoService } from '../../../services/vehiculos.service';
import { OrdenCompraService } from '../../../services/orden-compra.service';
import { OrdenVehiculoDTO } from '../../../domain/orden-vehiculo-dto.model';
import { PromocionService } from '../../../services/promocion.service';

@Component({
  selector: 'app-app-ordenc-tabla',
  imports: [],
  templateUrl: './app-ordenc-tabla.component.html',
  styleUrl: './app-ordenc-tabla.component.css'
})
export class AppOrdencTablaComponent implements OnInit {
    descuentos : Descuento[] = [];
    impuestos : Impuesto[] = [];
    vehiculos : Vehiculo[] = [];

    constructor(private descuentosService: DescuentoService,
        private impuestosService: ImpuestoService,
        private vehiculosService: PromocionService) 
    {    }

    ngOnInit(): void {
        this.descuentosService.listarDescuentos().subscribe({
            next: (descuentos) => {
                this.descuentos = descuentos;
            },
            error: (error) => {
                console.error('Error al obtener descuentos', error);
            }
        });

        this.impuestosService.listarImpuestos().subscribe({
            next: (impuestos) => {
                this.impuestos = impuestos;
            },
            error: (error) => {
                console.error('Error al obtener impuestos', error);
            }
        });

        this.vehiculosService.getVehiculos().subscribe({
            next: (vehiculos) => {
                this.vehiculos = vehiculos;
            },
            error: (error) => {
                console.error('Error al obtener vehículos', error);
            }
        });
    }

@Output() ordenVehiculosChange = new EventEmitter<OrdenVehiculoDTO[]>();

  ordenVehiculos: OrdenVehiculoDTO[] = [];

  actualizarOrden() {
    this.ordenVehiculos = this.vehiculos.map((vehiculo, index) => {
      const cantidadInput = (document.querySelectorAll('.input-box-cantidad')[index] as HTMLInputElement).value;
      const impuestosInput = (document.querySelectorAll('.input-box-impuestos')[index] as HTMLInputElement).value;
      const descuentosInput = (document.querySelectorAll('.input-box-descuentos')[index] as HTMLInputElement).value;

      return new OrdenVehiculoDTO(
        vehiculo.idVehiculo,
        Number(cantidadInput),
        descuentosInput.split(',').map(Number),
        impuestosInput.split(',').map(Number)
      );
    });

    this.ordenVehiculosChange.emit(this.ordenVehiculos);
  }

  @Input() refrescarListas: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refrescarListas'] && changes['refrescarListas'].currentValue) {
      this.actualizarListas();
    }
  }

  actualizarListas() {
    // Aquí recargas las listas de impuestos, descuentos y vehículos
    console.log('Actualizando listas del hijo...');
    this.ngOnInit();
  }
    
}