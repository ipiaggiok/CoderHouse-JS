// Sneakers Store

import { zapatillas } from "./modulo1.js";

const carrito = [];

// Bienvenida
let nombreStorage = localStorage.getItem("NombreSaludo");

const checkStorage = () => {
  nombreStorage != undefined
    ? saludar(nombreStorage)
    : console.log("Continuar con la app");
};

const btnSaludo = document.getElementById("btnSaludo");
btnSaludo.onclick = () => saludar(inputName.value);

const inputName = document.getElementById("name");
inputName.addEventListener("keypress", function (e) {
  e.key === "Enter" ? saludar(inputName.value) : null;
});

const saludo = document.getElementById("saludoId");

function saludar(nombreIngresado) {
  let nombre = nombreIngresado;

  if (nombre.length >= 3) {
    saludo.className = "saludo cNombre";
    saludo.innerHTML = `<p>Bienvenido ${nombre}</p>`;
    menu1();
  } else {
    Swal.fire({
      title: "Error",
      text: "Por favor, ingrese su nombre",
      icon: "error",
      confirmButtonText: "Aceptar",
      timer: 5000,
      timerProgressBar: true,
    });
  }
  localStorage.setItem("NombreSaludo", nombre);
}

// function saludar2() {
//   let nombre = nombreStorage;
//   let saludo = document.querySelector("#saludoId");
//   saludo.className = "saludo cNombre";
//   saludo.innerHTML = `<p>Bienvenido ${nombre}</p>`;
//   menu1();
// }

function menu1() {
  let container = document.getElementById("containerId");
  let botones = document.createElement("div");
  botones.className = "menu";
  botones.innerHTML = `<button id="btnCatalogo" class="button">Ver Catálogo</button>
    <button id="btnBuscar" class="button">Buscar</button>`;
  container.appendChild(botones);
  let botonCatalogo = document.getElementById("btnCatalogo");
  botonCatalogo.onclick = () => mostrarCatalogo();
  let botonBuscar = document.getElementById("btnBuscar");
  botonBuscar.onclick = () => buscar();
}

// Mostrar catalogo de Zapatillas
const titulo = document.getElementById("tituloContainer");
let catalogoContainer = document.querySelector("#catalogo");

const ocultarCositas = () => {
  let ocultarBotones = document.querySelector(".menu");
  ocultarBotones.className = "nn";
  saludo.className = "saludo nn";
};

const mostrarCatalogo = () => {
  ocultarCositas();
  zapatillas.forEach((producto) => {
    let catalogo = document.createElement("div");
    catalogo.className = "col-sm-6";
    catalogo.innerHTML = `
            <div class="card text-center" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.marca} - ${producto.modelo}</h5>
                    <p class="card-text">$${producto.precio}</p>
                     <a href="#" class="btn btn-primary">Añadir al carrito</a>
                 </div>
            </div>`;
    catalogoContainer.appendChild(catalogo);
  });
  mostrarCampoBuscar(titulo);
  carritoIcon(document.querySelector(".barraBuqueda"));
  titulo.classList.add("conCarrito");
};

//Mostrar botones de menu
let opcion;

const buscar = () => {
  saludo.className = "saludo nn";
  const menu = document.querySelector(".menu");
  menu.innerHTML = `<button id="btnCatalogo" class="button">Ver Catálogo</button>`;
  mostrarCampoBuscar(catalogo);
  carritoIcon(document.querySelector(".barraBuqueda"));
};

/* func display icon carrito */
const carritoIcon = (apendearA) => {
  let iconCarrito = document.createElement("div");
  iconCarrito.className = "iconCarrito";
  iconCarrito.innerHTML = `<i class="bi bi-cart3"></i>`;
  apendearA.appendChild(iconCarrito);
  apendearA.classList.add("conCarrito");
  // Agregar onClick y modal. La viñeta se la agregamos a los botones de los productos
};

/* func display input y btn de buscar */

const mostrarCampoBuscar = (apendearA) => {
  let barraBusqueda = document.createElement("div");
  barraBusqueda.className = "barraBuqueda";
  barraBusqueda.innerHTML = `<input id="buscarZapas" type="text" placeholder="Nike/Puma/Adidas"/>
  <button id="btnBuscar" class="button">Buscar</button>`;
  apendearA.appendChild(barraBusqueda);
  let botonBuscar = document.getElementById("btnBuscar");
  const inputZapas = document.getElementById("buscarZapas");
  inputZapas.addEventListener("keypress", function (e) {
    e.key === "Enter" ? busqueda(inputZapas.value.toLowerCase()) : null;
  });
  botonBuscar.onclick = () =>
    console.log(busqueda(inputZapas.value.toLowerCase()));

  function busqueda(marca) {
    if (marca == "nike" || marca == "adidas" || marca == "puma") {
      catalogoContainer.innerHTML = "";
      const resultadosBusqueda = zapatillas.filter((el) =>
        el.marca.includes(marca)
      );
      resultadosBusqueda.forEach((producto) => {
        let catalogo = document.createElement("div");
        catalogo.className = "col-sm-6";
        catalogo.innerHTML = `
            <div class="card text-center" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.marca} - ${producto.modelo}</h5>
                    <p class="card-text">$${producto.precio}</p>
                     <a href="#" class="btn btn-primary">Añadir al carrito</a>
                 </div>
            </div>`;
        catalogoContainer.appendChild(catalogo);
      });
    } else {
      Swal.fire({
        text: "No hay resultados en la búsqueda. Por favor intente nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 5000,
        timerProgressBar: true,
      });
      resetarCatalogo();
    }
  }
};

const resetarCatalogo = () => {
  catalogoContainer.innerHTML = "";
  zapatillas.forEach((producto) => {
    let catalogo = document.createElement("div");
    catalogo.className = "col-sm-6";
    catalogo.innerHTML = `
            <div class="card text-center" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.marca} - ${producto.modelo}</h5>
                    <p class="card-text">$${producto.precio}</p>
                     <a href="#" class="btn btn-primary">Añadir al carrito</a>
                 </div>
            </div>`;
    catalogoContainer.appendChild(catalogo);
  });
};

/* CODIGO DE DESAFIO ANTERIOR. */

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

/* Buscar zapatillas */
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

checkStorage();
// saludar();
// menu1();

// Swal.fire({
//   title: "Crack!",
//   text: "SweetAlert funciona joya papá",
//   icon: "success",
//   confirmButtonText: "Piola",
//   timer: 5000,
//   timerProgressBar: true,
// });

// Swal.fire({
//   title: "Hola",
//   text: "Por favor, ingrese su nombre.",
//   input: "text",
//   confirmButtonText: "Continuar",
// });
