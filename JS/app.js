//Definimos el array carrito, vacío inicialmente
const carrito = [];

//Booleano para setear si estoy en carrito.html o no
let enCarrito = false;

//Variables para setear parametros de búsqueda
let colorBuscado = '';
let valorMinInput = "";
let valorMaxInput = "";

//Funcion para buscar productos con el buscador de productos.html
async function buscarProducto(productos) {

  const formularioBusqueda = document.querySelector('.buscador-form');

  formularioBusqueda.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de inmediato

      // Obtener el valor de búsqueda
      const inputBusqueda = document.querySelector('[name="busqueda"]');
      const valorBusqueda = inputBusqueda.value.trim();

      // Simula recarga del servicor con una llamada asíncrona a setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const productosBuscados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));

      mostrarProductos(productosBuscados);
  });
  
}

//Funcion para buscar productos seleccionando una categoria
function buscarProductoCategoria(categoria){

  // Filtra los productos según el tipo seleccionado
  const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(categoria));
  // Llama a la función mostrarProductos con la lista filtrada
  mostrarProductos(productosFiltrados);
}

//Funcion que setear el color seleccionado
function guardarColorSeleccionado() {
  // Obtén el valor seleccionado
  const seleccionColor = document.getElementById('seleccionColor');
  colorBuscado = seleccionColor.value;
}

//Funcion que setear precios seleccionados
function guardarPrecioSeleccionado(){

  valorMinInput = document.getElementById('minPrecio').value;
  valorMaxInput = document.getElementById('maxPrecio').value;

}

//Funcion que para realizar la búsqueda, se activa con el boton
function buscarProductoBoton(){

  if (colorBuscado === "0") {
    colorBuscado = "";
  }


    if (!colorBuscado && !valorMinInput && !valorMaxInput) {
      console.log("Ingresa algún valor para realizar la búsqueda");
  }


    let valorMin = valorMinInput !== "" ? parseInt(valorMinInput) : Math.min(...productos.map(producto => producto.precio));
    let valorMax = valorMaxInput !== "" ? parseInt(valorMaxInput) : Math.max(...productos.map(producto => producto.precio));

    const productosFiltrados = productos
  .filter(producto => colorBuscado === "" || producto.color === colorBuscado)
  .filter(producto => producto.precio >= valorMin && producto.precio <= valorMax);


  mostrarProductos(productosFiltrados);

  valorMin = "";
  valorMax = "";

}

//Mostramos los productos desde el array de productos segun el array enviado por parámetro
function mostrarProductos(prodBuscado) {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = ""; // Limpiar el contenedor
    
    prodBuscado.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("col-lg-4", "col-6", "mb-4");
        divProducto.setAttribute("data-aos", "zoom-in");
        divProducto.innerHTML = `
            <div class="card product-card">
                <div class="card-img" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, '${producto.img}')">
                    <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.id}','${producto.nombre}', ${producto.precio}, '${producto.img}')">
                    <p class="add-to-cart">Agregar al carrito</p>
                    <p class="price">$${producto.precio}</p>
                    </a>
                </div>
            </div>
        `;
        contenedor.appendChild(divProducto);
    });

    

  }

    //Mostramos los productos que son novedades, en index.html
function mostrarProductosNovedades() {

  // Ordenar productos por fecha de manera descendente (más reciente primero)
  const productosOrdenados = productos.sort((a, b) => b.fechaIngreso - a.fechaIngreso);

  // Mostrar solo los ultimos 6 productos agregados al stock
  const productosNovedades = productosOrdenados.slice(0, 6);

  // Obtener los contenedores donde mostrarás los productos novedades
  const contenedor = document.getElementById("contenedorProductos");

  
  productosNovedades.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("col-lg-4", "col-6", "mb-4");

    divProducto.innerHTML = `
    <div class="card product-card">
      <div class="card-img" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, '${producto.img}')">
          <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
      </div>
      <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.id}','${producto.nombre}', ${producto.precio}, '${producto.img}')">
          <p class="add-to-cart">Agregar al carrito</p>
          <p class="price">$${producto.precio}</p>
          </a>
      </div>
    </div>
    `;
    contenedor.appendChild(divProducto);
  });
  

}

  //Mostramos los productos destacados en carrusel, en index.html
