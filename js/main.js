// Clase Articulo
class Articulo {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre.toLowerCase();
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// Carga de articulos iniciales al LS
let listaArticulos = JSON.parse(localStorage.getItem('listaArticulos')) || [
    new Articulo("botines", 50, 42),
    new Articulo("zapatillas", 40, 23),
    new Articulo("buzos", 60, 6),
    new Articulo("medias", 10, 40),
    new Articulo("canilleras", 8, 10)
];

// Enviar los articulos al LS
function enviarLS() {
    localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos));
}

// Funcion para renderizar la tabla
function actualizarTabla() {
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = ''; 

    listaArticulos.forEach(articulo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${articulo.nombre}</td>
            <td>$${articulo.precio}</td>
            <td>${articulo.cantidad}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Renderizo la tabla
actualizarTabla();

// Funcion para agregar artículos
function agregarArticulo() {
    const nombre = document.getElementById('nombreArticulo').value.toLowerCase();
    const precio = parseFloat(document.getElementById('precioArticulo').value);
    const cantidad = parseInt(document.getElementById('cantidadArticulo').value);

    const articuloExistente = listaArticulos.find(item => item.nombre === nombre);

    if (articuloExistente) {
        mostrarResultado(`El articulo ${nombre} ya existe`);
    } else if (nombre && precio > 0 && cantidad > 0) {
        listaArticulos.push(new Articulo(nombre, precio, cantidad));
        enviarLS();
        mostrarResultado(`Se agrego el articulo: ${nombre} - precio: $${precio} - cantidad: ${cantidad}`);
        actualizarTabla();
    } else {
        mostrarResultado("Faltan datos o estan incorrectos, intente otra vez");
    }
}

// Funcion para eliminar articulos
function eliminarArticulo() {
    const nombre = document.getElementById('nombreArticulo').value.toLowerCase();
    const cantidad = parseInt(document.getElementById('cantidadArticulo').value);

    const articuloEncontrado = listaArticulos.find(item => item.nombre === nombre);

    if (articuloEncontrado && cantidad > 0 && cantidad <= articuloEncontrado.cantidad) {
        articuloEncontrado.cantidad -= cantidad;
        if (articuloEncontrado.cantidad === 0) {
            listaArticulos = listaArticulos.filter(item => item.nombre !== nombre);
        }
        enviarLS();
        mostrarResultado(`Se elimino ${cantidad} del stock de ${nombre}`);
        actualizarTabla();
    } else {
        mostrarResultado("No se encontro el articulo o la cantidad es invalida");
    }
}

// Funcion para actualizar precio
function modificarPrecio() {
    const nombre = document.getElementById('nombreArticulo').value.toLowerCase();
    const nuevoPrecio = parseFloat(document.getElementById('precioArticulo').value);

    const articuloEncontrado = listaArticulos.find(item => item.nombre === nombre);

    if (articuloEncontrado && nuevoPrecio > 0) {
        articuloEncontrado.precio = nuevoPrecio;
        enviarLS();
        mostrarResultado(`Se modificó el precio de ${nombre} a $${nuevoPrecio}`);
        actualizarTabla();
    } else {
        mostrarResultado("No se encontró el artículo o el precio es inválido");
    }
}

// Mostrar los resultados
function mostrarResultado(mensaje) {
    document.getElementById('resultados').innerText = mensaje;
}

// Eventos
document.getElementById('btnAgregar').addEventListener('click', agregarArticulo);
document.getElementById('btnEliminar').addEventListener('click', eliminarArticulo);
document.getElementById('btnModificar').addEventListener('click', modificarPrecio);