export class Cliente {
    idCliente: number;
    nombreLegal: string;
    numeroIdentificacion: string;
    direccion: string;
    telefono: string;
  
    constructor(
      idCliente: number = 0,
      nombreLegal: string = '',
      numeroIdentificacion: string = '',
      direccion: string = '',
      telefono: string = ''
    ) {
      this.idCliente = idCliente;
      this.nombreLegal = nombreLegal;
      this.numeroIdentificacion = numeroIdentificacion;
      this.direccion = direccion;
      this.telefono = telefono;
    }
  }