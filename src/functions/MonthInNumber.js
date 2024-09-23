export function MonthInNumber(pMes){
    let numeroMes = '';
    switch(pMes.toLowerCase()){
        case 'janeiro':
            numeroMes = '01';
            break
        case 'fevereiro':
            mesCompleto = '02';
            break
        case 'marco' || 'março':
            mesCompleto = '03';
            break
        case 'abril':
            mesCompleto = '04';
            break
        case 'maio':
            mesCompleto = '05';
            break
        case 'junho':
            mesCompleto = '06';
            break
        case 'julho':
            mesCompleto = '07';
            break
        case 'agosto':
            mesCompleto = '08';
            break
        case 'setembro':
            mesCompleto = '09';
            break
        case 'outubro':
            mesCompleto = '10';
            break
        case 'novembro':
            mesCompleto = '11';
            break
        case 'dezembro':
            mesCompleto = '12';
            break
        default:
            mesCompleto = '';   
    }
    if(pCompleto == 'S' && mesCompleto != ''){
        return mesCompleto
    }else if(pCompleto == 'N' && mesCompleto != ''){
        return mesCompleto.substring(0,3) + '.'
    }else return 'Nenhum mês corresponde ao número informado'
}