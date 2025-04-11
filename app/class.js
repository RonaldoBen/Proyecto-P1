class Usuario {
  constructor(unId, unNombre, unApellido, unNombreDeUsuario, unPassword, unNumeroTarjeta, unCvc, unTipo) {
    this.id = unId;
    this.nombre = unNombre;
    this.apellido = unApellido;
    this.nombreDeUsuario = unNombreDeUsuario;
    this.password = unPassword;
    this.numeroTarjeta = unNumeroTarjeta;
    this.cvc = unCvc;
    this.tipo = unTipo; //Los tipos de usuarios van a ser "admin" o "user", todos los que se crean por la web son tipo "user"
    this.saldo = 3000;
  }
}

class Producto {
  constructor(unId, unNombreDelProducto, unPrecio, unDescripcion, unImagen, unStock, unOferta, unEstado) {
    this.id = unId;
    this.nombreDelProducto = unNombreDelProducto;
    this.precio = unPrecio;
    this.descripcion = unDescripcion;
    this.imagen = unImagen;
    this.stockDisponible = unStock;
    this.oferta = unOferta; // los estados de oferta, se designan en la propiedad oferta valga la redundancia y toma los valores "oferta" y "noOferta"
    this.estado = unEstado; // "pausado" o "activo"
  }
}

class Compra {
  constructor(unId, unUsuario, unProducto, unEstado, unCantidadProductosComprados) {
    this.idCompra = unId;
    this.idUsuario = unUsuario;
    this.idProducto = unProducto;
    this.estado = unEstado; // Los estados son = "cancelado", "pendiente", "aprobada"
    this.cantidadProductosComprados = unCantidadProductosComprados;
  }
}
