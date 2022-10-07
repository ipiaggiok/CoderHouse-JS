// Sneakers Store

// import { zapatillas } from "./modulo1.js";

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
    saludo.innerHTML = `<p>Hola ${nombre}</p>`;
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

// const pushearProducto = () => {};

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
  fetch("Desafios/modulo1.json")
    .then((res) => res.json())
    .then((zapatillas) => {
      zapatillas.forEach((e, index) => {
        console.log(e.modelo);
        let productCard = document.createElement("div");
        productCard.className = "col-sm-6";
        productCard.innerHTML = `
                  <div class="card text-center" style="width: 18rem;">
                      <img src="${e.img}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title">${e.marca} - ${e.modelo}</h5>
                          <p class="card-text">$${e.precio}</p>
                            <a id="btn-añadir" class="btn btn-primary" onClick="agregarCarrito()">Añadir al carrito</a>
                       </div>
                  </div>`;
        catalogoContainer.appendChild(productCard);
      });
    });
  mostrarCampoBuscar(document.querySelector(".navbar"));
  carritoIcon(document.querySelector(".navbar"));
};

// Func Agregar al carrito

const carrito = [];

const agregarCarrito = () => {
  console.log("funciona");
  // const cartIndex = carrito.findIndex((e) => {
  //   return e.id === zapatillas[indice].id;
  // });
  // if (cartIndex === -1) {
  //   const addProduct = zapatillas[indice];
  //   addProduct.cantidad = 1;
  //   // carrito = [];
  //   carrito.push(addProduct);
  //   // toastifyAlert();
  //   console.log("Zapa añadida");
  // } else {
  //   carrito[cartIndex].cantidad++;
  //   // toastifyAlert();
  //   console.log("Cantidad aumentada");
  // }

  // let añadirCarrito = document.querySelector(".btn-primary");
  // for (var i = 0; i < añadirCarrito.length; i++) {
  //   añadirCarrito[i].onclick = () => {
  //     Toastify({
  //       text: "Añadido al Carrito",
  //       offset: {
  //         x: 10,
  //         y: 50,
  //       },
  //       style: {
  //         background: "linear-gradient(to right, #a0a1a1, #303030",
  //       },
  //       duration: 1500,
  //     }).showToast();

  //     console.log(indice);
  //   }; // Falta pushear elementos al carrito y modal carrito
  // }
};

const toastifyAlert = () => {
  Toastify({
    text: "Añadido al Carrito",
    offset: {
      x: 10,
      y: 50,
    },
    style: {
      background: "linear-gradient(to right, #a0a1a1, #303030",
    },
    duration: 1500,
  }).showToast();
};

//Mostrar botones de menu
let opcion;

const buscar = () => {
  saludo.className = "saludo nn";
  const menu = document.querySelector(".menu");
  menu.innerHTML = `<button id="btnCatalogo" class="button">Ver Catálogo</button>`;
  let btnCatalogo = document.querySelector("#btnCatalogo");
  btnCatalogo.onclick = () => {
    catalogoContainer.innerHTML = "";
    mostrarCatalogo();
  };
  mostrarCampoBuscar(document.querySelector(".navbar"));
  carritoIcon(document.querySelector(".navbar"));
};

/* func display icon carrito */
let iconCarrito = document.createElement("div");
const carritoIcon = (apendearA) => {
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
                     <a class="btn btn-primary">Añadir al carrito</a>
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
    agregarCarrito();
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
                     <a class="btn btn-primary">Añadir al carrito</a>
                 </div>
            </div>`;
    catalogoContainer.appendChild(catalogo);
  });
  agregarCarrito();
};

checkStorage();
