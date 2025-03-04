import { OrdenVehiculoDTO } from './orden-vehiculo-dto.model';

export class OrdenCompraDTO {
  fecha: string;
  idUsuario: number;
  idCliente: number;
  ordenVehiculos: OrdenVehiculoDTO[];

  constructor(
    fecha: string = new Date().toISOString(),
    idUsuario: number = 0,
    idCliente: number = 0,
    ordenVehiculos: OrdenVehiculoDTO[] = []
  ) {
    this.fecha = fecha;
    this.idUsuario = idUsuario;
    this.idCliente = idCliente;
    this.ordenVehiculos = ordenVehiculos;
  }
}