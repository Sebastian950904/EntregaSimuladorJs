const Datos = [
  {
    nombre: "Proteina",
    precio: 11000,
  },
  {
    nombre: "PreEntreno",
    precio: 4000,
  },
  {
    nombre: "CBD",
    precio: 4500,
  },
  {
    nombre: "Creatina",
    precio: 12000,
  },
  {
    nombre: "SuplementoComprimido",
    precio: 8000,
  },
];
alert("Bienvenidos a FitSport");
let Carrito = {
  Productos: [],
  GetTotal: function () {
    let suma = 0;
    for (let p of this.Productos) {
      suma += p.precio * p.cantidad - descuento;
    }
    return suma;
  },
  Agregar: function (producto, cantidad) {
    this.Productos.push({ ...producto, cantidad: cantidad });
  },
  Vaciar: function () {
    this.Productos = [];
  },
};
function GetStringProducto(producto) {
  return producto.nombre + " - $" + producto.precio + " c/u";
}

function GetListaProductoString() {
  var lista = "";
  for (var i = 0; i < Datos.length; i++) {
    lista += `${i + 1}) ${GetStringProducto(Datos[i])}\n`;
  }
  return lista;
}
function listadoProductos() {
  let listado = Number(prompt(GetListaProductoString()));
  let producto = GetProducto(listado);
  if (producto != null) {
    cantidad = Number(prompt("Cuantas desea llevar?"));
    Carrito.Agregar(producto, cantidad);

    compra = Number(
      prompt("\nQuiere agregar mas cosas al carrito? \n1)Si \n2)No")
    );
    if (compra == 1) {
      listadoProductos();
    } else {
      alert(`Total a pagar: $${Carrito.GetTotal()} `);
    }
  } else {
    alert("Opcion Erronea");
    listadoProductos();
  }
  function GetProducto(seleccion) {
    if (Datos.length >= seleccion) {
      return Datos[seleccion - 1];
    }
    return null;
  }
}

var descuento = 0;
var codPromocion = prompt(
  "Si tienes un código con descuento , escríbelo aquí de lo contrario ingrese cualquier tecla "
);
codPromocion = codPromocion.toUpperCase();
switch (codPromocion) {
  case "ORO":
    descuento = 2000;
    break;
  case "PLATINO":
    descuento = 1800;
    break;
  case "BRONCE":
    descuento = 1500;
    break;
  case "SILVER":
    descuento = 1000;
    break;
  case "POWER":
    descuento = 500;
    break;
  case "":
    descuento = 0;
    break;

  default:
    alert("No ha introducido código promocional, o es erróneo");
}
listadoProductos();
