function calcularIVA(precioBase){
    const IVA = 0.21;
    return precioBase * IVA;
    console.log(`Precio base: $${precioBase}, IVA: $${iva}`);
    return iva;
}

function aplicarDescuento(precioTotal){
    const descuento = 0.1;
    const montoDescuento = precioTotal * descuento;
    const precioConDescuento = precioTotal - montoDescuento;
    console.log(`Precio total: $${precioTotal}, Descuento: $${montoDescuento}, Precio con descuento: $${precioConDescuento}`);
    return precioConDescuento;
}

function calcularPrecioFinal(){
    const precioBase = parseFloat(document.getElementById('precioBase').value);

    if (Number.isNaN(precioBase) || precioBase <= 0){
        document.getElementById('resultado').textContent = 'Por favor, ingrese un precio valido';
        return;
    }

    console.log(`Precio base ingresado: $${precioBase}`);

    const iva = calcularIVA(precioBase);
    const precioConIVA = precioBase + iva;

    let precioFinal;
    let mensajeValor;

    if (precioConIVA > 200000){
        precioFinal = aplicarDescuento(precioConIVA);
        mensajeValor = "Precio final de las zapatillas + IVA con descuento = $"
    } else {
        precioFinal = precioConIVA;
        mensajeValor = "Precio final de las zapatillas + IVA = $"
    }

    console.log(`${mensajeValor}${precioFinal.toFixed(2)}`);

    document.getElementById('resultado').textContent = `${mensajeValor}${precioFinal.toFixed(2)}`;
}