function mostrarProductosDestacados() {

  const productosDestacados = productos.filter(producto => producto.destacado);
  // Obtener los contenedores donde mostrarás los productos destacados
  const contenedorDestacados1 = document.getElementById('articulosDestacados1');
  const contenedorDestacados2 = document.getElementById('articulosDestacados2');

  // Función para renderizar productos en un contenedor
  const renderizarProductos = (productos, contenedor) => {
    productos.forEach(producto => {
      const divProducto = document.createElement("div");
      divProducto.classList.add("col-4", "mb-4");

      divProducto.innerHTML = `
      <div class="card product-card">
        <div class="card-img" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, '${producto.img}')">
            <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
        </div>
        <div class="card-body">
            <h3 class="card-title">${producto.nombre}</h3>
            <a class="card-button d-flex" onclick="agregarAlCarrito('${producto.id}','${producto.nombre}', ${producto.precio}, '${producto.img}')">
            <p class="add-to-cart">Agregar al carrito</p>
            <p class="price">$${producto.precio}</p>
            </a>
        </div>
      </div>
      `;
      contenedor.appendChild(divProducto);
    });
  };

  // Limitar la cantidad de productos a mostrar
  const productosAMostrar1 = productosDestacados.slice(0, 3);
  const productosAMostrar2 = productosDestacados.slice(3, 6);
  // Renderizar los primeros 3 productos destacados
  renderizarProductos(productosAMostrar1, contenedorDestacados1);
  renderizarProductos(productosAMostrar2, contenedorDestacados2);

}

//Agregamos producto al carrito
function agregarAlCarrito(id, nombre, precio, img) {

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ id, nombre, precio, img, cantidad: 1 });
      }

    // Actualizar la lista en el modal
    actualizarModalCarrito();

    // Actualizar el contador del botón "Ver carrito"
    actualizarContadorCarrito();

    // Mostrar la alerta de notificación
    mostrarAlertaNotificacion();

    // Guardamos el estado del carrito en storage
    guardarCarritoLocalStorage();


}  

