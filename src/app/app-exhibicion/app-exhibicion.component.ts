import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-exhibicion', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './app-exhibicion.component.html',
  styleUrls: ['./app-exhibicion.component.css'] 
})
export class AppExhibicionComponent {
  currentIndex: number = 0;
  intervalTime: number = 10000; // 15 segundos
  fadeIn: boolean = true; // Controla la opacidad en la transición

  modelos = [
    {
      nombre: "SPEEDORZ Model A1-R8",
      descripcion: "La exhibición de la SPEEDORZ Model R8 es una experiencia única que combina tecnología avanzada y diseño innovador...",
      imagenHeader: "https://i.ibb.co/PZR67hr9/A1v1.png",
      imagenDescripcion: "https://i.ibb.co/Jj9K7htJ/A1v2.png"
    },
    {
      nombre: "SPEEDORZ Model A2-Turbo",
      descripcion: "El SPEEDORZ Model A2-Turbo redefine el concepto de velocidad y rendimiento, con un diseño aerodinámico y un motor de alto desempeño...",
      imagenHeader: "https://i.ibb.co/d0bML91b/A2v2.png",
      imagenDescripcion: "https://i.ibb.co/n8mjh9ZW/A2v3.png"
    }
  ];

  constructor() {
    setInterval(() => {
      this.fadeIn = false; // Inicia la transición
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.modelos.length;
        this.fadeIn = true; // Aplica el fade-in después del cambio
      }, 1000); // El tiempo debe coincidir con el CSS de la animación
    }, this.intervalTime);
  }

  get modeloActual() {
    return this.modelos[this.currentIndex];
  }
}