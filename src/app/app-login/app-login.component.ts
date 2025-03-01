import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service'; // Importa el servicio
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para el servicio

@Component({
  selector: 'app-login',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, FormsModule, HttpClientModule], // Importa los módulos necesarios
  templateUrl: './app-login.component.html', // Ruta al archivo HTML
  styleUrls: ['./app-login.component.css'] // Ruta al archivo CSS (si lo tienes)
})
export class LoginComponent {
  username: string = ''; // Propiedad para el nombre de usuario
  password: string = ''; // Propiedad para la contraseña

  constructor(
    private loginService: LoginServiceService, // Inyecta el servicio de login
    private router: Router // Inyecta el Router para redireccionar
  ) {}

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Llama al servicio de login para autenticar al usuario
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Redirige al usuario a la página de gestión después del login exitoso
        this.router.navigate(['/gestion']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Muestra un mensaje de error al usuario (puedes usar un toast o alert)
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}