// Actualizamos el listado de productos en modal
function actualizarModalCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista actual

    const totalCarrito = document.getElementById('totalCarrito'); //Contador "Total gastado"

    // Cuando no haya productos mostramos un cartel informando carrito vacío
    if (carrito.length === 0) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `
            <h5 class="d-flex justify-content-center">Aún no hay productos en carrito</h5>
        `
        listaCarrito.appendChild(item);
    }
  

    let precioTotal = 0;
    const arrayPrecioTotal = []
    // Agregar cada producto del carrito a la lista del modal
    carrito.map((producto, index) => {
      const item = document.createElement('li');
      item.classList.add('list-group-item');

    //Variable que almacena el total del precio segun la cantidad elegida de un producto  
    precioTotal = producto.precio * producto.cantidad;
    arrayPrecioTotal.push(precioTotal);

      item.innerHTML = `
      <div class="row">
        <div class="col-9">
            <div class="d-flex flex-column align-items-start">
                <h5>${producto.nombre}</h5>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio Total: $${precioTotal}</p>
            </div>
        </div>
        <div class="col-3">
            <div class="d-flex align-item-center">
                <span class=" my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </span>
            </div>
            
        </div>
      </div>
      
        
        
      `;
      listaCarrito.appendChild(item);
    });

    //Mostramos el total gastado segun los objetos del carrito
    const totalProd = arrayPrecioTotal.reduce((total, precio) => total + precio, 0);
    totalCarrito.innerHTML = `
        <h5 class="d-flex justify-content-start">Total en carrito: $${totalProd.toFixed(2)}</h5>
    `

  }

  // Funcion para quitar producto del carrito
  function eliminarDelCarrito(index) {
    
    const producto = carrito[index];

  if (producto.cantidad > 1) {
    // Si la cantidad es mayor que 1, decrementa la cantidad en 1
    producto.cantidad--;
  } else {
    // Si la cantidad es 1, elimina el producto del carrito
    carrito.splice(index, 1);
  }

  //Si estoy en carrito.html actualizo la tabla
    if (enCarrito === true) {
        actualizarCompraCarrito();
    }
    actualizarModalCarrito(); // Actualizar la lista en el modal
    actualizarContadorCarrito(); // Actualizar el contador carrito
    guardarCarritoLocalStorage();
  }

    // Actualizar el contenido del contador en el botón "Ver carrito"
  function actualizarContadorCarrito () {
    
    const botonContadorCarrito = document.getElementById('btnContadorCarrito');
    const contadorCarrito = carrito.length;

    //Cuando el contador sea 0 (no haya productos) no muestra nada. Cuando no sea 0 muestra el badge
    if (contadorCarrito === 0) {
        botonContadorCarrito.innerText = "";
    } else {
        botonContadorCarrito.innerText = contadorCarrito;
    }
    

  }

  // Funcion para mostrar el modal del carrito
  function mostrarModal() {
    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);

    actualizarModalCarrito();

    modal.show();
  }

  // Funcion para mostrar el alerta al agregar producto al carrito
  function mostrarAlertaNotificacion() {
    const alertaNotificacion = document.getElementById('alertaNotificacion');
    alertaNotificacion.classList.remove('show', 'fade');
    alertaNotificacion.style.display = 'block';

    // Aplicar la clase 'show' para activar la animación de entrada
    setTimeout(function () {
        alertaNotificacion.classList.add('show');
      }, 50); 

    // Ocultar la alerta después de unos segundos (opcional)
    setTimeout(function() {
        // Aplicar la clase 'fade' para activar la animación de salida
        alertaNotificacion.classList.add('fade');
  
        // Quitar la clase 'show' al ocultar
        alertaNotificacion.classList.remove('show');
  
        // Ocultar la alerta después de completar la animación de salida
        setTimeout(function() {
          alertaNotificacion.style.display = 'none';
          alertaNotificacion.classList.remove('fade');
        }, 500); // Duración de la animación de salida
      }, 3000); // Ocultar después de 3 segundos
  }

  // Guardar el carrito en el storage
  function guardarCarritoLocalStorage(){
    //mandar al local
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


// Actualizar el listado del carrito.html
  function actualizarCompraCarrito() {

    const listaCompra = document.getElementById('listaCompra');

    //Elementos del "ticket"
    const totalProductos = document.getElementById('totalProductos');
    const totalEnvio = document.getElementById('totalEnvio');
    const totalServicio = document.getElementById('totalServicio');
    const totalCompraSaldo = document.getElementById('totalCompraSaldo');

    //Defino variables de valor de envío y costo de servicio
    let envio = 500;
    let servicio = 95;
    

    listaCompra.innerHTML = '';

    // Cuando no haya productos mostramos un cartel informando carrito vacío
    if (carrito.length === 0) {
        const item = document.createElement('tr');
        item.classList.add('item-carrito');
        item.innerHTML = `
            <td class="text-center item-descrip pt-5">Aún no hay productos en carrito</td>
        `
        listaCompra.appendChild(item);
    } else {

        //Cuando haya al menos 1 elemento, primero muestro los encabezados de la tabla
        const titulosTabla = document.createElement('tr');
        titulosTabla.classList.add('titulos-tabla');
        titulosTabla.innerHTML = `
            <td></td>
            <td class="text-center">Producto</td>
            <td class="text-center">Precio</td>
            <td class="text-center">Cantidad</td>
            <td class="text-center">Subtotal</td>
            <td></td>
        ` 
        listaCompra.appendChild(titulosTabla);
    }

    let precioTotal = 0;
    const arrayPrecioTotal = []
  
    // Agregar cada producto del carrito a la tabla
    carrito.map((producto, index) => {
        const item = document.createElement('tr');
        item.classList.add('item-carrito');

        precioTotal = producto.precio * producto.cantidad;
        arrayPrecioTotal.push(precioTotal);

        item.innerHTML = `
        <td class="img-item-carrito">
        <img src="${producto.img}" alt="Imagen de ${producto.nombre}">
        </td>
        <td class="text-center item-descrip">${producto.nombre}</td>
        <td class="text-center item-descrip">$${producto.precio}</td>
        <td class="text-center item-descrip">${producto.cantidad}</td>
        <td class="text-center item-descrip">$${precioTotal}</td>
        <td class="text-center">
            <span class="float-end align-self-center my-button bg-danger text-white" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </span>
        </td>
      `;
      listaCompra.appendChild(item);
    });

    //Mostramos el total gastado segun los objetos del carrito
    const totalProd = arrayPrecioTotal.reduce((total, precio) => total + precio, 0);
    totalProductos.innerText = `$${totalProd.toFixed(2)}`;

    //Mostramos el costo de envio
    totalEnvio.innerText = `$${envio.toFixed(2)}`;

    //Mostramos el costo de servicio
    totalServicio.innerText = `$${servicio.toFixed(2)}`;

    // Sumamos todas las variables para informar el total de la compra
    let totalComprado = totalProd + envio + servicio;
    totalCompraSaldo.innerText = `$${totalComprado.toFixed(2)}`;
  }


//Función para obtener los elementos del storage, y traer los datos del archivo JSON
  function obtenerCarritoStorage() {
    // Verificar si hay elementos en localStorage al inicio
    document.addEventListener('DOMContentLoaded', async function () {

      try {
        // Obtener los productos desde el archivo JSON
        const productos = await obtenerProductos();
        // Obtener los elementos guardados en localStorage
        const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];

        // Cargar los elementos en el carrito
        if(carrito.length === 0){
          carrito.push(...carritoStorage);
        }

        //Chequeo la ruta desde la cual estoy accediendo
        const rutaActual = document.location.pathname;
      
        //Si estoy en carrito.html activo el booleano y llamo a la función actualizarCompraCarrito
        if (rutaActual.includes('carrito.html')) {
            console.log('Estás en carrito.html');
            enCarrito = true;
            actualizarCompraCarrito();
          } 
        else if (rutaActual.includes('productos.html')){
          console.log('Estás en productos.html');
            enCarrito = false;
            mostrarProductos(productos);
            buscarProducto(productos);

        }
        else if (rutaActual.includes('contacto.html')){ 
          console.log('Estás en contacto.html');
          enCarrito = false;
          
        }
        else if (rutaActual.includes('sobrenosotros.html')){ 
          console.log('Estás en sobrenosotros.html');
          enCarrito = false;
          
        }
        else { 
          console.log('Estás en index.html');
          enCarrito = false;
          mostrarProductosDestacados(productos);
          mostrarProductosNovedades(productos);
        }



          /**
           Tuve que implementar esta funcionalidad, ya que al estar conectando app.js desde varios archivos
          me generaba problemas al llamar a elementos del DOM unicos desde cada documento.
          Por eso tuve que condicionar desde que ruta estoy accediendo al codigo, y asi llamar a sus funciones.
          El booleano lo implemente xq al eliminar un producto del modal, no se eliminaba de carrito.html
          ya que la funcion eliminarDelCarrito no hacia el llamado a actualizarCompraCarrito, y no podia llamar a esa funcion desde otro archivo por el problema anterior
          por lo tanto con el booleano, cuando sea true puedo hacer el llamado a actualizarCompraCarrito desde eliminarDelCarrito
          * 
          */
          

        // Actualizar el contador del carrito
        actualizarContadorCarrito();


    
      }

      catch (error) {
        console.error('Error al cargar productos:', error);
      }

    });
}

