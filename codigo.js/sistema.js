class Sistema {
  constructor() {
    this.usuarios = [
      new Usuario(1, "Ronaldo", "Bentancur", "ronaldo", "A1bcd", "", "", "admin"),
      new Usuario(2, "Brian", "Moreira", "brian", "E2fgh", "", "", "admin"),
      new Usuario(3, "Roberto", "Susunday", "roberto", "Q1bcd", "", "", "admin"),
      new Usuario(4, "Allison", "Cedres", "allison", "A9wcv", "", "", "admin"),
      new Usuario(5, "Romina", "Morales", "romina", "N2qwe", "", "", "admin"),
      new Usuario(6, "Nahuel", "Silva", "nahuel", "Nahu1", "378344449580014", "312", "user"),
      new Usuario(7, "Estefany", "Gauto", "estefany", "T3fyg", "4539371567070872", "342", "user"),
      new Usuario(8, "Maicol", "Cabrera", "maicol", "M8icol", "5223450370829605", "842", "user"),
      new Usuario(9, "Yamila", "Figueredo", "yamila", "Y4mila", "4539625308478250", "342", "user"),
      new Usuario(10, "Timothy", "Hernandez", "timothy", "Tim0thy", "6011319554023976", "742", "user"),
    ];
    this.productos = [
      new Producto("PROD_ID_" + 1, "Calzas de Mujer", 450, "Calza de licra, facil adaptacion al cuerpo", "calzas.jpg", 20, "oferta", "activo"),
      new Producto("PROD_ID_" + 2, "Kit pesas", 900, "Kit completo de mancuernas, alta durabilidad y facil transporte", "pesas.jpg", 20, "noOferta", "activo"),
      new Producto("PROD_ID_" + 3, "Championes de futbol", 650, "Championes de futbol, con tapones de aluminio, alta flexibilidad", "championes1.jpg", 20, "noOferta", "activo"),
      new Producto("PROD_ID_" + 4, "Championes de running", 550, "Championes con un espuma que ayuda a amortiguar el impacto", "championes2.jpg", 20, "oferta", "activo"),
      new Producto("PROD_ID_" + 5, "Cantimplora", 150, "Cantimplora extra liviana, ideal para llevar a los entrenos", "cantimplora.jpg", 20, "oferta", "activo"),
      new Producto("PROD_ID_" + 6, "Medias", 250, "Medias de algodon, no cortan la circulacion", "medias.jpg", 20, "noOferta", "activo"),
      new Producto("PROD_ID_" + 7, "Campera deportiva para mujer", 900, "Campera impermeable, super liviana para poder entrenar con ella", "campera.jpg", 20, "noOferta", "activo"),
      new Producto("PROD_ID_" + 8, "Cuello multiuso", 350, "Cuello multiuso, se puede usar de diferentes maneras para cubrir diferentes partes de la cabeza", "cuellera.jpg", 20, "oferta", "activo"),
      new Producto("PROD_ID_" + 9, "Pelota de fultbol", 400, "Pelota de cuero, exelente precision en los disparos", "pelota.jpg", 20, "noOferta", "activo"),
      new Producto("PROD_ID_" + 10, "Pelota de basket", 450, "Pelota similar a las que se usan en la NBA", "basket.jpg", 20, "oferta", "activo"),
    ];
    this.compras = [
      new Compra(1, 6, "PROD_ID_" + 3, "aprobada", 2),
      new Compra(2, 6, "PROD_ID_" + 4, "cancelado", 1),
      new Compra(3, 9, "PROD_ID_" + 1, "pendiente", 2),
      new Compra(4, 7, "PROD_ID_" + 9, "pendiente", 1),
      new Compra(5, 10, "PROD_ID_" + 10, "aprobada", 1),
    ];
  }
  obtenerObjeto(arrayElementos, propiedad, busqueda) {
    let objeto = null;
    for (let i = 0; i < arrayElementos.length; i++) {
      const unElemento = arrayElementos[i];
      if (unElemento[propiedad] === busqueda) {
        objeto = unElemento;
        break;
      }
    }
    return objeto;
  }
  buscarElemento(arrayElementos, propiedad, busqueda) {
    let existe = false;
    for (let i = 0; i < arrayElementos.length; i++) {
      const unElemento = arrayElementos[i];
      if (unElemento[propiedad] === busqueda) {
        existe = true;
        break;
      }
    }
    return existe;
  }

  agregarNuevoUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  agregarProductoNuevo(producto) {
    this.productos.push(producto);
  }

  agregarCompra(compra) {
    this.compras.push(compra);
  }

  validarCamposVaciosRegistros(nombreCampo, apellidoCampo, nombreUsuarioCampo, passwordCampo, numeroTarjetaCampo, numeroCvcCampo) {
    let camposValidos = false;

    if (nombreCampo !== "" && apellidoCampo !== "" && nombreUsuarioCampo !== "" && passwordCampo !== "" && numeroTarjetaCampo !== "" && numeroCvcCampo !== "") {
      camposValidos = true;
    }
    return camposValidos;
  }

  verificarFormatoPassword(password) {
    let esValida = false;

    if (password.length >= 5) {
      let contadorMayuscula = 0;
      let contadorMinuscula = 0;
      let contadorNumero = 0;

      for (let i = 0; i < password.length; i++) {
        let caracter = password.charCodeAt(i);

        if (caracter >= 65 && caracter <= 90) {
          contadorMayuscula++;
        } else if (caracter >= 97 && caracter <= 122) {
          contadorMinuscula++;
        } else if (caracter >= 48 && caracter <= 57) {
          contadorNumero++;
        }
      }

      if (contadorMayuscula > 0 && contadorMinuscula > 0 && contadorNumero > 0) {
        esValida = true;
      }
    }

    return esValida;
  }

  verificarLogin(nombreUsuario, pass) {
    let resultado = false;
    let unUsuario = this.obtenerObjeto(this.usuarios, "nombreDeUsuario", nombreUsuario);
    if (unUsuario !== null) {
      if (pass === unUsuario.password) {
        resultado = true;
      }
    }
    return resultado;
  }

  validarTarjeta(nroTarjeta) {
    let dev = false;
    let digitoVerificar = nroTarjeta.charAt(nroTarjeta.length - 1);
    let acumulador = 0;
    let cont = 0;
    for (let i = nroTarjeta.length - 2; i >= 0; i--) {
      let num = Number(nroTarjeta.charAt(i));
      if (cont % 2 === 0) {
        let duplicado = num * 2;
        if (duplicado >= 10) {
          acumulador += duplicado - 9;
        } else {
          acumulador += duplicado;
        }
      } else {
        acumulador += num;
      }
      cont++;
    }

    let multiplicado = acumulador * 9;
    let multiplicadoStr = String(multiplicado);
    let digitoVerificador = multiplicadoStr.charAt(multiplicadoStr.length - 1);

    if (digitoVerificar === digitoVerificador) {
      dev = true;
    }

    return dev;
  }

  cantidadComprada(idProducto) {
    let cantidad = 0;
    for (const compra of this.compras) {
      if (compra.idProducto === idProducto && compra.estado === "aprobada") {
        cantidad += compra.cantidadProductosComprados;
      }
    }
    return cantidad;
  }

  ganaciaTotal() {
    let ganancia = 0;
    for (const compra of this.compras) {
      let producto = this.obtenerObjeto(this.productos, "id", compra.idProducto);
      if (compra.estado === "aprobada") {
        ganancia += producto.precio * compra.cantidadProductosComprados;
      }
    }
    return ganancia;
  }
}
