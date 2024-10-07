export function calculaTiempoPredeterminado (monto:number , ingreso: number , porcentageAhorro: number) {

    let MesesAconsegados

    if(porcentageAhorro !== 10 ){
        const valorPorcentage = ingreso * (porcentageAhorro/100) ;  
        MesesAconsegados = monto / valorPorcentage;
    }else {
        const valorPorcentage = ingreso * 0.10 ;  
        MesesAconsegados = monto / valorPorcentage;
    }
    
    return Math.round(MesesAconsegados)
}