//Promesa que devuelve los datos del array desde el archivo productos.json
function obtenerProductos() {
  return new Promise((resolve, reject) => {
      fetch('../json/productos.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Error al obtener productos. Código HTTP ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              productos = data; // Almacena los productos en la variable
              resolve(data); // Resuelve la promesa con los productos
          })
          .catch(error => {
              console.error('Error al obtener productos:', error);
              reject(error); // Rechaza la promesa con el error
          });
  });
}

//Validamos el envio de formularios
function simularEnvioFormulario(){
  // Obtener datos del formulario
  let nombre = document.getElementById('nombreInput').value;
  let apellido = document.getElementById('apellidoInput').value;
  let email = document.getElementById('emailInput').value;
  let telefono = document.getElementById('telInput').value;
  let mensaje = document.getElementById('mensajeInput').value;

  // Validación de nombre y apellido (solo letras)
  const nombreApellidoRegex = /^[a-zA-Z]+$/;
  if (!nombreApellidoRegex.test(nombre) || !nombreApellidoRegex.test(apellido)) {
    mostrarMensajeError('Error: el nombre y apellido no son válidos.');
    return;
  }

  // Validación de formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarMensajeError('Por favor, ingrese un correo electrónico válido.');
    return;
  }

  // Validación de teléfono (solo números)
  const telefonoRegex = /^\d+$/;
  if (!telefonoRegex.test(telefono)) {
    mostrarMensajeError('Por favor, ingrese un teléfono válido.');
    return;
  }

  // Validación de mensaje (máximo 400 caracteres)
  if (mensaje.length > 400) {
    mostrarMensajeError('El mensaje no puede superar los 400 caracteres.');
    return;
  }

  // Al llegar acá el formulario será válido y enviamos el mensaje
  Swal.fire("Mensaje enviado con éxito. En breve nos contactaremos. ¡Gracias!");


}

