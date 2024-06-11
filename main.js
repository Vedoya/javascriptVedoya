const impuestos ={
    iva: 0.21
};

const marcas = ['Nike', 'Adidas', 'Puma'];

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

const elegirMarca = () =>{
    let marcaElegida;
    do{
        marcaElegida = prompt(`Elija una marca de zapatillas:\n${marcas.join('\n')}`).toLowerCase();
        marcaElegida = marcas.find(marca => marca.toLowerCase() === marcaElegida);
        if(!marcaElegida){
            alert('Por favor, ingrese una marca válida');
        }
    }while(!marcaElegida);

    return marcaElegida;
};

const solicitarPrecioBase = () =>{
    let precioBase;
    let valorValido = false;
    while(!valorValido){
        precioBase = parseFloat(prompt('Ingrese el precio base de las zapatillas:'));
        if(!isNaN(precioBase) && precioBase > 0){
            valorValido = true;
        }else{
            alert('Por favor, ingrese un precio válido');
        }
    }
    return precioBase;
};

const calcularIVA = (precioBase) =>{
    const iva = precioBase * impuestos.iva;
    console.log(`Calculando IVA: ${iva}`);
    return iva;
};

const aplicarDescuento = (precioTotal, descuento) =>{
    const montoDescuento = precioTotal * descuento;
    const precioConDescuento = precioTotal - montoDescuento;
    console.log(`Aplicando descuento de ${descuento * 100}%: ${precioConDescuento}`);
    return precioConDescuento;
};

const calcularPrecioFinal = () =>{
    console.log('Calculando precio final');
    const cantidad = solicitarCantidad();
    const marcaElegida = elegirMarca();
    const precioBase = solicitarPrecioBase();
    console.log(`Precio ingresado: ${precioBase}`);
    console.log(`Marca elegida: ${marcaElegida}`);

    const iva = calcularIVA(precioBase);
    const precioConIVA = precioBase + iva;
    console.log(`Precio con IVA: ${precioConIVA}`);

    let precioFinal;
    let mensajeValor;
    const descuento = 0.1;
    if(precioConIVA > 200000){
        precioFinal = aplicarDescuento(precioConIVA, descuento);
        mensajeValor = `Precio final de las zapatillas ${marcaElegida} + IVA con descuento = $`;
    }else{
        precioFinal = precioConIVA;
        mensajeValor = `Precio final de las zapatillas ${marcaElegida} + IVA = $`;
    }
    const precioTotalCantidad = precioFinal * cantidad;
    console.log(`${mensajeValor}${precioTotalCantidad.toFixed(2)}`);
    alert(`${mensajeValor}${precioTotalCantidad.toFixed(2)}`);
};