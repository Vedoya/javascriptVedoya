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

const calcularImpuestos = (precioBase) => 
    impuestos.reduce((total, {tasa}) => total + (precioBase * tasa), 0);

const aplicarDescuento = (precioTotal, descuento) => 
    precioTotal > 300000 ? precioTotal * (1 - descuento) : precioTotal;

document.addEventListener('DOMContentLoaded', () =>{
    const saludoMensajes = [
        "¡Bienvenido a nuestra tienda de zapatillas!",
        "Disponible las mejores marcas de zapatillas"
    ];
    
    const saludoMensaje = document.getElementById('saludoMensaje');
    saludoMensaje.textContent = saludoMensajes[Math.floor(Math.random() * saludoMensajes.length)];
    
    const zapasCont = document.getElementById('zapasCont');
    
    zapatillas.forEach(({marca, modelo, precioBase}) =>{
        const zapatillaElement = document.createElement('div');
        zapatillaElement.classList.add('zapatilla');
        zapatillaElement.innerHTML = `
            <h3>${marca} ${modelo}</h3>
            <p>Precio: $${precioBase.toFixed(2)}</p>
        `;
        zapasCont.appendChild(zapatillaElement);
    });
    
    const marcaSelec = document.getElementById('marcaSelec');
    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelec.appendChild(option);
    });
    
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (e) =>{
        e.preventDefault();
        const marcaElegida = marcaSelec.value;
        const cantidad = parseInt(document.getElementById('cantidadSelec').value);
        
        const zapatillaElegida = zapatillas.find(z => z.marca === marcaElegida);
        const {marca, modelo, precioBase} = zapatillaElegida;
        
        const impuestosCalculados = calcularImpuestos(precioBase);
        const precioConImpuestos = precioBase + impuestosCalculados;
        
        const descuento = 0.1;
        const precioFinal = aplicarDescuento(precioConImpuestos, descuento);
        const precioTotalCantidad = precioFinal * cantidad;
        
        const resultadoCompra = document.getElementById('resultadoCompra');
        resultadoCompra.innerHTML = `
            <h3>Resumen de la compra:</h3>
            <p>Precio final de las zapatillas ${marca} ${modelo} ${precioConImpuestos > 300000 ? 'con impuestos y descuento' : 'con impuestos'} = $${precioTotalCantidad.toFixed(2)}</p>
            <p>Cantidad: ${cantidad}</p>
        `;
        
        const compra = { marca, modelo, cantidad, precioTotal: precioTotalCantidad };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
    });
    
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
    if (ultimaCompra){
        const ultimaCompraElement = document.createElement('div');
        ultimaCompraElement.innerHTML = `
            <h3>Última compra:</h3>
            <p>Marca: ${ultimaCompra.marca}</p>
            <p>Modelo: ${ultimaCompra.modelo}</p>
            <p>Cantidad: ${ultimaCompra.cantidad}</p>
            <p>Precio total: $${ultimaCompra.precioTotal.toFixed(2)}</p>
        `;
        document.body.appendChild(ultimaCompraElement);
    }
});