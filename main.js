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

const solicitarCantidad = () =>{
    let cantidad;
    let valorValido = false;
    while(!valorValido){
        cantidad = parseInt(prompt('Ingrese la cantidad de zapatillas que desea comprar:'));
        if(!isNaN(cantidad) && cantidad > 0){
            valorValido = true;
        }else{
            alert('Por favor, ingrese una cantidad válida');
        }
    }
    return cantidad;
};

const elegirZapatilla = () =>{
    let marcaElegida;
    do{
        marcaElegida = prompt(`Elija una marca de zapatillas:\n${marcas.join('\n')}`).toLowerCase();
        marcaElegida = marcas.find(marca => marca.toLowerCase() === marcaElegida);
        if(!marcaElegida){
            alert('Por favor, ingrese una marca válida');
        }
    }while(!marcaElegida);

    const zapatillasDeMarca = zapatillas.filter(z => z.marca === marcaElegida);
    const zapatillaElegida = zapatillasDeMarca[Math.floor(Math.random() * zapatillasDeMarca.length)];

    return zapatillaElegida;
};

const calcularImpuestos = (precioBase) =>{
    return impuestos.reduce((total, impuesto) =>{
        const montoImpuesto = precioBase * impuesto.tasa;
        console.log(`Calculando ${impuesto.nombre}: $${montoImpuesto.toFixed(2)}`);
        return total + montoImpuesto;
    }, 0);
};

const aplicarDescuento = (precioTotal, descuento) =>{
    const montoDescuento = precioTotal * descuento;
    const precioConDescuento = precioTotal - montoDescuento;
    console.log(`Aplicando descuento de ${descuento * 100}%: $${precioConDescuento.toFixed(2)}`);
    return precioConDescuento;
};

const calcularPrecioFinal = () =>{
    console.log('Calculando precio final');
    const cantidad = solicitarCantidad();
    const zapatillaElegida = elegirZapatilla();
    console.log(`Zapatilla elegida: ${zapatillaElegida.marca} ${zapatillaElegida.modelo}`);

    const impuestosCalculados = calcularImpuestos(zapatillaElegida.precioBase);
    const precioConImpuestos = zapatillaElegida.precioBase + impuestosCalculados;
    console.log(`Precio con impuestos: $${precioConImpuestos.toFixed(2)}`);

    let precioFinal;
    let mensajeValor;
    const descuento = 0.1;
    if(precioConImpuestos > 200000){
        precioFinal = aplicarDescuento(precioConImpuestos, descuento);
        mensajeValor = `Precio final de las zapatillas ${zapatillaElegida.marca} ${zapatillaElegida.modelo} con impuestos y descuento = $`;
    }else{
        precioFinal = precioConImpuestos;
        mensajeValor = `Precio final de las zapatillas ${zapatillaElegida.marca} ${zapatillaElegida.modelo} con impuestos = $`;
    }
    const precioTotalCantidad = precioFinal * cantidad;
    console.log(`${mensajeValor}${precioTotalCantidad.toFixed(2)}`);
    alert(`${mensajeValor}${precioTotalCantidad.toFixed(2)}`);
};