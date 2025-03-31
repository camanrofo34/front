import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Importa FormsModule

@Component({
  selector: 'app-recuperacion-credenciales',
  standalone: true, // <-- Indica que es un componente independiente
  templateUrl: './app-recuperacion-credenciales.component.html',
  styleUrls: ['./app-recuperacion-credenciales.component.css'],
  imports: [FormsModule] // <-- Agrega FormsModule aquí
})
export class AppRecuperacionCredencialesComponent {
  correo: string = ''; // Variable para ngModel

  enviarCorreo() {
    console.log("Correo enviado a:", this.correo);
    // Aquí puedes agregar la lógica para enviar el correo
  }
}
