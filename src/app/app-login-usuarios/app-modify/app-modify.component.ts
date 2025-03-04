import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-modify',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app-modify.component.html',
  styleUrl: './app-modify.component.css'
})

export class ModifyComponentUsers implements OnInit{
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
  }; // Inicializa el objeto usuario con valores por defecto // Objeto para almacenar los datos del usuario
  idUsuario: number | null = null; // Variable para almacenar el idUsuario

  constructor(
    private route: ActivatedRoute, // Servicio para capturar parámetros de la ruta
    private usuariosService: UsuariosService, // Servicio para obtener los datos del usuario
    private router: Router // Servicio para redirigir a otras páginas
  ) {}

  ngOnInit(): void {
    // Capturar el parámetro idUsuario de la URL
    this.idUsuario = +this.route.snapshot.paramMap.get('idUsuario')!;

    // Si el idUsuario es válido, cargar los datos del usuario
    if (this.idUsuario) {
      this.cargarUsuario(this.idUsuario);
    }
  }

  // Método para cargar los datos del usuario
  cargarUsuario(idUsuario: number): void {
    this.usuariosService.buscarUsuarioPorId(idUsuario).subscribe({
      next: (data) => {
        this.usuario = data; // Asignar los datos del usuario
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.usuario && this.idUsuario) {
      this.usuariosService.actualizarUsuario(this.idUsuario, this.usuario).subscribe({
        next: () => {
          console.log('Usuario actualizado correctamente');
          this.router.navigate(['/usuarios/gestion']); // Redirigir a la página de gestión
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario. Inténtalo de nuevo.');
        }
      });
    }
}
}
