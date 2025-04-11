window.addEventListener("load", inicio);

function inicio() {
  //-------------------------Llamado de botones en HTML-------------------------
  document.querySelector("#btnRegistrarNuevoUsuario").addEventListener("click", registrarNuevoUsuario);
  document.querySelector("#btnLogin").addEventListener("click", logIn);
  document.querySelector("#LogOut").addEventListener("click", logOut);
  document.querySelector("#btnRegistrarNuevoProducto").addEventListener("click", crearProductoNuevo);
  document.querySelector("#btnFiltrarCarrito").addEventListener("click", listarCompraComun);

  //-------------------------Navegacion-------------------------

  ocultarSecciones();
  let botones = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion);
  }

  document.querySelector("#seccionLogin").style.display = "block";
  document.querySelector("#seccionCreaUsuario").style.display = "block";
  document.querySelector("#navPrincipal").style.display = "none";

  //------------------------- Listar Tabla Compras-------------------------
  listarProductosCompra();
  listarProductosOferta();
}

//Declaracion de sistema
let sistema = new Sistema();

//-------------------------Navegacion-------------------------

function mostrarSeccion() {
  ocultarSecciones();
  let idBtn = this.getAttribute("id");
  let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
  document.querySelector("#" + idSeccion).style.display = "block";
}

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

function mostrarBotones(tipo) {
  ocultarBotones();
  let botonesMostrar = document.querySelectorAll("." + tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
    botonesMostrar[i].style.display = "block";
  }
}

function ocultarBotones() {
  let botonesOcultar = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botonesOcultar.length; i++) {
    botonesOcultar[i].style.display = "none";
  }
}

//-------------------------Registr nuevo usuario-------------------------
//Declaramos idUsuario para hacerlo autoincremental
let idUsuario = 11;

//Levantamos datos del html y si pasa las validaciones agregamos un nuevo objeto al array de usuarios en sistema
function registrarNuevoUsuario() {
  let nombreCampo = document.querySelector("#txtNombre").value;
  let apellidoCampo = document.querySelector("#txtApellido").value;
  let nombreUsuarioCampo = document.querySelector("#txtNombreUsuario").value.toLowerCase();
  let passwordCampo = document.querySelector("#txtPass").value;
  let numeroTarjetaCampo = document.querySelector("#numTarjeta").value;
  let numeroCvcCampo = Number(document.querySelector("#numCVC").value);
  let camposCompletos = sistema.validarCamposVaciosRegistros(nombreCampo, apellidoCampo, nombreUsuarioCampo, passwordCampo, numeroTarjetaCampo, numeroCvcCampo);
  let formatoPasswordValido = sistema.verificarFormatoPassword(passwordCampo);
  let existeUsuario = sistema.buscarElemento(sistema.usuarios, "nombreDeUsuario", nombreUsuarioCampo);
  let tarjetaValida = sistema.validarTarjeta(numeroTarjetaCampo);

  if (camposCompletos && formatoPasswordValido && !existeUsuario && tarjetaValida && !isNaN(numeroCvcCampo)) {
    let nuevoUsuario = new Usuario(idUsuario, nombreCampo, apellidoCampo, nombreUsuarioCampo, passwordCampo, numeroTarjetaCampo, numeroCvcCampo, "user");
    idUsuario++;
    sistema.agregarNuevoUsuario(nuevoUsuario);
    alert("Registro Exitoso");
    document.querySelector("#txtNombre").value = "";
    document.querySelector("#txtApellido").value = "";
    document.querySelector("#txtNombreUsuario").value = "";
    document.querySelector("#txtPass").value = "";
    document.querySelector("#numTarjeta").value = "";
    document.querySelector("#numCVC").value = "";
  } else {
    if (!camposCompletos) {
      alert("Error en registro: Todos los campos son obligatorios.");
    }
    if (!formatoPasswordValido) {
      alert("Error en registro: El password debe tener al menos 5 caracteres, incluyendo una minúscula, una mayúscula y un número.");
    }
    if (existeUsuario) {
      alert("Error en registro: El nombre de usuario ya existe.");
    }
    if (!tarjetaValida) {
      alert("Error en registro: El número de tarjeta es incorrecto.");
    }
    if (isNaN(numeroCvcCampo)) {
      alert("Error en registro: El número de CVC es incorrecto.");
    }
  }
}

