export class Impuesto {
    id : number;
    nombre : string;
    descripcion : string;
    porcentaje : number;

    constructor(
        id : number = 0,
        nombre : string = '',
        descripcion : string = '',
        porcentaje : number = 0
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.porcentaje = porcentaje;
    }
}