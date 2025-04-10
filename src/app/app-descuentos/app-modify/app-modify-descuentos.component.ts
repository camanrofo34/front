import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Impuesto } from '../../domain/impuesto.model';
import { ImpuestoService } from '../../services/impuestos.service';
import { Descuento } from '../../domain/descuento.model';
import { DescuentoService } from '../../services/descuentos.service';

/**
 * @class LoginComponentClientes
 * @description 
 * Componente de login para clientes.
 */
@Component({
  selector: 'app-app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-modify-descuentos.component.html',
  styleUrls: ['./app-modify-descuentos.component.css']
})
export class ModifyComponentDescuentos implements OnInit {

    descuento: Descuento = {
        id: 0,
        nombre: '',
        porcentaje: 0,
        descripcion: ''
    };

    idDescuento: number | null = null;

    constructor(private router: Router,
        private descuentoService: DescuentoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('idDescuento');
        this.idDescuento = idParam ? +idParam : null;
        console.log('ID del descuento:', this.idDescuento);
        if (this.idDescuento) {
          this.cargarDescuento(this.idDescuento);
        }
    }

    /**
     * @method cargarImpuesto
     * @description Obtiene el impuesto desde el servicio.
     */
    cargarDescuento(id: number): void {
        this.descuentoService.obtenerDescuento(id).subscribe({
            next: (data) => {
                this.descuento = data;
            },
            error: (error) => {
                console.error('Error al cargar impuesto:', error);
                alert('No se pudo obtener el impuesto.');
            }
        });
    }


    /**
     * @method onSubmit
     * @description Valida y procesa el formulario del impuesto.
     */
    onSubmit(): void {
        if (!this.descuento.nombre.trim()) {
            alert('Por favor, ingrese un nombre válido');
            return;
        }
        if (!this.descuento.descripcion.trim()) {
            alert('Por favor, ingrese una descripción válida');
            return;
        }
        if (this.descuento.porcentaje<=0) {
            alert('Por favor, ingrese un valor de porcentaje válido');
            return;
        }
        console.log('Formulario enviado. Descuento:', this.descuento);
        this.descuentoService.actualizarDescuento(this.descuento).subscribe({
            next: () => {
                alert('Descuento actualizado con éxito.');
                this.router.navigate(['/descuentos/gestion']);
            },
            error: (error) => {
                console.error('Error al actualizar descuento:', error);
                alert('No se pudo crear el descuento.');
            }
        });
    }

}