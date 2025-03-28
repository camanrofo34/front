/**
 * Clase que representa un accesorio en el sistema.
 */
export class Accesorio {

    /** Identificador único del accesorio */
    id: number;

    /** Nombre del accesorio */
    nombre: string;

    /** Descripción del accesorio */
    descripcion: string;

    /** Cantidad disponible en stock */
    stock: number;

    /** Precio de venta del accesorio */
    precioVenta: number;

    /** Descuento aplicado al accesorio */
    descuento: number;

    /**
     * Constructor de la clase Accesorio.
     * @param id Identificador único del accesorio, por defecto 0.
     * @param nombre Nombre del accesorio, por defecto una cadena vacía.
     * @param descripcion Descripción del accesorio, por defecto una cadena vacía.
     * @param stock Cantidad disponible en stock, por defecto 0.
     * @param precioVenta Precio de venta del accesorio, por defecto 0.
     * @param descuento Descuento aplicado al accesorio, por defecto 0.
     */
    constructor(
        id: number = 0,
        nombre: string = '',
        descripcion: string = '',
        stock: number = 0,
        precioVenta: number = 0,
        descuento: number = 0
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precioVenta = precioVenta;
        this.descuento = descuento;
    }
    
}