//-------------------------Login-------------------------
//levantamos datos del html seccion login, verificamos los inputs y si es positivo llamamos a la funcion para mostrar menus correspondientes
let usuarioLogueado = null;
function logIn() {
  let nombreUsuarioCampoLogin = document.querySelector("#txtNombreUsuarioLogin").value.toLowerCase();
  let passwordCampoLogin = document.querySelector("#txtPassLogin").value;
  let verificarIngreso = sistema.verificarLogin(nombreUsuarioCampoLogin, passwordCampoLogin);

  if (verificarIngreso === true) {
    usuarioLogueado = sistema.obtenerObjeto(sistema.usuarios, "nombreDeUsuario", nombreUsuarioCampoLogin);
    mostrarMenuOcultandoLoginYRegistro(usuarioLogueado.tipo);
  } else {
    alert("Usuario o password incorrecto");
  }
  document.querySelector("#txtNombreUsuarioLogin").value = "";
  document.querySelector("#txtPassLogin").value = "";
  adminProductos();
  adminCompras();
  listarProductosCompra();
  listarProductosOferta();
  listarCompraComun();
}

//esta funcion se encarga de que una vez alguien se logue nos muestre los botones de navegacion que queremos para cada tipo
//de usuario, sea "admin" o "user"
function mostrarMenuOcultandoLoginYRegistro(tipoUsuario) {
  if (tipoUsuario === "admin") {
    // Mostrar menú para administrador
    document.querySelector("#btnSeccionAdminCompras").style.display = "block";
    document.querySelector("#btnSeccionCrearProducto").style.display = "block";
    document.querySelector("#btnSeccionAdminProductos").style.display = "block";
    document.querySelector("#btnSeccionBalance").style.display = "block";
    document.querySelector("#LogOut").style.display = "block";
    document.querySelector("#btnSeccionCreaUsuario").style.display = "none";
    document.querySelector("#btnSeccionLogin").style.display = "none";
    document.querySelector("#btnSeccionCompra").style.display = "none";
    document.querySelector("#btnSeccionCarrito").style.display = "none";
    document.querySelector("#btnSeccionOfertas").style.display = "none";
  } else if (tipoUsuario === "user") {
    // Mostrar menú para usuario normal
    document.querySelector("#btnSeccionAdminCompras").style.display = "none";
    document.querySelector("#btnSeccionCrearProducto").style.display = "none";
    document.querySelector("#btnSeccionAdminProductos").style.display = "none";
    document.querySelector("#btnSeccionBalance").style.display = "none";
    document.querySelector("#LogOut").style.display = "block";
    document.querySelector("#btnSeccionCreaUsuario").style.display = "none";
    document.querySelector("#btnSeccionLogin").style.display = "none";
    document.querySelector("#btnSeccionCompra").style.display = "block";
    document.querySelector("#btnSeccionCarrito").style.display = "block";
    document.querySelector("#btnSeccionOfertas").style.display = "block";
  }

  document.querySelector("#seccionLogin").style.display = "none";
  document.querySelector("#seccionCreaUsuario").style.display = "none";
  document.querySelector("#navPrincipal").style.display = "block";
  document.querySelector("#nombreUsuarioLogeado").innerHTML = `Bienvenido ${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`;
}
//-------------------------LogOut-------------------------
//escondemos todos los botones de navegacion, limpiamos el usuario logueado y mostramos login/Registro
function logOut() {
  ocultarSecciones();
  document.querySelector("#seccionLogin").style.display = "block";
  document.querySelector("#seccionCreaUsuario").style.display = "block";
  document.querySelector("#navPrincipal").style.display = "none";
  document.querySelector("#mensajeBienvenida").style.display = "none";
  usuarioLogueado = null;
  document.querySelector("#pTotalDeCompra").innerHTML ="Total De Compra"
}

//-------------------------Crear nuevo producto-------------------------
//Declaramos idProducto para hacerlo autoincremental
let idProducto = 11;

