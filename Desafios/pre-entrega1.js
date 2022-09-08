const titulo = document.querySelector(".titulo");
titulo.innerHTML = "JavaScript";
const tema = document.querySelector(".tema");
tema.innerHTML = "Pre-Entrega N°1 del Proyecto Final";

/* Insertar codigo a partir de aqui. */

// Sneakers Store

const zapatillas = [
  { id: 10, marca: "nike", modelo: "Air Force 1", precio: 44500 },
  { id: 20, marca: "nike", modelo: "Air Max", precio: 57000 },
  { id: 30, marca: "adidas", modelo: "SuperStar", precio: 32000 },
  { id: 40, marca: "adidas", modelo: "AdiZero", precio: 54000 },
  { id: 50, marca: "puma", modelo: "Blaze", precio: 29000 },
  { id: 60, marca: "puma", modelo: "Classic", precio: 27000 },
];

const carrito = [];

// Bienvenida
let nombre;
function saludar() {
  nombre = prompt("Ingrese su nombre:");
  if (nombre.length >= 3) {
    alert(`                                   Hola ${nombre}. 
                      Bienvenido a CoderShoes.
  A continuación podrá encontrar sus zapatillas favoritas.`);
  } else {
    alert("Por favor, Ingrese su nombre.");
    saludar();
  }
}

//Menú de opciones
let opcion;
function menu1() {
  opcion = Number(
    prompt(`Seleccione una opción:
    1. Buscar Zapatillas.
    2. Ver Catálogo.
    0. Salir.`)
  );
  selector();
}

function menu2() {
  opcion = Number(
    prompt(`Ingrese una opcion:
    Ingrese el id para agregar al carrito.
    1. Nueva busqueda.
    2. Ver Catálogo. (ver resultados en consola).
    3. Ver Carrito.
    0. Salir`)
  );
  selector();
}

function menu3() {
  opcion = Number(
    prompt(`Ingrese una opcion:
    1. Nueva busqueda.
    2. Ver Catálogo. (ver resultados en consola).
    4. Finalizar Compra.
    0. Salir`)
  );
  selector();
}

function selector() {
  if (opcion == 1) {
    buscarZapatillas();
  } else if (
    opcion == 10 ||
    opcion == 20 ||
    opcion == 30 ||
    opcion == 40 ||
    opcion == 50 ||
    opcion == 60
  ) {
    const resultadosBusqueda = zapatillas.find((el) => el.id == opcion);
    carrito.push(resultadosBusqueda);
    alert(
      `${resultadosBusqueda.marca} ${resultadosBusqueda.modelo} se agregó al carrito correctamente.`
    );
    menu2();
  } else if (opcion == 2) {
    console.log(zapatillas);
    menu2();
  } else if (opcion == 3) {
    console.log(carrito);
    calcularCarrito();
    console.log(`Total del Carrito: $${total}`);
    menu3();
  } else if (opcion == 4) {
    finalizarCompra();
    despedir();
  } else if (opcion == 0) {
    despedir();
  } else {
    alert("Ingrese una opción correcta");
    menu1();
  }
}

// Buscar zapatillas
let entrada;
function buscarZapatillas() {
  entrada = prompt(
    "Ingrese la marca: (nike, adidas, puma)(ver resultados en consola)"
  );
  entrada.toLowerCase();
  busqueda();
  menu2();
}

function busqueda() {
  if (entrada == "nike" || entrada == "adidas" || entrada == "puma") {
    const resultadosBusqueda = zapatillas.filter((el) =>
      el.marca.includes(entrada)
    );

    console.log("Resultados:");
    for (resultado of resultadosBusqueda) {
      console.log(
        `id: ${resultado.id}. Marca: ${resultado.marca}. Modelo: ${resultado.modelo}. Precio: $${resultado.precio}`
      );
    }
  } else {
    alert("No hay resultados en la búsqueda. Por favor intente nuevamente.");
    buscarZapatillas();
  }
}

// Finalizar Compra
let total = 0;

function calcularCarrito() {
  for (articulo of carrito) {
    total = total += articulo.precio;
  }
}

function finalizarCompra() {
  opcion = Number(
    prompt(`Elegir método de pago:
    1. Tarjeta de Débito. (20% off)
    2. Tarjeta de Crédito. (Plan Ahora3, Ahora6 y Ahora12)`)
  );

  if (opcion == 1) {
    total = (total * 0.8).toFixed(2);
    alert(`El total de su orden es de $${total} en ${opcion} pago/s sin interés.
                MUCHAS GRACIAS POR SU COMPRA`);
  } else if (opcion == 2) {
    let opcion = Number(
      prompt(`Seleccione la cantidad de cuotas:
        1. Pagar en 1 cuota sin interés.
        3. Pagar en 3 cuotas sin interés.
        6. Pagar en 6 cuotas sin interés.
        12. Pagar en 12 cuotas sin interés.`)
    );
    if (opcion == 1) {
      alert(`El total de su orden es de $${total} en ${opcion} pago sin interés.
                MUCHAS GRACIAS POR SU COMPRA`);
    } else if (opcion == 3) {
      calcularCuotas(opcion);
    } else if (opcion == 6) {
      calcularCuotas(opcion);
    } else if (opcion == 12) {
      calcularCuotas(opcion);
    } else {
      alert("Ingrese un opción correcta.");
      finalizarCompra();
    }
  } else {
    alert("Ingrese un opción correcta.");
    finalizarCompra();
  }

  function calcularCuotas(cantidad) {
    let cuota = total / cantidad;
    cuota = cuota.toFixed(2);
    alert(`El total de su orden es de $${total} en ${cantidad} pagos sin interés de $${cuota}
                MUCHAS GRACIAS POR SU COMPRA`);
  }
}

// Adios
function despedir() {
  alert(`                          Adios ${nombre}.
  Gracias por visitar CoderShoes.`);
  console.clear();
}

saludar();
menu1();
