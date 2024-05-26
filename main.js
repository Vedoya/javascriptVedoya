function calcularIVA(precioBase){
    const IVA = 0.21;
    return precioBase * IVA;
}

function aplicarDescuento(precioTotal){
    const descuento = 0.1;
    const montoDescuento = precioTotal * descuento;
    return precioTotal - montoDescuento;
}

function calcularPrecioFinal(){
    const precioBase = parseFloat(document.getElementById('precioBase').value);

    if (isNaN(precioBase) || precioBase <= 0){
        document.getElementById('resultado').textContent = 'Por favor, ingrese un precio valido';
        return;
    }

    const iva = calcularIVA(precioBase);
    const precioConIVA = precioBase + iva;

    let precioFinal;

    if (precioConIVA > 200000){
        precioFinal = aplicarDescuento(precioConIVA);
    } else {
        precioFinal = precioConIVA;
    }

    document.getElementById('resultado').textContent = `El precio final de las zapatillas con IVA y descuento es de $${precioFinal.toFixed(2)}`;
}