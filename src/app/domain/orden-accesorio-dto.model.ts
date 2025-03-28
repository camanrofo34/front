/**
 * Clase que representa un accesorio de una orden de compra.
 */
export class ordenAccesorios{
    
    /** Identificadores de los accesorios */
    idAccesorios: number[];

    /** Cantidades de cada accesorio */
    cantidad: number[];

    /**
     * Constructor de la clase ordenAccesorios.
     * @param idAccesorios Identificadores de los accesorios, por defecto un array vacío.
     * @param cantidad Cantidades de cada accesorio, por defecto un array vacío.
     */
    constructor(
        idAccesorios: number[] = [],
        cantidad: number[] = []
    ){
        this.idAccesorios = idAccesorios;
        this.cantidad = cantidad;
    }
}