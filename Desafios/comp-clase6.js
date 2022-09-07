const titulo = document.querySelector(".titulo");
titulo.innerHTML = "JavaScript | Clase 4";
const tema = document.querySelector(".tema");
tema.innerHTML = "Desafío Obligatorio N°1";

/* Insertar codigo a partir de aqui. */

/* Proyecto Plataforma de Viajes */

// Ingreso de nombre y saludo

function saludar() {
  let nombre = prompt("Ingrese su nombre:");
  if (nombre.length >= 3 || (nombre = null)) {
    alert(`                                   Hola ${nombre}. 
                      Bienvenido a CoderFlights.
  A continuación podrá seleccionar su boleto de avión.`);
  } else {
    alert("Por favor, Ingrese su nombre.");
    saludar();
  }
}

// Array de carrito

const carrito = [];

// Seleccionar destino
let destino;

function seleccionarDestino() {
  destino = Number(
    prompt(`Ingrese su lugar de destino:
    1. Madrid, España.
    2. Nueva York, USA.
    3. Cancún, México.
    4. Paris, Francia.`)
  );

  switch (destino) {
    case 1:
      alert(`Escogió como destino Madrid, España.`);
      break;
    case 2:
      alert(`Escogió como destino Nueva York, USA.`);
      break;
    case 3:
      alert(`Escogió como destino Cancún, México.`);
      break;
    case 4:
      alert(`Escogió como destino Paris, Francia.`);
      break;
    default:
      alert(`Por favor, ingrese el número de la opción deseada.`);
      seleccionarDestino();
      break;
  }
}

// Seleccionar tipo de pasaje ida / ida-vuelta
let tipoDePasaje;

function seleccionarTipoPasaje() {
  tipoDePasaje = Number(
    prompt(` Seleccione su tipo de viaje:
    1. Ida.
    2. Ida y vuelta.
    `)
  );

  if (tipoDePasaje == 1) {
    alert(`Tipo de viaje: Ida.`);
  } else if (tipoDePasaje == 2) {
    alert(`Tipo de viaje: Ida y Vuelta.`);
  } else {
    alert(`Por favor, ingrese el número de la opción deseada.`);
    seleccionarTipoPasaje();
  }
}

// Mostrar precio
const pasajeIda = (ciudad) => ciudad;
const pasajeIdaYVuelta = (ciudad) => ciudad * 2;
const impuesto = (ciudad) => ciudad * 0.94;
let costoPasaje;

function mostrarPrecio() {
  if (destino == 1) {
    if (tipoDePasaje == 1) {
      costoPasaje = pasajeIda(madrid);
      alert(`Tarifa Pasajero: $${pasajeIda(madrid)}`);
    } else {
      costoPasaje = pasajeIdaYVuelta(madrid);
      alert(`Tarifa Pasajero: $${pasajeIdaYVuelta(madrid)}`);
    }
  } else if (destino == 2) {
    if (tipoDePasaje == 1) {
      costoPasaje = pasajeIda(nuevaYork);
      alert(`Tarifa Pasajero: $${pasajeIda(nuevaYork)}`);
    } else {
      costoPasaje = pasajeIdaYVuelta(nuevaYork);
      alert(`Tarifa Pasajero: $${pasajeIdaYVuelta(nuevaYork)}`);
    }
  } else if (destino == 3) {
    if (tipoDePasaje == 1) {
      costoPasaje = pasajeIda(cancun);
      alert(`Tarifa Pasajero: $${pasajeIda(cancun)}`);
    } else {
      costoPasaje = pasajeIdaYVuelta(cancun);
      alert(`Tarifa Pasajero: $${pasajeIdaYVuelta(cancun)}`);
    }
  } else if (destino == 4) {
    if (tipoDePasaje == 1) {
      costoPasaje = pasajeIda(paris);
      alert(`Tarifa Pasajero: $${pasajeIda(paris)}`);
    } else {
      costoPasaje = pasajeIdaYVuelta(paris);
      alert(`Tarifa Pasajero: $${pasajeIdaYVuelta(paris)}`);
    }
  }
  carrito.push(Number(`${costoPasaje}`));
  carrito.push(Number(`${impuesto(costoPasaje)}`));
}

// Agregar equipaje
let costoEquipajeExtra;

function equipajeExtra() {
  let equipajeExtra = Number(
    prompt("¿Desea Añadir equipaje extra? Costo : $10000 \n 1. Si. \n 2. No.")
  );

  if (equipajeExtra == 1) {
    alert("Se ha añadido Equipaje Extra a su carrito.");
    costoEquipajeExtra = 10000;
  } else {
    costoEquipajeExtra = 0;
    alert("Continuar.");
  }
  carrito.push(Number(`${costoEquipajeExtra}`));
}

