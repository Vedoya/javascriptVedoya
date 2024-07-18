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

let zapatillas = [];

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
    
    fetch('zapatillas.json')
    .then(response => response.json())
    .then(data =>{
        zapatillas = data.zapatillas.map(z => new Zapatilla(z.marca, z.modelo, z.precioBase));
        mostrarZapatillas();
        configurarFormulario();
    })
    .catch(error =>{
        console.error('Error al cargar los datos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los datos de las zapatillas.',
        });
    });
    
    mostrarUltimaCompra();
});

function mostrarZapatillas(){
    const zapasCont = document.getElementById('zapasCont');
    zapasCont.innerHTML = ''; // Limpiar contenido existente
    
    zapatillas.forEach(({marca, modelo, precioBase}) =>{
        const zapatillaElement = document.createElement('div');
        zapatillaElement.classList.add('zapatilla');
        zapatillaElement.innerHTML = `
            <h3>${marca} ${modelo}</h3>
            <p>Precio: $${precioBase.toFixed(2)}</p>
        `;
        zapasCont.appendChild(zapatillaElement);
    });
}

function configurarFormulario(){
    const marcaSelec = document.getElementById('marcaSelec');
    marcaSelec.innerHTML = '<option value="">Seleccione una marca</option>';
    
    marcas.forEach(marca =>{
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelec.appendChild(option);
    });
    
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', manejarSubmit);
}

function manejarSubmit(e){
    e.preventDefault();
    const marcaElegida = document.getElementById('marcaSelec').value;
    const cantidad = parseInt(document.getElementById('cantidadSelec').value);
    
    if(!marcaElegida || isNaN(cantidad) || cantidad <= 0){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, selecciona una marca y una cantidad válida.',
        });
        return;
    }
    
    const zapatillaElegida = zapatillas.find(z => z.marca === marcaElegida);
    const {marca, modelo, precioBase} = zapatillaElegida;
    
    const impuestosCalculados = calcularImpuestos(precioBase);
    const precioConImpuestos = precioBase + impuestosCalculados;
    
    const descuento = 0.1;
    const precioFinal = aplicarDescuento(precioConImpuestos, descuento);
    const precioTotalCantidad = precioFinal * cantidad;
    
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        html: `
            <h3>Resumen de la compra:</h3>
            <p>Zapatillas: ${marca} ${modelo}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Precio final: $${precioTotalCantidad.toFixed(2)}</p>
        `,
        confirmButtonText: 'OK'
    });
    
    const compra = { marca, modelo, cantidad, precioTotal: precioTotalCantidad };
    localStorage.setItem('ultimaCompra', JSON.stringify(compra));
}

function mostrarUltimaCompra(){
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
    if(ultimaCompra){
        Swal.fire({
            title: 'Última compra',
            html: `
                <p>Marca: ${ultimaCompra.marca}</p>
                <p>Modelo: ${ultimaCompra.modelo}</p>
                <p>Cantidad: ${ultimaCompra.cantidad}</p>
                <p>Precio total: $${ultimaCompra.precioTotal.toFixed(2)}</p>
            `,
            icon: 'info'
        });
    }
}