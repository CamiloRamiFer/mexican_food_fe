let entradas = document.querySelector("#entradas");
let principales = document.querySelector("#principales");
let postres = document.querySelector("#postres");
let bebidas = document.querySelector("#bebidas");
let carritoContainer = document.querySelector("#carrito-container");
let precioFinal = 0;

let carrito = []; // Arreglo para almacenar la información del carrito

// Función para añadir al carrito
function addToCart(product) {
  console.log(product);
  // Buscar si el producto ya está en el carrito
  const existingItem = carrito.find(item => item.id === product.id);

    if (existingItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        existingItem.cantidad += 1;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
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
    // Buscar el índice del producto en el carrito
    console.log(productId);
    const index = carrito.findIndex(item => item.id === productId);

    if (index !== -1) {
        // Si se encuentra el producto, reducir la cantidad o eliminarlo si la cantidad es 1
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }

        renderCarrito();
    }
}

// Función para renderizar el carrito
function renderCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    const totalContainer = document.getElementById("total-container");

    // Limpiar contenido previo
    carritoContainer.innerHTML = "";
    totalContainer.innerHTML = "";

    // Verificar si hay productos en el carrito
    if (carrito.length > 0) {
        // Mostrar cada producto en el carrito
        carrito.forEach(item => {
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");

            carritoItem.innerHTML = `
                <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}</p>
                <span class="delete-product" data-id="${item.id}">X</span>
            `;

            carritoContainer.appendChild(carritoItem);
        });

        // Calcular el precio total
        precioFinal = carrito.reduce((acc, item) => acc + parseFloat(item.precio * item.cantidad), 0);

        // Mostrar el precio total
        const totalElement = document.createElement("div");
        totalElement.innerHTML = `<p id="total">Total: $${precioFinal.toFixed(2)}</p>`;

        // Agregar el total al contenedor
        totalContainer.appendChild(totalElement);


    } else {
        // Si el carrito está vacío, mostrar un mensaje
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    }
}

// Función para renderizar los productos
/*function renderMenu(menuData) {
    const menuContainer = document.getElementById("menu-container");

    for (const category in menuData) {
        if (menuData.hasOwnProperty(category)) {
            const categoryData = menuData[category];

            // Crear una sección para cada categoría
            const categorySection = document.createElement("section");
            categorySection.classList.add("menu-category");
            categorySection.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;

            // Recorrer los productos de la categoría
            categoryData.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("menu-item");

                productCard.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p>Precio: $${product.precio}</p>
                    <button onclick="addToCart(${product.categoria})">Añadir al carrito</button>
                `;

                categorySection.appendChild(productCard);
            });

            // Agregar la sección al contenedor principal
            menuContainer.appendChild(categorySection);
        }
    }
}*/

// Realizar la solicitud fetch
/*fetch("http://localhost:8080/api/productos")
    .then(response => response.json())
    .then(data => {
        // Llamar a la función para renderizar los productos con la respuesta del endpoint
        renderMenu(data);
    })
    .catch(error => console.error("Error fetching data:", error));*/

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
        console.log("Nombre:", nombre);
        console.log("Dirección:", direccion);
        console.log("Email:", email);
        console.log(carrito);
    }else{
        alert("Aniada productos a su carrito")
    }
    
}

cargarEventos();
cargarProductos();
