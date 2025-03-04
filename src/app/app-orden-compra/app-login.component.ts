import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login-orden-compra',
  imports: [CommonModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css'
})
export class LoginComponentOrdenCompra {
      username: string = ''; // Propiedad para el nombre de usuario
      password: string = ''; // Propiedad para la contraseña
    
      constructor(
        private loginService: LoginServiceService, // Inyecta el servicio de login
        private router: Router // Inyecta el Router para redireccionar
      ) {}
    
      // Método que se ejecuta al enviar el formulario
      onSubmit(): void {
        // Llama al servicio de login para autenticar al usuario
        this.loginService.loginAsesorComercial(this.username, this.password).subscribe({
          next: (response) => {
            // Redirige al usuario a la página de gestión después del login exitoso
            this.router.navigate(['/ordenCompra/venta']);
          },
          error: (error) => {
            console.error('Login failed', error);
            // Muestra un mensaje de error al usuario (puedes usar un toast o alert)
            alert('Usuario o contraseña incorrectos');
          }
        });
      }

}