//levantamos inputs de html pasan verificaciones y agregamos al array de sistema.productos
function crearProductoNuevo() {
  let nombreProductoCampo = document.querySelector("#txtNombreProducto").value;
  let precioProductoCampo = Number(document.querySelector("#txtPrecioProducto").value);
  let stockProductoCampo = Number(document.querySelector("#txtStockProducto").value);
  let aparece = sistema.buscarElemento(sistema.productos, "nombreDelProducto", nombreProductoCampo);

  if (!isNaN(precioProductoCampo) && !isNaN(stockProductoCampo) && !aparece && stockProductoCampo > 0 && precioProductoCampo > 0) {
    let descripcionProductoCampo = document.querySelector("#txtDescripcionProducto").value;
    let imagenProductoCampo = document.querySelector("#fileImagenProducto").value;
    let nombreImagen = imagenProductoCampo.substring(imagenProductoCampo.lastIndexOf("\\") + 1);
    let idProductoFinal = "PROD_ID_" + idProducto;
    let producto = new Producto(idProductoFinal, nombreProductoCampo, precioProductoCampo, descripcionProductoCampo, nombreImagen, stockProductoCampo, "noOferta", "activo");
    sistema.agregarProductoNuevo(producto);
    idProducto++;
    alert("Producto creado con exito");
  } else {
    alert("Corregir datos");
  }
  document.querySelector("#txtNombreProducto").value = "";
  document.querySelector("#txtPrecioProducto").value = "";
  document.querySelector("#txtStockProducto").value = "";
  document.querySelector("#txtDescripcionProducto").value = "";
  document.querySelector("#fileImagenProducto").value = "";
  listarProductosCompra();
  listarProductosOferta();
  adminProductos();
}
//-------------------------Listar productos seccion compra-------------------------

//Listamos los productos de la SECCION COMPRA en html
function listarProductosCompra() {
  document.querySelector("#tblCompra").innerHTML = "";
  for (let i = 0; i < sistema.productos.length; i++) {
    if (sistema.productos[i].estado === "activo") {
      document.querySelector("#tblCompra").innerHTML += `<tr>
        <td>${sistema.productos[i].nombreDelProducto}</td>
        <td>${sistema.productos[i].precio}</td>
        <td>${sistema.productos[i].descripcion}</td>
        <td><img src="Imagenes/${sistema.productos[i].imagen}"></td>
        <td>${sistema.productos[i].oferta}</td>
        <td><input type="text" id="txtProducto${sistema.productos[i].id}"/></td>
        <td><input type="button" value="Agregar carrito" class="btnAgregarCarrito" data-producto="${sistema.productos[i].id}"></td>
        </tr>`;
    }
  }
  let btnAgregarCarrito = document.querySelectorAll(".btnAgregarCarrito");
  for (let i = 0; i < btnAgregarCarrito.length; i++) {
    btnAgregarCarrito[i].addEventListener("click", agregarCarritoComun);
  }
}
//Declaramos idcompras para hacerlo autoincremental
let idCompra = 6;

