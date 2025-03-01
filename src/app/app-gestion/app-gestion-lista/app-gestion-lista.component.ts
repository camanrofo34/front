import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../domain/usuario.model';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-lista',
  templateUrl: './app-gestion-lista.component.html',
  styleUrls: ['./app-gestion-lista.component.css']
})

export class AppGestionListaComponent implements OnInit {
  @Input() usuariosFiltrados: Usuario[] = []; // Lista de usuarios filtrados
  @Output() usuarioActualizado = new EventEmitter<void>(); // Evento para notificar que se actualizó un usuario

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  // Método para cargar todos los usuarios
  cargarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuariosFiltrados = data; // Mostrar todos los usuarios inicialmente
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  // Método para modificar un usuario
  modificarUsuario(idUsuario: number): void {
    this.router.navigate(['/modify', idUsuario]); // Navegar a la página de modificación
  }

cambiarEstadoUsuario(idUsuario: number, nuevoEstado: string): void {
  this.usuariosService.cambiarEstadoUsuario(idUsuario, nuevoEstado).subscribe({
    next: () => {
      this.usuarioActualizado.emit(); // Notificar al padre
    },
    error: (error) => {
      console.error('Error al cambiar el estado:', error);
    }
  });
}

eliminarUsuario(idUsuario: number): void {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    this.usuariosService.eliminarUsuario(idUsuario).subscribe({
      next: () => {
        this.usuarioActualizado.emit(); // Notificar al padre
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }
}

}
