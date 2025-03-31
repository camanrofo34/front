import { Component, EventEmitter, Output } from '@angular/core';
import { Accesorio } from '../../../domain/accesorio.model';

@Component({
  selector: 'app-app-accesorios',
  imports: [],
  templateUrl: './app-accesorios.component.html',
  styleUrl: './app-accesorios.component.css'
})
export class AppAccesoriosComponent {

  @Output() ordenAccesoriosChange = new EventEmitter<{ idAccesorios: number[], cantidad: number[] }>();


  // Método para actualizar la cantidad seleccionada por el usuario
  actualizarCantidad(accesorio: Accesorio, cantidad: number) {
    if (cantidad > accesorio.stock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    //accesorio.cantidadSeleccionada = cantidad;
  }

  // Método para emitir la selección de accesorios al componente padre
  actualizarListaAccesorios() {
    //const accesoriosSeleccionados = this.accesorios.filter(acc => acc.cantidadSeleccionada > 0);
    
    //const idAccesorios = accesoriosSeleccionados.map(acc => acc.id);
    //const cantidad = accesoriosSeleccionados.map(acc => acc.cantidadSeleccionada);
    
    //this.ordenAccesoriosChange.emit({ idAccesorios, cantidad });
  }

}