//Aqui se le da funcionalidad al boton "Agregar carrito" que se creo en la tabla de listados de productos SECCION COMPRAS
function agregarCarritoComun() {
  let idProductoCompraComun = this.getAttribute("data-producto");
  let cantidadProductoComun = Number(document.querySelector("#txtProducto" + idProductoCompraComun).value);
  if (!isNaN(cantidadProductoComun) && cantidadProductoComun > 0) {
    let compraComun = new Compra(idCompra, usuarioLogueado.id, idProductoCompraComun, "pendiente", cantidadProductoComun);
    sistema.agregarCompra(compraComun);
    listarCompraComun();
    document.querySelector("#txtProducto" + idProductoCompraComun).value = "";
  } else {
    alert("Por favor ingrese un valor correcto");
  }
}
//Listamos los productos agregados al carrito
function listarCompraComun() {
  let sumaTotaldeCompraComun = 0;
  document.querySelector("#tblCarrito").innerHTML = "";
  for (let i = 0; i < sistema.compras.length; i++) {
    if (usuarioLogueado && usuarioLogueado.id === sistema.compras[i].idUsuario) {
      let productoSeleccionado = sistema.obtenerObjeto(sistema.productos, "id", sistema.compras[i].idProducto);
      let usuarioComprador = sistema.obtenerObjeto(sistema.usuarios, "id", sistema.compras[i].idUsuario);
      let estadoSeleccionadoComun = document.querySelector("#slcFiltrarCarrito").value;

      if (productoSeleccionado !== null && sistema.compras[i].estado === "pendiente" && (estadoSeleccionadoComun === "pendientes" || estadoSeleccionadoComun === "todo")) {
        document.querySelector("#tblCarrito").innerHTML += `<tr>
            <td>${productoSeleccionado.nombreDelProducto}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${sistema.compras[i].cantidadProductosComprados * productoSeleccionado.precio}</td>   
            <td>${sistema.compras[i].estado}</td>           
            <td><input type="button" value="Cancelar" class="btnCancelar" data-cancelar="${sistema.compras[i].idCompra}"></td>
            </tr>`;
      }
      if (productoSeleccionado !== null && sistema.compras[i].estado === "aprobada" && (estadoSeleccionadoComun === "aprobadas" || estadoSeleccionadoComun === "todo")) {
        sumaTotaldeCompraComun += sistema.compras[i].cantidadProductosComprados * productoSeleccionado.precio;
        document.querySelector("#tblCarrito").innerHTML += `<tr>
            <td>${productoSeleccionado.nombreDelProducto}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${sistema.compras[i].cantidadProductosComprados * productoSeleccionado.precio}</td>
            <td>${sistema.compras[i].estado}</td>           
            </tr>`;
        document.querySelector("#pTotalDeCompra").innerHTML = `La suma total de su compra es de: $${sumaTotaldeCompraComun}<br>
            El saldo de su cuenta es de: $${usuarioComprador.saldo}`;
      }
      if (productoSeleccionado !== null && sistema.compras[i].estado === "cancelado" && (estadoSeleccionadoComun === "canceladas" || estadoSeleccionadoComun === "todo")) {
        document.querySelector("#tblCarrito").innerHTML += `<tr>
            <td>${productoSeleccionado.nombreDelProducto}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${sistema.compras[i].cantidadProductosComprados * productoSeleccionado.precio}</td>
            <td>${sistema.compras[i].estado}</td>           
            </tr>`;
      }
    }
  }

  let btnCancelarCompra = document.querySelectorAll(".btnCancelar");
  for (let i = 0; i < btnCancelarCompra.length; i++) {
    btnCancelarCompra[i].addEventListener("click", cancelarCompra);
  }
  idCompra++;
  adminCompras();
}

//Funcion que llena la tabla de la SECCION OFERTA, toma los productos en "oferta", si tambien estan
//"activos" los imprime en la tabla y les agrega un boton "Agregar carrito"
function listarProductosOferta() {
  document.querySelector("#tblOfertas").innerHTML = "";
  for (let i = 0; i < sistema.productos.length; i++) {
    if (sistema.productos[i].oferta === "oferta" && sistema.productos[i].estado === "activo") {
      document.querySelector("#tblOfertas").innerHTML += `<tr>
            <td>${sistema.productos[i].nombreDelProducto}</td>
            <td>${sistema.productos[i].precio}</td>
            <td>${sistema.productos[i].descripcion}</td>
            <td><img src="Imagenes/${sistema.productos[i].imagen}"></td>        
            <td><input type="text" id="txtProductoOferta${sistema.productos[i].id}"/></td>
            <td><input type="button" value="Agregar carrito" class="btnAgregarCarritoOferta" id="${sistema.productos[i].id}"></td>
            </tr>`;
    }
  }

  let btnAgregarCarritoOferta = document.querySelectorAll(".btnAgregarCarritoOferta");
  for (let i = 0; i < btnAgregarCarritoOferta.length; i++) {
    btnAgregarCarritoOferta[i].addEventListener("click", agregarCarritoOferta);
  }
}

//Le damos funcion a los botones "agregar carrito" que se crearon en la SECCION OFERTA
function agregarCarritoOferta() {
  let idProductoCompra = this.getAttribute("id");
  let cantidadProducto = Number(document.querySelector("#txtProductoOferta" + idProductoCompra).value);

  if (!isNaN(cantidadProducto) && cantidadProducto > 0) {
    let compra = new Compra(idCompra, usuarioLogueado.id, idProductoCompra, "pendiente", cantidadProducto);
    sistema.agregarCompra(compra);
    listarCompraComun();
    document.querySelector("#txtProductoOferta" + idProductoCompra).value = "";
  } else {
    alert("Por favor ingrese un valor correcto");
  }
}

