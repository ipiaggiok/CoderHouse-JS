let container = document.querySelector("#containerId");
let catalogoContainer = document.querySelector("#catalogo");
let iconoCarrito = document.querySelector(".bi-cart3");
let searchInput = document.querySelector("#buscarZapas");
let searchBtn = document.querySelector("#btnBuscar");
let modalProdTitle = document.querySelector("#modalProdTitle");
let modalProdImg1 = document.querySelector("#modalProdImg1");
let modalProdImg2 = document.querySelector("#modalProdImg2");
let modalProdImg3 = document.querySelector("#modalProdImg3");
let modalProdFooter = document.querySelector("#modalProdFooter");
let modalProdBody = document.querySelector(".modalProd-body");
let modalProdBtnAñadir = document.querySelector("#modalProdBtnAñadir");
let modalCartTitle = document.querySelector("#modalCartTitle");
let modalCartBody = document.querySelector(".modalCart-body");
let modalCartFooter = document.querySelector("#modalCartFooter");
let modalCartBtnAñadir = document.querySelector("#modalCartBtnAñadir");

iconoCarrito.setAttribute("data-bs-toggle", "modal");
iconoCarrito.setAttribute("data-bs-target", "#cartModal");
iconoCarrito.onclick = () => showModalCart();

const mostrarCatalogo = () => {
  fetch("Desafios/productos.json")
    .then((res) => res.json())
    .then((zapatillas) => {
      zapatillas.forEach((e, index) => {
        let productCard = document.createElement("div");
        productCard.classList.add("card", "text-center");
        productCard.innerHTML = `
                          <img src="${e.img1}" class="card-img-top" alt="...">
                          <div class="card-body">
                          <h5 class="card-title">${e.marca} - ${e.modelo}</h5>
                          <p class="card-text">$${e.precio}</p>
                                `;
        productCard.setAttribute("data-bs-toggle", "modal");
        productCard.setAttribute("data-bs-target", "#productModal");

        productCard.onclick = () => {
          showModalProducts(index);
        };
        catalogoContainer.appendChild(productCard);
      });
    });
  searchWord();
};

const searchWord = () => {
  searchInput.addEventListener("keypress", function (e) {
    e.key === "Enter" ? sigaSiga() : null;
  });
  searchBtn.onclick = () => sigaSiga();

  const sigaSiga = () => {
    if (searchInput.value.length >= 3) {
      findproduct(searchInput.value.toLowerCase());
    } else {
      toastifyAlertSearch();
      catalogoContainer.innerHTML = "";
      mostrarCatalogo();
    }
  };
};

const zapatillas = () => {};

const findproduct = (marca) => {
  console.log(marca);
  fetch("Desafios/productos.json")
    .then((res) => res.json())
    .then((zapatillas) => {
      if (marca == "nike" || marca == "adidas" || marca == "puma") {
        catalogoContainer.innerHTML = "";
        const resultadosBusqueda = zapatillas.filter((el) =>
          el.marca.toLowerCase().includes(marca)
        );
        console.log(resultadosBusqueda);
        resultadosBusqueda.forEach((producto, index) => {
          let productCard = document.createElement("div");
          productCard.classList.add("card", "text-center");
          productCard.innerHTML = `
                          <img src="${producto.img1}" class="card-img-top" alt="...">
                          <div class="card-body">
                          <h5 class="card-title">${producto.marca} - ${producto.modelo}</h5>
                          <p class="card-text">$${producto.precio}</p>
                                `;
          productCard.setAttribute("data-bs-toggle", "modal");
          productCard.setAttribute("data-bs-target", "#productModal");

          productCard.onclick = () => {
            console.log(resultadosBusqueda[index].modelo);
            modalProdTitle.innerHTML = `${resultadosBusqueda[index].marca} - ${resultadosBusqueda[index].modelo}`;
            modalProdImg1.setAttribute(
              "src",
              `${resultadosBusqueda[index].img1}`
            );
            modalProdImg2.setAttribute(
              "src",
              `${resultadosBusqueda[index].img2}`
            );
            modalProdImg3.setAttribute(
              "src",
              `${resultadosBusqueda[index].img3}`
            );
            modalProdFooter.innerHTML = `Precio: $${resultadosBusqueda[index].precio}`;
            modalProdBtnAñadir.onclick = () => {
              const indexZapaEnCarrito = carrito.findIndex((el) => {
                return el.id === resultadosBusqueda[index].id;
              });
              let agregarZapasAlCarrito = resultadosBusqueda[index];
              if (indexZapaEnCarrito === -1) {
                carrito.push(agregarZapasAlCarrito);
                cartBadge();
              } else {
                carrito[indexZapaEnCarrito].cantidad++;
                cartBadge();
              }
              // carrito.push(resultadosBusqueda[index]);
              console.log(carrito);
              toastifyAlertAdded();
              cartBadge();
            };
          };
          catalogoContainer.appendChild(productCard);
        });
      } else {
        toastifyAlertSearch();
        catalogoContainer.innerHTML = "";
        mostrarCatalogo();
      }
    });
};

