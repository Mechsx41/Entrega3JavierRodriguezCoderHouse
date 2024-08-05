document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const cardCarrito = document.getElementById('card-carrito');
    const cartCount = document.getElementById('cart-count');
    const searchInput = document.getElementById('input');

    const actualizarContadorCarrito = () => {
        cartCount.textContent = carrito.length;
    };

    const mostrarCarrito = (productosFiltrados) => {
        cardCarrito.innerHTML = '';
        productosFiltrados.forEach(item => {
            const cardContainerDiv = document.createElement('div');
            cardContainerDiv.classList.add('card-container');
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-img">
                    <img src="${item.image}" alt="producto" />
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-subtitle">${item.description}</div>
                <div class="flex-divider"></div>
                <div class="card-footer">
                    <div class="card-price"><span>$</span>${item.price}</div>
                    <button class="card-btnEliminar" onclick="eliminarDelCarrito('${item.uniqueId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="img">
                            <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                            <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                            <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                            <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                        </svg>
                    </button>
                </div>
            `;
            cardContainerDiv.appendChild(card);
            cardCarrito.appendChild(cardContainerDiv);
        });
    };

    const eliminarDelCarrito = (uniqueId) => {
        carrito = carrito.filter(item => item.uniqueId !== uniqueId);
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

    window.eliminarDelCarrito = eliminarDelCarrito;

    searchInput.addEventListener('input', (e) => {
        filtrarProductos(e.target.value);
    });
});