//-------------------------Funcion cancelar-------------------------
//Le damos funcion a los botones "cancelar" creados en el carrito
function cancelarCompra() {
  let idCancelarProducto = Number(this.getAttribute("data-cancelar"));
  for (let i = 0; i < sistema.compras.length; i++) {
    if (idCancelarProducto === sistema.compras[i].idCompra) {
      sistema.compras[i].estado = "cancelado";
    }
  }
  adminCompras();
  listarCompraComun();
}

//-------------------------Administracion de compras-------------------------
//En esta funcion se recorre el array de compras y se van imprimiendo en diferentes tablas segun su estado
//"aprobada", "cancelado" y "pendiente". A la tabla pendiente a cada compra se le agrega un boton para aprobar la compra
function adminCompras() {
  document.querySelector("#tblAdminComprasPendientes").innerHTML = "";
  document.querySelector("#tblAdminComprasAprobadas").innerHTML = "";
  document.querySelector("#tblAdminComprasCanceladas").innerHTML = "";

  for (let i = 0; i < sistema.compras.length; i++) {
    let sumaTotaldeCompra = 0;
    let productoAprobar = sistema.obtenerObjeto(sistema.productos, "id", sistema.compras[i].idProducto);

    if (productoAprobar !== null && sistema.compras[i].estado === "pendiente") {
      document.querySelector("#tblAdminComprasPendientes").innerHTML += `<tr>
            <td>${sistema.compras[i].idUsuario}</td>
            <td>${sistema.compras[i].idCompra}</td>
            <td>${productoAprobar.id}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${productoAprobar.estado}</td>
            <td><input type="button" value="Aprobar" class="btnAprobar" data-aprobar="${sistema.compras[i].idCompra}"></td>
            </tr>`;
    }
    if (productoAprobar !== null && sistema.compras[i].estado === "aprobada") {
      sumaTotaldeCompra += sistema.compras[i].cantidadProductosComprados * productoAprobar.precio;
      document.querySelector("#tblAdminComprasAprobadas").innerHTML += `<tr>
            <td>${sistema.compras[i].idUsuario}</td>
            <td>${sistema.compras[i].idCompra}</td>
            <td>${productoAprobar.id}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${productoAprobar.estado}</td>
            </tr>`;
    }
    if (productoAprobar !== null && sistema.compras[i].estado === "cancelado") {
      document.querySelector("#tblAdminComprasCanceladas").innerHTML += `<tr>
            <td>${sistema.compras[i].idUsuario}</td>
            <td>${sistema.compras[i].idCompra}</td>
            <td>${productoAprobar.id}</td>
            <td>${sistema.compras[i].cantidadProductosComprados}</td>
            <td>${productoAprobar.estado}</td>
            </tr>`;
    }
  }
  let btnAprobar = document.querySelectorAll(".btnAprobar");
  for (let i = 0; i < btnAprobar.length; i++) {
    btnAprobar[i].addEventListener("click", aprobarCompra);
  }
}
//Funcion a la que llama el boton aprobar, pasa por un  par de verificaciones, y modifica el estado de la compra, el saldo del usuario
// y si el producto se queda sin stock lo pausa
function aprobarCompra() {
  let idProdAprobado = Number(this.getAttribute("data-aprobar"));

  for (let i = 0; i < sistema.compras.length; i++) {
    if (idProdAprobado === sistema.compras[i].idCompra) {
      let usuario = sistema.obtenerObjeto(sistema.usuarios, "id", sistema.compras[i].idUsuario);
      let producto = sistema.obtenerObjeto(sistema.productos, "id", sistema.compras[i].idProducto);
      let compra = sistema.compras[i];
      let totalCompra = compra.cantidadProductosComprados * producto.precio;

      if (usuario.saldo >= totalCompra && producto.stockDisponible >= compra.cantidadProductosComprados && producto.estado === "activo") {
        usuario.saldo -= totalCompra;
        producto.stockDisponible -= compra.cantidadProductosComprados;
        compra.estado = "aprobada";
        if (producto.stockDisponible === 0) {
          producto.estado = "pausado";
        }
        adminCompras();
        adminProductos();
        listarProductosCompra();
        listarProductosOferta();
        listarCompraComun();
        listarBalance();
        alert("Compra aprobada con éxito");
      } else {
        alert("No se puede aprobar la compra: saldo insuficiente, stock insuficiente o producto inactivo");
      }
      break;
    }
  }
}

