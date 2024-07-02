class Impuesto{
    constructor(nombre, tasa){
        this.nombre = nombre;
        this.tasa = tasa;
    }
}

class Zapatilla{
    constructor(marca, modelo, precioBase){
        this.marca = marca;
        this.modelo = modelo;
        this.precioBase = precioBase;
    }
}

const impuestos = [
    new Impuesto('IVA', 0.21),
    new Impuesto('Costo de Servicio', 0.05)
];

const marcas = ['Nike', 'Adidas', 'Puma', 'New Balance'];

const zapatillas = [
    new Zapatilla('Nike', 'Air Max', 150000),
    new Zapatilla('Adidas', 'Ultraboost', 180000),
    new Zapatilla('Puma', 'RS-X', 130000),
    new Zapatilla('New Balance', '990', 160000)
];

const calcularImpuestos = (precioBase) => impuestos.reduce((total, { tasa }) => total + (precioBase * tasa), 0);

const aplicarDescuento = (precioTotal, descuento) => precioTotal - (precioTotal * descuento);

const guardarCarrito = (carrito) => localStorage.setItem('carrito', JSON.stringify(carrito));

const recuperarCarrito = () => JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () =>{
    const saludoMensajes = [
        "¡Bienvenido a nuestra tienda de zapatillas!",
        "Disponible las mejores marcas de zapatillas"
    ];
    
    const saludoMensaje = document.getElementById('saludoMensaje');
    saludoMensaje.textContent = saludoMensajes[Math.floor(Math.random() * saludoMensajes.length)];
    
    const zapasCont = document.getElementById('zapasCont');
    zapasCont.innerHTML = zapatillas.map(({ marca, modelo, precioBase }) => `
        <div class="zapatilla">
            <h3>${marca} ${modelo}</h3>
            <p>Precio: $${precioBase.toFixed(2)}</p>
        </div>
    `).join('');
    
    const marcaSelec = document.getElementById('marcaSelec');
    marcaSelec.innerHTML = marcas.map(marca => `<option value="${marca}">${marca}</option>`).join('');
    
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (e) =>{
        e.preventDefault();
        const marcaElegida = marcaSelec.value;
        const cantidad = parseInt(document.getElementById('cantidadSelec').value);
        
        const zapatillaElegida = zapatillas.find(z => z.marca === marcaElegida);
        const { marca, modelo, precioBase } = zapatillaElegida;
        
        const impuestosCalculados = calcularImpuestos(precioBase);
        const precioConImpuestos = precioBase + impuestosCalculados;
        
        const descuento = 0.1;
        const precioFinal = precioConImpuestos > 300000 
            ? aplicarDescuento(precioConImpuestos, descuento)
            : precioConImpuestos;
        
        const precioTotalCantidad = precioFinal * cantidad;
        
        const mensajeValor = precioConImpuestos > 300000
            ? `Precio final de las zapatillas ${marca} ${modelo} con impuestos y descuento = $`
            : `Precio final de las zapatillas ${marca} ${modelo} con impuestos = $`;
        
        const resultadoCompra = document.getElementById('resultadoCompra');
        resultadoCompra.innerHTML = `
            <h3>Resumen de la compra:</h3>
            <p>${mensajeValor}${precioTotalCantidad.toFixed(2)}</p>
            <p>Cantidad: ${cantidad}</p>
        `;

        const carrito = recuperarCarrito();
        carrito.push({ marca, modelo, cantidad, precioTotal: precioTotalCantidad });
        guardarCarrito(carrito);
    });
});