// Agregar seguro de viaje
let costoAsistenciaViajero;

function asistenciaViajero() {
  let asistenciaViajero = Number(
    prompt(
      "¿Desea Añadir Asistencia al Viajero? Costo : $15000 \n 1. Si. \n 2. No."
    )
  );

  if (asistenciaViajero == 1) {
    costoAsistenciaViajero = 15000;
    alert("Se ha añadido Asistencia al Viajero a su carrito.");
  } else {
    costoAsistenciaViajero = 0;
    alert("Continuar.");
  }
  carrito.push(Number(`${costoAsistenciaViajero}`));
}

// Seleccionar metodo de pago(descuento en debito y c. s/interes crédito).
let pago;
const debito = (precio) => precio * 0.2;

function credito() {
  let cuotas3 = (costoPasaje / 3).toFixed(2);
  let cuotas6 = (costoPasaje / 6).toFixed(2);
  // cuotas3.toFixed(2);
  // cuotas6.toFixed(2);

  let cantidadCuotas = Number(
    prompt(`Seleccione la cantidad de cuotas:
1. 3 cuotas sin interés.
2. 6 cuotas sin interés.`)
  );

  if (cantidadCuotas == 1) {
    alert(
      `El total de su compra es de $${costoPasaje},
en 3 pagos sin interés de $${cuotas3}.`
    );
  } else if (cantidadCuotas == 2) {
    alert(
      `El total de su compra es de $${costoPasaje},
en 6 pagos sin interés de $${cuotas6}.`
    );
  } else {
    alert("Por favor, ingrese el número de la opción deseada.");
    credito();
  }

  alert("Muchas Gracias por su compra en CoderFlights.");
}

function metodoDePago() {
  pago = Number(
    prompt(`Seleccione su método de pago:
1. Tarjeta de Débito (20% off).
2. Tarjeta de Crédito (3 y 6 cuotas S/interés.)`)
  );

  if (pago == 1) {
    alert(`Resumen de su orden:
    Costo de boletos: $${costoPasaje}.
    Impuestos: $${impuesto(costoPasaje)}.
    Equipaje Extra: $${costoEquipajeExtra}.
    Asistencia al Viajero: $${costoAsistenciaViajero}
    Descuento: -$${debito(carritoFinal)}.
    ⦁ Total Final: $${
      costoPasaje + impuesto(costoPasaje) - debito(carritoFinal)
    }`);
    alert("Muchas Gracias por su compra en CoderFlights.");
  } else if (pago == 2) {
    credito();
  } else {
    alert("Por favor, ingrese el número de la opción deseada.");
    metodoDePago();
  }
}
// Aplicar descuento o cuotas y Mostrar precio final.

// Gracias por su compras, vuelvas prontos.

//variables

// precios
let madrid = 75000;
let nuevaYork = 90000;
let cancun = 65000;
let paris = 90000;

//app

saludar();
seleccionarDestino();
seleccionarTipoPasaje();
mostrarPrecio();
equipajeExtra();
asistenciaViajero();

console.log(carrito);

const carritoInicial = 0;
const carritoFinal = carrito.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  carritoInicial
);
console.log(carritoFinal);

metodoDePago();
// 1. Madrid, España.  $75000.
// 2. Nueva York, USA. $90000.
// 3. Cancún, México.  $65000.
// 4. Paris, Francia.  $90000.

// Tasas e impuestos: 93,66%

// const productos = [
//   { id: 1, producto: "Arroz" },
//   { id: 2, producto: "Fideo" },
//   { id: 3, producto: "Pan" },
// ];

// for (const producto of productos) {
//   console.log(producto.id);
//   console.log(producto.producto);
// }

// const destinos = [
//   { id: 1, ciudad: "madrid", pais: "españa", ida: 75000, idayvuelta: 150000 },
//   { id: 2, ciudad: "nueva york", pais: "usa", ida: 90000, idayvuelta: 180000 },
//   { id: 3, ciudad: "cancun", pais: "mexico", ida: 65000, idayvuelta: 130000 },
//   { id: 4, ciudad: "paris", pais: "francia", ida: 90000, idayvuelta: 180000 },
// ];

// costoPasaje = pasajeIdaYVuelta(paris) + impuesto(pasajeIdaYVuelta(paris));
// alert(`Tarifa Pasajero: $${pasajeIdaYVuelta(paris)}
// Tasas e Impuestos: $${impuesto(pasajeIdaYVuelta(paris))}
// ⦁ Total: $${pasajeIdaYVuelta(paris) + impuesto(pasajeIdaYVuelta(paris))}`);
