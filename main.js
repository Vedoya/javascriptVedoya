function calcularIVA(precioBase){
    const IVA = 0.21;
    return precioBase * IVA;
}

function aplicarDescuento(precioTotal){
    const descuento = 0.1;
    const montoDescuento = precioTotal * descuento;
    const precioConDescuento = precioTotal - montoDescuento;
    return precioConDescuento;
}

function calcularPrecioFinal(){
    let precioBase;
    let valorValido = false;
    
    while (!valorValido){
        precioBase = parseFloat(prompt('Ingrese el precio base de las zapatillas:'));
        
        if (!isNaN(precioBase) && precioBase > 0){
            valorValido = true;
        } else {
            alert('Por favor, ingrese un precio válido');
        }
    }
        
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
    
    alert(`${mensajeValor}${precioFinal.toFixed(2)}`);
}