export class OrdenVehiculoDTO {
    idVehiculo: number;
    cantidad: number;
    idDescuentos: number[];
    idImpuestos: number[];
  
    constructor(
      idVehiculo: number = 0,
      cantidad: number = 0,
      idDescuentos: number[] = [],
      idImpuestos: number[] = []
    ) {
      this.idVehiculo = idVehiculo;
      this.cantidad = cantidad;
      this.idDescuentos = idDescuentos;
      this.idImpuestos = idImpuestos;
    }
  }