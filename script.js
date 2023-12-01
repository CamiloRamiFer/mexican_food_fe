let entradas = document.querySelector("#entradas");
let principales = document.querySelector("#principales");
let postres = document.querySelector("#postres");
let bebidas = document.querySelector("#bebidas");
let carritoContainer = document.querySelector("#carrito-container");
let precioFinal = 0;

let carrito = []; 


function addToCart(product) {
  console.log(product);

  const existingItem = carrito.find(item => item.id === product.id);

    if (existingItem) {
 
        existingItem.cantidad += 1;
    } else {
      
        const newItem = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1
        };

        carrito.push(newItem);
        console.log(carrito);
    }

    renderCarrito();
}

function removeFromCart(productId) {
    console.log(productId);
    const index = carrito.findIndex(item => item.id === productId);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }

        renderCarrito();
    }
}

function renderCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    const totalContainer = document.getElementById("total-container");

    carritoContainer.innerHTML = "";
    totalContainer.innerHTML = "";

    if (carrito.length > 0) {
        carrito.forEach(item => {
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");

            carritoItem.innerHTML = `
                <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}</p>
                <span class="delete-product" data-id="${item.id}">X</span>
            `;

            carritoContainer.appendChild(carritoItem);
        });

        precioFinal = carrito.reduce((acc, item) => acc + parseFloat(item.precio * item.cantidad), 0);

        const totalElement = document.createElement("div");
        totalElement.innerHTML = `<p id="total">Total: $${precioFinal.toFixed(2)}</p>`;

        totalContainer.appendChild(totalElement);


    } else {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    }
}


const anadirProducto = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("add-to-cart")) {
    const selectedProduct = e.target.parentElement;
    readContent(selectedProduct);
  }
};

const deleteProduct = (e) => {
    if (e.target.classList.contains("delete-product")){
        let totalElement = document.querySelector("#total");
      const deleteId = e.target.getAttribute("data-id");
      console.log("deleteId");
      carrito.forEach((value) => {
        if (value.id == deleteId) {
          let minus = parseFloat(value.price) * parseFloat(value.amount);
          precioFinal = precioFinal - minus;

        }
      });
  
      totalElement.innerHTML = `<p>Total: $${precioFinal.toFixed(2)}</p>`;
      carrito = carrito.filter(
        (product) => product.id !== deleteId
      );
      renderCarrito()
    }  
    }
    
  ;

const cargarProductos = async () => {
  let response;
  response = await fetch(`http://localhost:8080/api/productos`);
  const { entrada, postre, principal, bebida } = await response.json();

  const renderAll = (array, container) => {
    array.forEach((product) => {
      const html = `
            <article class="product">
            <img src="${product.imagen}" alt="${product.nombre}">
            <h3 class='nombre'>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <p class='precio'>${product.precio}</p>
            <div class="add-to-cart" data-id="${product.id}">Añadir al carrito</div>
            </article>
          `;
      container.innerHTML += html;
    });
  };

  renderAll(entrada, entradas);
  renderAll(principal, principales);
  renderAll(postre, postres);
  renderAll(bebida, bebidas);
};

const addProduct = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("add-to-cart")) {
      const productoSeleccionado = e.target.parentElement;
      const infoProducto = {
        nombre: productoSeleccionado.querySelector(".nombre").textContent,
        precio: productoSeleccionado.querySelector(".precio").textContent,
        id: productoSeleccionado.querySelector(".add-to-cart").getAttribute("data-id"),
      };
      addToCart(infoProducto);
    }
  };

const cargarEventos = () => {
    entradas.addEventListener("click", addProduct);
    principales.addEventListener("click", addProduct);
    bebidas.addEventListener("click", addProduct);
    postres.addEventListener("click", addProduct);
    carritoContainer.addEventListener("click", deleteProduct)
};

const enviarForm = (event) => {
    event.preventDefault()
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;

    if(carrito.length > 0 ){

    let resultadoString = "";


    for (let i = 0; i < carrito.length; i++) {
    let { nombre, cantidad, precio } = carrito[i];
    let objetoString = `${nombre} - Cantidad: ${cantidad} - Precio: ${precio} \n`;
    resultadoString += objetoString;
}
      
        alert(resultadoString);
        alert(`Pedido para ${nombre}, para la dirección ${direccion}, con email ${email}`)
        window.location.href  = "https://camiloramifer.github.io/mexican_food_fe/"
    }else{
        alert("Aniada productos a su carrito")
    }
    
}

cargarEventos();
cargarProductos();
