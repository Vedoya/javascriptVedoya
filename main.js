class Zapatillas{
    constructor(precioBase, iva, descuento){
        this.precioBase = precioBase;
        this.iva = iva;
        this.descuento = descuento;
    }
    
    calcularIVA(){
        return this.precioBase * this.iva;
        console.log(`Calculando IVA: ${iva}`);
        return iva;
    }
    
    aplicarDescuento(precioTotal){
        const montoDescuento = precioTotal * this.descuento;
        const precioConDescuento = precioTotal - montoDescuento;
        console.log(`Aplicando descuento de ${this.descuento * 100}%: ${precioConDescuento}`);
        return precioConDescuento;
    }
    
    calcularPrecioFinal(){
        let valorValido = false;
        
        while(!valorValido){
            this.precioBase = parseFloat(prompt('Ingrese el precio base de las zapatillas:'));
            
            if(!isNaN(this.precioBase) && this.precioBase > 0){
                valorValido = true;
            }else{
                alert('Por favor, ingrese un precio valido');
            }
        }

        console.log(`Precio ingresado: ${this.precioBase}`);
        
        const iva = this.calcularIVA();
        const precioConIVA = this.precioBase + iva;
        console.log(`Precio con IVA: ${precioConIVA}`);
        
        let precioFinal;
        let mensajeValor;
        
        if(precioConIVA > 200000){
            precioFinal = this.aplicarDescuento(precioConIVA);
            mensajeValor = "Precio final de las zapatillas + IVA con descuento = $";
        }else{
            precioFinal = precioConIVA;
            mensajeValor = "Precio final de las zapatillas + IVA = $";
        }
        
        console.log(`${mensajeValor}${precioFinal.toFixed(2)}`);
        alert(`${mensajeValor}${precioFinal.toFixed(2)}`);
    }
}

console.log('Calculando precio final');
const zapatillas = new Zapatillas(0, 0.21, 0.1);
zapatillas.calcularPrecioFinal();