//Función que se llama en caso de que un parámetro del formulario no sea válido
function mostrarMensajeError(mensaje) {
  const alertaNotificacion = document.getElementById('alertaNotiErrorForm');
  const mensajeAlerta = document.getElementById('mensajeAlerta');
  alertaNotificacion.classList.remove('show', 'fade');
  console.log(mensaje)

  mensajeAlerta.innerText = mensaje;
  alertaNotificacion.style.display = 'block';

    // Aplicar la clase 'show' para activar la animación de entrada
    setTimeout(function () {
        alertaNotificacion.classList.add('show');
      }, 50); 

    // Ocultar la alerta después de unos segundos (opcional)
    setTimeout(function() {
        // Aplicar la clase 'fade' para activar la animación de salida
        alertaNotificacion.classList.add('fade');
  
        // Quitar la clase 'show' al ocultar
        alertaNotificacion.classList.remove('show');
  
        // Ocultar la alerta después de completar la animación de salida
        setTimeout(function() {
          alertaNotificacion.style.display = 'none';
          alertaNotificacion.classList.remove('fade');
        }, 500); // Duración de la animación de salida
      }, 3000); // Ocultar después de 3 segundos

  

}

//Función que muestra mensaje de exito al pagar
function mostrarMensajePagoExitoso(){

  if (carrito.length > 0) {
    Swal.fire({
    title: "Pago realizado con éxito ¡Muchas gracias!",
    text: "Redirigiendo al inicio",
    icon: "success"
    });

    localStorage.clear();

    // Redirigir a la página index.html después de 3000 milisegundos (3 segundos)
    setTimeout(function() {
      window.location.href = '../index.html';
    }, 4000);
  }
  else { //Cuando no haya productos en carrito, muestra mensaje de error
    Swal.fire({
      title: "Pago rechazado",
      text: "No hay productos en el carrito",
      icon: "error"
      });

  }

  


}

obtenerCarritoStorage();

