import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/clientes.service';
import { Cliente } from '../../domain/cliente.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterClientComponent {

  cliente: Cliente = {
    idCliente: 0,
    nombreLegal: '',
    numeroIdentificacion: '',
    direccion: '',
    telefono: ''
  };

  constructor(private router: Router, private clientService: ClienteService) {}

  // Método para validar el número de teléfono
  validarTelefono(telefono: string): boolean {
    const regex = /^\d+$/; // Expresión regular para validar solo números
    return regex.test(telefono) && telefono.length >= 7 && telefono.length <= 15; // Longitud válida
  }

  validarRequeridos(): boolean {
    return this.cliente.nombreLegal.trim() === '' || this.cliente.numeroIdentificacion.trim() === '' ||
      this.cliente.direccion.trim() === '' || this.cliente.telefono.trim() === '';
  }

  onSubmit(): void {
    if (this.validarRequeridos()) {
      alert('Todos los campos son requeridos.');
      return;
    }
    if (!this.validarTelefono(this.cliente.telefono)) {
      alert('Número de teléfono inválido. Debe contener solo números y tener entre 7 y 15 caracteres.');
      return;
    }
    this.clientService.crearCliente(this.cliente).subscribe({
      next: (response) => {
        console.log('Cliente creado:', response);
        this.router.navigate(['/clientes/gestion']);
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
        alert('Error al crear cliente. Inténtalo de nuevo.');
      }
    });
  }
}