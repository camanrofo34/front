export class Vehiculo {
    idVehiculo: number;
    nombre: string;
    marca: string;
    modelo: string;
    descripcion: string;
    stock: number;
    precio: number;

    constructor(
      idVehiculo: number = 0,
      nombre: string = '',
      marca: string = '',
      modelo: string = '',
      descripcion: string = '',
      stock: number = 0,
      precio: number = 0
    ) {
      this.idVehiculo = idVehiculo;
      this.nombre = nombre;
      this.marca = marca;
      this.modelo = modelo;
      this.descripcion = descripcion;
      this.stock = stock;
      this.precio = precio;
    }
}