const showModalProducts = (index) => {
  modalProdBtnAñadir.onclick = () => {
    agregarAlCarrito(index);
    toastifyAlertAdded();
  };
  fetch("Desafios/productos.json")
    .then((res) => res.json())
    .then((zapatillas) => {
      modalProdTitle.innerHTML = `${zapatillas[index].marca} - ${zapatillas[index].modelo}`;
      modalProdImg1.setAttribute("src", `${zapatillas[index].img1}`);
      modalProdImg2.setAttribute("src", `${zapatillas[index].img2}`);
      modalProdImg3.setAttribute("src", `${zapatillas[index].img3}`);
      modalProdFooter.innerHTML = `Precio: $${zapatillas[index].precio}`;
    });
  searchWord();
};

let carrito = [];

const agregarAlCarrito = (i) => {
  fetch("Desafios/productos.json")
    .then((res) => res.json())
    .then((zapatillas) => {
      const indexZapaEnCarrito = carrito.findIndex((el) => {
        return el.id === zapatillas[i].id;
      });
      let agregarZapasAlCarrito = zapatillas[i];
      if (indexZapaEnCarrito === -1) {
        carrito.push(agregarZapasAlCarrito);
        cartBadge();
      } else {
        carrito[indexZapaEnCarrito].cantidad++;
        cartBadge();
      }
    });
};