//-------------------------Administracion productos-------------------------
//Esta funcion lista una tabla con todos los objetos del array productos, y les agrega inputs para modificar algunas propiedades.
//ademas le agrega un boton "Modificar" para llamar a la funcion modificar
function adminProductos() {
  document.querySelector("#tblAdminProductos").innerHTML = "";
  for (let i = 0; i < sistema.productos.length; i++) {
    document.querySelector("#tblAdminProductos").innerHTML += `<tr>
  <td>${sistema.productos[i].nombreDelProducto}</td>
  <td>${sistema.productos[i].stockDisponible}</td>
  <td><input type="text" id="stockProd${sistema.productos[i].id}" value="${sistema.productos[i].stockDisponible}"></td>
  <td>${sistema.productos[i].estado}</td>
  <td><select id="estadoProd${sistema.productos[i].id}">
  <option value="elegir">Elija una opcion</option>
  <option value="activo">Activar producto</option>
  <option value="pausar">Pausar producto</option>
  </select></td>
  <td>${sistema.productos[i].oferta}</td>
  <td><select id="ofertaProd${sistema.productos[i].id}">
  <option value="elegir">Elija una opcion</option>
  <option value="oferta">Poner de oferta</option>
  <option value="nooferta">Sacar de oferta</option>
  </select></td></td>
  <td><input type="button" value="Modificar" class="btnModificarProducto" data-modificar="${sistema.productos[i].id}"></td>`;
  }
  let btnModificarProducto = document.querySelectorAll(".btnModificarProducto");
  for (let i = 0; i < btnModificarProducto.length; i++) {
    btnModificarProducto[i].addEventListener("click", modificarProducto);
  }
}

//Funcion que llama el boton "Modificar", esta funcion lo que hace es levavntar los imputs que se listaron,
//y despues de unas verificaciones modifica el array de productos con los nuevos valores para su propiedad
function modificarProducto() {
  let idModificarProducto = this.getAttribute("data-modificar");
  let stockProducto = document.querySelector(`#stockProd${idModificarProducto}`).value;
  let estadoProducto = document.querySelector(`#estadoProd${idModificarProducto}`).value;
  let ofertaProducto = document.querySelector(`#ofertaProd${idModificarProducto}`).value;
  if (estadoProducto !== "elegir" && ofertaProducto !== "elegir") {
    for (let i = 0; i < sistema.productos.length; i++) {
      if (sistema.productos[i].id === idModificarProducto) {
        sistema.productos[i].estado = estadoProducto;
        sistema.productos[i].oferta = ofertaProducto;
        sistema.productos[i].stockDisponible = stockProducto;
        break;
      }
    }
    alert("Se modifico con exito");
  } else {
    alert("Elija algun valor");
  }
  listarProductosCompra();
  listarProductosOferta();
  adminProductos();
}

//-------------------------Balance de ganancias-------------------------
// esta funcion lo que hace es listar todos los productos en una tabla, indicando cuantas ventas por prudcto hay
//y tambien calcula la suma total de todos los productos vendidos o sea que la compra tenga estado "aprobada"
function listarBalance() {
  document.querySelector("#tblTablaBalance").innerHTML = "";
  for (let i = 0; i < sistema.productos.length; i++) {
    const productoBalance = sistema.productos[i];
    document.querySelector("#tblTablaBalance").innerHTML += `<tr>
        <td>${productoBalance.nombreDelProducto}</td>
        <td>${sistema.cantidadComprada(productoBalance.id)}</td>
        </tr>`;
  }
  let ganancia = sistema.ganaciaTotal();
  document.querySelector("#pBalance").innerHTML = `Las ganancias son de: $${ganancia}`;
}