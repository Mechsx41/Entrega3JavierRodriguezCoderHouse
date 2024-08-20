document.getElementById('pedidoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('name').value;
    const apellido = document.getElementById('lastName').value;
    const telefono = document.getElementById('phoneNumber').value;

    // Obtener datos del carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const pedido = { 
        cliente: { nombre, apellido, telefono },
        carrito
    };

    try {
        const response = await fetch('http://localhost:3000/guardar-pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            alert('Pedido enviado correctamente');

            // Borra el localStorage solo si el pedido se ha guardado correctamente
            localStorage.removeItem('carrito');
            actualizarContadorCarrito();
            document.getElementById('pedidoForm').reset();

            setTimeout(() => {
                window.location.href = 'index.html'; // Redirige a la página de inicio después de un breve retraso
            }, 2000);
        } else {
            const errorData = await response.json();
            alert('Hubo un problema al enviar el pedido: ' + errorData.message);
        }
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            alert('Error de conexión: No se pudo conectar al servidor. Por favor, intente más tarde.');
        } 
    }
});
