document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const cardCarrito = document.getElementById('card-carrito');
    const cartCount = document.getElementById('cart-count');
    const searchInput = document.getElementById('input');
    const cardResume = document.querySelector('.card-resume'); 

    const actualizarContadorCarrito = () => {
        const totalProductos = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
        cartCount.textContent = totalProductos;
    };

    const mostrarCarrito = (productosFiltrados) => {
        cardCarrito.innerHTML = '';
        cardResume.innerHTML = ''; 
        let totalPagar = 0;

        if (productosFiltrados.length === 0) {
            // Mostrar mensaje si el carrito está vacío
            cardCarrito.innerHTML = '<p style="text-align: center;">Aún no hay productos en su carrito</p>';
            return;
        }

        productosFiltrados.forEach(item => {
            const article = document.createElement('article');
            article.classList.add('prueba');

            const spaceImgDiv = document.createElement('div');
            spaceImgDiv.classList.add('space_img');
            spaceImgDiv.innerHTML = `<img src="${item.image}" class="pruebaimg" alt="${item.title}">`;

            const contenerdorArticuleDiv = document.createElement('div');
            contenerdorArticuleDiv.classList.add('contenerdorArticule');
            contenerdorArticuleDiv.innerHTML = `
                <h2 class="reset">${item.title}</h2>
                <div><span>${item.description}</span></div>
                <div><span>Cantidad: ${item.cantidad}</span></div>
                <button class="card-btnEliminar" onclick="eliminarDelCarrito(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="img">
                        <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                        <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                    </svg>
                </button>
            `;

            const articuleRightDiv = document.createElement('div');
            articuleRightDiv.classList.add('articule-right');
            articuleRightDiv.innerHTML = `
                <button class="btnStock" onclick="actualizarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button class="btnStock" onclick="actualizarCantidad(${item.id}, 1)">+</button>
            `;

            const articuleRightPriceDiv = document.createElement('div');
            articuleRightPriceDiv.classList.add('articule-right');
            const totalPrice = item.price * item.cantidad;
            articuleRightPriceDiv.innerHTML = `<span class="pricePadding">$${totalPrice.toFixed(2)}</span>`;

            article.appendChild(spaceImgDiv);
            article.appendChild(contenerdorArticuleDiv);
            article.appendChild(articuleRightDiv);
            article.appendChild(articuleRightPriceDiv);

            cardCarrito.appendChild(article);

            totalPagar += totalPrice;

            const productoDiv = document.createElement('div');
            productoDiv.textContent = `${item.title}`;
            cardResume.appendChild(productoDiv);
        });

        const resumenDiv = document.createElement('div');
        resumenDiv.classList.add('resumen-compra');
        resumenDiv.innerHTML = `
            <div>
                <h5>Productos:</h5>
                <h2>Total: $${totalPagar.toFixed(2)}</h2>
                <div style="text-align: center;">
                <a href="./form/form.html">
                    <button>Comprar</button>
                    </a>
                </div>
            </div>
        `;
        cardResume.appendChild(resumenDiv);
    };

    const actualizarCantidad = (id, delta) => {
        carrito = carrito.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    cantidad: Math.min(Math.max(item.cantidad + delta, 1), item.stock)
                };
            }
            return item;
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(carrito);
        actualizarContadorCarrito();
    };

    const eliminarDelCarrito = (id) => {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(carrito);
        actualizarContadorCarrito();
    };

    const filtrarProductos = (termino) => {
        const productosFiltrados = carrito.filter(item => 
            item.title.toLowerCase().includes(termino.toLowerCase()) ||
            item.description.toLowerCase().includes(termino.toLowerCase())
        );
        mostrarCarrito(productosFiltrados);
    };

    mostrarCarrito(carrito);
    actualizarContadorCarrito();

    window.actualizarCantidad = actualizarCantidad;
    window.eliminarDelCarrito = eliminarDelCarrito;

    searchInput.addEventListener('input', (e) => {
        filtrarProductos(e.target.value);
    });
});
