import { Cliente } from "./cliente.model";
import { Usuario } from "./usuario.model";

export class OrdenCompra {
    idOrdenCompra: number;
    fecha: string;
    subtotal : number;
    total: number;
    usuario: Usuario;
    cliente: Cliente;

    constructor(
        idOrdenCompra: number = 0,
        fecha: string = '',
        subtotal: number = 0,
        total: number = 0,
        usuario: Usuario = new Usuario(),
        cliente: Cliente = new Cliente()
    ) {
        this.idOrdenCompra = idOrdenCompra;
        this.fecha = fecha;
        this.subtotal = subtotal;
        this.total = total;
        this.usuario = usuario;
        this.cliente = cliente;
    }
}