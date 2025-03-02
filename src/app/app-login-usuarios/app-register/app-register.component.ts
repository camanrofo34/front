import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../domain/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-register.component.html',
  styleUrl: './app-register.component.css'
})
export class AppRegisterComponent {
  usuario: Usuario = {
    idUsuario: 0,
    nombreCompleto: '',
    nombreUsuario: '',
    contrasena: '',
    cedula: '',
    direccion: '',
    telefono: '',
    rol: 'RECEPCION', // Valor por defecto
    estado: 'ACTIVO' // Estado por defecto
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Llama al servicio para crear el usuario
    this.usuariosService.crearUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/usuarios/gestion']); // Redirige a la página de gestión
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        alert('Error al crear usuario. Inténtalo de nuevo.');
      }
    });
  }
}