const cartBadge = () => {
  let cantidadProductos = 0;
  carrito.forEach((e) => {
    cantidadProductos = cantidadProductos + e.cantidad;
  });
  iconoCarrito.innerHTML = `<span
                id="badgee"
                class="position-relative top-0 start-23 translate-middle badge rounded-pill bg-danger"
                >${cantidadProductos}
                <span class="visually-hidden">unread messages</span>
              </span>`;
  if (cantidadProductos == 0) {
    document.querySelector("#badgee").style.visibility = "hidden";
  } else {
    document.querySelector("#badgee").style.visibility = "visible";
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const showModalCart = () => {
  modalCartTitle.innerHTML = `Carrito de compras`;
  if (carrito.length === 0) {
    modalCartBtnAñadir.style.visibility = "hidden";
    modalCartBody.innerHTML = `No hay productos en su carrito.`;
    modalCartFooter.innerHTML = ``;
  } else {
    modalCartBtnAñadir.style.visibility = "visible";
    modalCartBtnAñadir.innerHTML = `Continuar`;
    modalCartBody.innerHTML = "";
    let totalCarrito = 0;
    carrito.forEach((e, index) => {
      modalCartBody.classList.remove("text-center");
      let cardCart = document.createElement("div");
      cardCart.classList.add(`cardInCart${index}`);
      cardCart.innerHTML = `<div class="card mb-3">
                              <div class="row g-0">
                                <div class="col-md-4">
                                  <img src="${
                                    e.img1
                                  }" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                  <div class="card-body cartReorg">
                                    <h5 class="card-title">${e.marca} - ${
        e.modelo
      }</h5>
                                    <p class="card-text campoCantidad"><small class="text-muted">Cantidad: ${
                                      e.cantidad
                                    }</small></p>
                                    <p class="card-text campoSubTotal">Sub-total $${
                                      e.precio * e.cantidad
                                    }</p>
                                  </div>
                                </div>
                              </div>                          
                              <a id="btnDeleteProd" class="btn btn-secondary" onClick="deleteProduct(${index});" style="max-width: 250px;">Eliminar Producto</a>
                                        </div>`;
      modalCartBody.appendChild(cardCart);
      let subTotal = e.precio * e.cantidad;
      totalCarrito = totalCarrito + subTotal;
      modalCartFooter.innerHTML = `Total $${totalCarrito} `;
    });
  }
  modalCartBtnAñadir.onclick = () => checkOut();
};

let totalCarrito = 0;
const deleteProduct = (index) => {
  if (carrito[index].cantidad == 1) {
    carrito.splice(index, 1);
    let cardToDelete = document.querySelector(`.cardInCart${index}`).remove();
    toastifyAlertDeleted();
    cartBadge();
  } else {
    carrito[index].cantidad--;
    document.querySelector(
      ".campoCantidad"
    ).innerHTML = `Cantidad: ${carrito[index].cantidad}`;
    document.querySelector(".campoSubTotal").innerHTML = `Sub-total $${
      carrito[index].precio * carrito[index].cantidad
    }`;
    carrito.forEach((e) => {
      totalCarrito = totalCarrito + e.precio * e.cantidad;
    });
    let editTotal = (modalCartFooter.innerHTML = `Total $${totalCarrito} `);
    cartBadge();
  }
};

const checkOut = () => {
  let btnFinalizarCompra = document.querySelector("#modalCartBtnAñadir");
  btnFinalizarCompra.style.visibility = "hidden";
  modalCartTitle.innerHTML = `Check-Out`;
  modalCartBody.innerHTML = `
        <form id="form" class="row g-3 needs-validation" novalidate>
          <div class="col">
            <div class="col-md-14">
              <label for="validationCustom01" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="validationCustom01" name="name" placeholder="Ej: Juan" style="min-width: 300px" required>
              <div class="invalid-feedback">
                Ingrese su nombre.
              </div>
            </div>
            <div class="col-md-14">
            <label for="validationCustom03" class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="validationCustom03" placeholder="Ej: 11 1234-5678" style="min-width: 300px" required>
            <div class="invalid-feedback">
              Ingrese un número de teléfono.
            </div>
            </div>
            <div class="col-md-14">
            <label for="validationCustom05" class="form-label">Domicilio</label>
            <input type="text" class="form-control" id="validationCustom05" name="street" placeholder="Ej: Av. Alem Norte 959" style="min-width: 300px" required>
            <div class="invalid-feedback">
              Ingrese su domicilio.
            </div>
            </div>
            <div class="col-md-14">
            <label for="validationCustom07" class="form-label">Ciudad</label>
            <input type="text" class="form-control" id="validationCustom07" name="town" placeholder="Ej: CABA" style="min-width: 300px" required>
            <div class="invalid-feedback">
              Ingrese su ciudad.
            </div>
          </div>
          </div>

          <div class="col">
            <div class="col-md-14">
              <label for="validationCustom02" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="validationCustom02" name="last" placeholder="Ej: López" style="min-width: 300px" required>
              <div class="invalid-feedback">
                Ingrese su apellido.
              </div>
            </div>
            <div class="col-md-14">
            <label for="validationCustom04" class="form-label">Email </label>
            <input type="text" class="form-control" id="validationCustom04" name="email" placeholder="Ej: email@email.com" style="min-width: 300px" required>
            <p class="text-muted">EmailJS integrado</p>
            <div class="invalid-feedback">
              Ingrese un email.
            </div>
            </div>
            <div class="col-md-14">
            <label for="validationCustom06" class="form-label">Provincia</label>
            <input type="text" class="form-control" id="validationCustom06" name="state" placeholder="Ej: Buenos Aires" style="min-width: 300px" required>
            <div class="invalid-feedback">
              Ingrese su provincia.
            </div>
            </div>
            <div class="col-md-8">
            <label for="validationCustom08" class="form-label">Código Postal</label>
            <input type="text" class="form-control" id="validationCustom08" placeholder="Ej: 1425" style="min-width: 300px" required>
            <div class="invalid-feedback">
              Ingrese su C.P.
            </div>
            </div>
            <div class="col-12">
            <button id="button" class="btn btn-secondary" type="submit" onClick="validateForm();">Finalizar Compra</button>
          </div>
          </div>    
        </form>
      `;
  modalCartFooter.innerHTML = ``;
  const btn = document.getElementById("button");

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_z38ti8f";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Email";
        console.log("Sent!");
      },
      (err) => {
        console.log(JSON.stringify(err));
        btn.value = "Send Email";
      }
    );
  });
};

