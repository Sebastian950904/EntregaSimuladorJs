document.addEventListener("DOMContentLoaded", () => {
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Proteina",
      precio: 12000,
      imagen: "imagenes/proteina.jpg",
    },
    {
      id: 2,
      nombre: "Creatina",
      precio: 10000,
      imagen: "imagenes/proteina.jpg",
    },
    {
      id: 3,
      nombre: "PreEntreno",
      precio: 6800,
      imagen: "imagenes/proteina.jpg",
    },
    {
      id: 4,
      nombre: "BarrasProteicasX12-Chocolate",
      precio: 4000,
      imagen: "imagenes/BarraP.jpg",
    },
    {
      id: 5,
      nombre: "BarrasProteicasX12-Vainilla",
      precio: 4000,
      imagen: "imagenes/BarraP.jpg",
    },
    {
      id: 6,
      nombre: "BarrasProteicasX12-Frutilla",
      precio: 4000,
      imagen: "imagenes/BarraP.jpg",
    },
  ];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const divisa = "$";
  const DOMitems = document.querySelector("#items");
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");
  const DOMbotonFinalizar = document.querySelector("#botonFinalizar");

  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");
      // Body
      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");
      // Titulo
      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);
      // Precio
      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${info.precio}${divisa}`;
      // Boton
      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "btnCompra";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }
  function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"));
    renderizarCarrito();
  }
  const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  JSON.parse(localStorage.getItem("carrito"));
  // Funciones

  /**
   * Dibuja todos los productos a partir de la base de datos
   */
  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4", "text-bg-dark", "border-light");
      // Body
      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");
      // Titulo
      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);
      // Precio
      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${info.precio}${divisa}`;
      // Boton
      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-info");
      miNodoBoton.textContent = "Comprar";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }
  function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"));
    renderizarCarrito();
    saveLocal();
  }

  function renderizarCarrito() {
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        return itemId === item ? (total += 1) : total;
      }, 0);

      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-bg-dark", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      // Boton de borrar

      const miBoton = document.createElement("button");

      miBoton.classList.add("btn", "btn-danger", "mx-1");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);

      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
  }

  function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    saveLocal();
    renderizarCarrito();
  }

  function calcularTotal() {
    return carrito
      .reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
  }
  function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
  }
  function ventaFin() {
    carrito = [];
    renderizarCarrito();
    Swal.fire({
      position: "top",
      icon: "success",
      imageUrl: "imagenes/Happy face_Flatline.png",
      imageWidth: 400,
      imageHeight: 300,
      title: "Muchas gracias por tu compra!",
      showConfirmButton: false,
      timer: 4500,
    });
  }

  DOMbotonVaciar.addEventListener("click", vaciarCarrito);
  DOMbotonFinalizar.addEventListener("click", ventaFin);

  renderizarProductos();
  renderizarCarrito();
});
