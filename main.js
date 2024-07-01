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

const calcularImpuestos = (precioBase) =>{
    return impuestos.reduce((total, impuesto) =>{
        return total + (precioBase * impuesto.tasa);
    }, 0);
};

const aplicarDescuento = (precioTotal, descuento) =>{
    return precioTotal - (precioTotal * descuento);
};

document.addEventListener('DOMContentLoaded', () =>{
    const saludoMensajes = [
        "¡Bienvenido a nuestra tienda de zapatillas!",
        "Disponible las mejores marcas de zapatillas"
    ];
    
    const saludoMensaje = document.getElementById('saludoMensaje');
    saludoMensaje.textContent = saludoMensajes[Math.floor(Math.random() * saludoMensajes.length)];
    
    const zapasCont = document.getElementById('zapasCont');
    zapatillas.forEach(zapatilla =>{
        const zapatillaElement = document.createElement('div');
        zapatillaElement.classList.add('zapatilla');
        zapatillaElement.innerHTML = `
            <h3>${zapatilla.marca} ${zapatilla.modelo}</h3>
            <p>Precio: $${zapatilla.precioBase.toFixed(2)}</p>
        `;
        zapasCont.appendChild(zapatillaElement);
    });
    
    const marcaSelec = document.getElementById('marcaSelec');
    marcas.forEach(marca =>{
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
        const impuestosCalculados = calcularImpuestos(zapatillaElegida.precioBase);
        const precioConImpuestos = zapatillaElegida.precioBase + impuestosCalculados;
        
        let precioFinal;
        let mensajeValor;
        const descuento = 0.1;
        if (precioConImpuestos > 300000){
            precioFinal = aplicarDescuento(precioConImpuestos, descuento);
            mensajeValor = `Precio final de las zapatillas ${zapatillaElegida.marca} ${zapatillaElegida.modelo} con impuestos y descuento = $`;
        }else{
            precioFinal = precioConImpuestos;
            mensajeValor = `Precio final de las zapatillas ${zapatillaElegida.marca} ${zapatillaElegida.modelo} con impuestos = $`;
        }
        const precioTotalCantidad = precioFinal * cantidad;
        
        const resultadoCompra = document.getElementById('resultadoCompra');
        resultadoCompra.innerHTML = `
            <h3>Resumen de la compra:</h3>
            <p>${mensajeValor}${precioTotalCantidad.toFixed(2)}</p>
            <p>Cantidad: ${cantidad}</p>
        `;
    });
});