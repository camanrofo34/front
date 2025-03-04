import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { Router } from '@angular/router'; // ✅ Importar Router para la navegación
import { RouterModule } from '@angular/router';
import { Cliente } from '../../domain/cliente.model';
import { ClienteService } from '../../services/clientes.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Agregar FormsModule
  templateUrl: './app-gestion.component.html',
  styleUrls: ['./app-gestion.component.css']
})
export class AppClientsListComponent {

    busquedaNombre : string = ''; // ✅ Término de búsqueda
    busquedaId : number | null = null; // ✅ Término de búsqueda
    clientes : Cliente[] = [];

  constructor(private router: Router,
    private clienteService: ClienteService
  ) {} // ✅ Inyectamos el router en el constructor

  buscarPorNombre(): void {
    this.clienteService.buscarClientePorNombreLegal(this.busquedaNombre).subscribe({
        next: (data) => {
            this.clientes = data;
        }
        });
  }

  buscarPorId(): void {
    if (this.busquedaId === null) {
      this.clienteService.listarClientes().subscribe({
        next: (data) => {
            this.clientes = data;
        }
    });
        return;
    }
    this.clienteService.buscarClientePorId(this.busquedaId).subscribe({
        next: (data) => {
            this.clientes = [data];
        },
        error: (error) => {
            console.error('No existe cliente con ese nombre', error);
            this.clientes = [];
        }
        });
  }

    ngOnInit() {
        this.clienteService.listarClientes().subscribe({
            next: (data) => {
                this.clientes = data;
            }
        });
    }


  modificarUsuario(id: number) {
    this.router.navigate(['/clientes/modify', id]); // ✅ Redirigir a la ruta con el ID del usuario
  }

  cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/clientes']);
  }
}