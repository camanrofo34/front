import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../domain/usuario.model';
import { RouterModule } from '@angular/router'; // Importa RouterModule si usas rutas
import { FormsModule } from '@angular/forms'; // Importa FormsModule si usas ngModel
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas como *ngFor
import { AppGestionListaComponent } from './app-gestion-lista/app-gestion-lista.component'; // Importa el componente hijo

@Component({
  selector: 'app-gestion',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, FormsModule, RouterModule, AppGestionListaComponent], // Importa los módulos y componentes necesarios
  templateUrl: './app-gestion.component.html',
  styleUrls: ['./app-gestion.component.css']
})
export class AppGestionComponent implements OnInit {
  searchTerm: string = ''; // Término de búsqueda
  usuariosFiltrados: Usuario[] = []; // Lista de usuarios filtrados

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar todos los usuarios al iniciar
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

  // Método para buscar usuarios
  buscarUsuarios(): void {
    if (this.searchTerm.trim()) {
      this.usuariosService.buscarUsuarioPorNombreUsuario(this.searchTerm).subscribe({
        next: (data) => {
          this.usuariosFiltrados = data; // Mostrar usuarios filtrados
        },
        error: (error) => {
          console.error('Error al buscar usuarios:', error);
        }
      });
    } else {
      this.cargarUsuarios(); // Si el término de búsqueda está vacío, mostrar todos los usuarios
    }
  }
}