const validateForm = () => {
  ("use strict");
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity() == true) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          checkOutMessage();
          sendEmail();
        }

        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });
};

const checkOutMessage = () => {
  let formInputName = document.querySelector("#validationCustom01").value;
  let formInputLastName = document.querySelector("#validationCustom02").value;
  let formInputPhone = document.querySelector("#validationCustom03").value;
  let formInputEmail = document.querySelector("#validationCustom04").value;
  let formInputAdress = document.querySelector("#validationCustom05").value;
  let formInputState = document.querySelector("#validationCustom06").value;
  let formInputTown = document.querySelector("#validationCustom07").value;
  let formInputCP = document.querySelector("#validationCustom08").value;

  modalCartTitle.innerHTML = `COMPRA CONFIRMADA!`;
  modalCartBody.innerHTML = `<div class="text-center">
  <h2 style="
    color: #a9a6a6;
    text-decoration: underline;
">Muchas gracias por tu compra ${formInputName} ${formInputLastName}.</h2></br>
  
  <h3>Revisa la casilla de email ${formInputEmail} allí recibirás más información sobre tu compra.</h3>
  </div>`;
  modalCartFooter.innerHTML = "";
  modalCartBtnAñadir.innerHTML = `Salir`;
  modalCartBtnAñadir.onclick = () => reloadPage();
  modalCartBtnAñadir.style.visibility = "visible";
  modalCartBtnAñadir.setAttribute("data-bs-toggle", "modal");
  modalCartBtnAñadir.setAttribute("data-bs-target", "#cartModal");
  document.querySelector("#btnSalir").style.visibility = "hidden";
};

(function () {
  emailjs.init("KJiT1nmVnNsvhhuNH");
})();

const sendEmail = () => {
  // const btn = document.getElementById("button");
  // document.getElementById("form").addEventListener("submit", function (event) {
  //   event.preventDefault();
  //   btn.value = "Enviando...";
  //   const serviceID = "default_service";
  //   const templateID = "template_z38ti8f";
  //   emailjs.sendForm(serviceID, templateID, this).then(
  //     () => {
  //       btn.value = "Send Email";
  //       console.log("Sent!");
  //     },
  //     (err) => {
  //       console.log(JSON.stringify(err));
  //       btn.value = "Send Email";
  //     }
  //   );
  // });
};

const reloadPage = () => {
  catalogoContainer.innerHTML = "";
  mostrarCatalogo();
  carrito = [];
  cartBadge();
  window.location.reload();
};

const toastifyAlertAdded = () => {
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

const toastifyAlertDeleted = () => {
  Toastify({
    text: "Producto eliminado",
    offset: {
      x: 10,
      y: 50,
    },
    style: {
      background: "linear-gradient(to right, #a81412, #303030",
    },
    duration: 1500,
  }).showToast();
};

const toastifyAlertSearch = () => {
  Toastify({
    text: "Ingrese una marca",
    position: "center",
    offset: {
      X: 10,
      y: 50,
    },
    style: {
      background: "linear-gradient(to right, #a0a1a1, #303030",
    },
    duration: 1500,
  }).showToast();
};

const checkStorage = () => {
  let carritoEnStorage = localStorage.getItem("carrito");
  carrito = JSON.parse(carritoEnStorage);
};

checkStorage();
cartBadge();
mostrarCatalogo();
