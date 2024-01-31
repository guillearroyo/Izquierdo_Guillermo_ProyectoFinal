let carrito = {};

function agregarAlCarrito(producto, precio) {
    if (carrito[producto]) {
        carrito[producto].cantidad++;
    } else {
        carrito[producto] = { precio, cantidad: 1 };
    }
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = {};
    actualizarCarrito();
}

function quitarDelCarrito(producto) {
    if (carrito[producto] && carrito[producto].cantidad > 0) {
        carrito[producto].cantidad--;
        if (carrito[producto].cantidad === 0) {
            delete carrito[producto];
        }
        actualizarCarrito();
    }
}

function calcularPrecioTotal() {
    let total = 0;
    Object.keys(carrito).forEach(producto => {
        total += carrito[producto].precio * carrito[producto].cantidad;
    });
    return total;
}

function actualizarCarrito() {
    const itemsCarrito = document.getElementById('itemsCarrito');
    itemsCarrito.innerHTML = '';

    Object.keys(carrito).forEach(producto => {
        const div = document.createElement('div');
        const precioTotalProducto = carrito[producto].precio * carrito[producto].cantidad;
        div.innerHTML = `${producto} - Cantidad: ${carrito[producto].cantidad} - Precio: €${carrito[producto].precio.toFixed(2)} - Total: €${precioTotalProducto.toFixed(2)} <button onclick="quitarDelCarrito('${producto}')">Quitar uno</button>`;
        itemsCarrito.appendChild(div);
    });

    const totalCarrito = document.getElementById('totalCarrito');
    totalCarrito.innerHTML = `Total: €${calcularPrecioTotal().toFixed(2)}`;
}

function validarRegistro() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var correo = document.getElementById('correo').value;

    var nombreRegex = /^[A-Za-z ]+$/;
    if (!nombreRegex.test(nombre) || !nombreRegex.test(apellido)) {
        document.getElementById('errorMensaje').innerText = 'Nombre y Apellido deben contener solo letras y espacios.';
        return;
    }

    var correoRegex = /.*@.*\..*/;
    if (!correoRegex.test(correo)) {
        document.getElementById('errorMensaje').innerText = 'Correo electrónico no válido.';
        return;
    }
    
    document.getElementById('errorMensaje').innerText = '';
}