import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

/**
 * @class LoginComponentClientes
 * @description 
 * Componente de login para clientes.
 */
@Component({
  selector: 'app-app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-login-descuentos.component.html',
  styleUrls: ['./app-login-descuentos.component.css']
})
export class LoginComponentDescuentos {

    username : string = '';

    password : string = '';

    constructor(private router: Router, private login: LoginServiceService) {}

    /**
     * @method onSubmit
     * @description Valida y procesa el formulario de login.
     */
    onSubmit(): void {
        if (!this.username.trim() || !this.password.trim()) {
            alert('Por favor, ingrese un usuario y contraseña válidos.');
            return;
        }
        this.login.loginSecretario(this.username, this.password).subscribe(
            token => {
                console.log('Token recibido:', token);
                localStorage.setItem('token', token);
                this.router.navigate(['/descuentos/gestion']);
            },
            error => {
                console.error('Error:', error);
                alert('Error en la autenticación. Intente de nuevo.');
            }
        );
    }
}