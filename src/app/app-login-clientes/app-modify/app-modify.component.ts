import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../domain/cliente.model';
import { ClienteService } from '../../services/clientes.service';

@Component({
  selector: 'app-mod-customer',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Importamos CommonModule y FormsModule
  templateUrl: './app-modify.component.html',
  styleUrl: './app-modify.component.css'
})
export class ModifyClientsComponent implements OnInit{
  clienteId: number = 0 ; // ✅ Inicializamos el ID del cliente
  cliente : Cliente = {
    idCliente: 0,
    nombreLegal: '',
    numeroIdentificacion: '',
    direccion: '',
    telefono: ''
  };

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.clienteId = +this.route.snapshot.paramMap.get('idCliente')!; // ✅ Obtenemos el ID de la URL
    if (this.clienteId) {
      this.cargarCliente(this.clienteId);
    }
  }

  validarTelefono(telefono: string): boolean {
    const regex = /^\d+$/;
    return regex.test(telefono) && telefono.length >= 7 && telefono.length <= 15;
  }

  validarRequeridos(): boolean {
    return this.cliente.nombreLegal.trim() === '' || this.cliente.numeroIdentificacion.trim() === '' ||
      this.cliente.direccion.trim() === '' || this.cliente.telefono.trim() === '';
  }
  

  cargarCliente(id: number) {
    this.clienteService.buscarClientePorId(id).subscribe({
      next: (data) => {
        this.cliente = data;
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
      }
    });
  }

  guardarCambios() {
    console.log('Cliente:', this.cliente);
    if (this.validarRequeridos()) {
      alert('Todos los campos son requeridos.');
      return;
    }
    if (!this.validarTelefono(this.cliente.telefono)) {
      alert('Número de teléfono inválido. Debe contener solo números y tener entre 7 y 15 caracteres.');
      return;
    }
    if (this.cliente && this.clienteId) {
      this.clienteService.actualizarCliente(this.clienteId, this.cliente).subscribe({
        next: () => {
          console.log('Cliente actualizado correctamente');
          this.router.navigate(['/clientes/gestion']); // ✅ Redirigir a la página de gestión
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar cliente. Inténtalo de nuevo.');
        }
      });
    }
  }

  eliminarCliente() {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(this.clienteId).subscribe({
        next: () => {
          console.log('Cliente eliminado:', this.clienteId);
          this.router.navigate(['/clientes/gestion']); // ✅ Redirigir a la página de gestión
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
          alert('Error al eliminar cliente. Inténtalo de nuevo.');
        }
      });
    }
  }
}