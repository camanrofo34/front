export class Usuario {
    idUsuario: number ;
    nombreUsuario: string;
    nombreCompleto: string;
    contrasena: string;
    cedula: string;
    direccion: string;
    telefono: string;
    rol: string;
    estado: string;
  
    constructor(
      idUsuario: number = 0,
      nombreUsuario: string = '',
      nombreCompleto: string = '',
      contrasena: string = '',
      cedula: string = '',
      direccion: string = '',
      telefono: string = '',
      rol: string = '',
      estado: string = ''
    ) {
      this.idUsuario = idUsuario;
      this.nombreUsuario = nombreUsuario;
      this.nombreCompleto = nombreCompleto;
      this.contrasena = contrasena;
      this.cedula = cedula;
      this.direccion = direccion;
      this.telefono = telefono;
      this.rol = rol;
      this.estado = estado;
    }
  }