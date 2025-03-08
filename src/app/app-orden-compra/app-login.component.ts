import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

/**
 * @class LoginComponentOrdenCompra
 * @description Componente encargado del inicio de sesión para asesores comerciales.
 * Permite autenticar a los usuarios y redirigirlos a la sección de gestión de órdenes de compra.
 *
 * @author Tu Nombre <tuemail@example.com>
 */
@Component({
  selector: 'app-login-orden-compra', // Selector del componente
  imports: [CommonModule, RouterModule, FormsModule, CommonModule], // Módulos importados
  templateUrl: './app-login.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './app-login.component.css' // Ruta del archivo de estilos CSS
})
export class LoginComponentOrdenCompra {
  
  /**
   * Nombre de usuario ingresado en el formulario de login.
   * @type {string}
   */
  username: string = ''; 

  /**
   * Contraseña ingresada en el formulario de login.
   * @type {string}
   */
  password: string = '';

  /**
   * @constructor
   * @param {LoginServiceService} loginService - Servicio encargado de la autenticación del usuario.
   * @param {Router} router - Módulo de navegación para redirigir a otras páginas después del login.
   */
  constructor(
    private loginService: LoginServiceService, 
    private router: Router 
  ) {}

  /**
   * @method onSubmit
   * @description Método que se ejecuta al enviar el formulario de login.
   * Llama al servicio `LoginServiceService` para autenticar al usuario.
   * Si el login es exitoso, redirige a la página de gestión de órdenes de compra.
   * Si el login falla, muestra un mensaje de error al usuario.
   *
   * @returns {void}
   */
  onSubmit(): void {
    this.loginService.loginAsesorComercial(this.username, this.password).subscribe({
      next: (response) => {
        // Redirige al usuario a la página de gestión después del login exitoso
        this.router.navigate(['/ordenCompra/venta']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Muestra un mensaje de error al usuario
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
