export function NumberInMonth(pMes,pCompleto){
    let mesCompleto = '';
    switch(pMes){
        case 1:
            mesCompleto = 'Janeiro';
            break
        case 2:
            mesCompleto = 'Fevereiro';
            break
        case 3:
            mesCompleto = 'Março';
            break
        case 4:
            mesCompleto = 'Abril';
            break
        case 5:
            mesCompleto = 'Maio';
            break
        case 6:
            mesCompleto = 'Junho';
            break
        case 7:
            mesCompleto = 'Julho';
            break
        case 8:
            mesCompleto = 'Agosto';
            break
        case 9:
            mesCompleto = 'Setembro';
            break
        case 10:
            mesCompleto = 'Outubro';
            break
        case 11:
            mesCompleto = 'Novembro';
            break
        case 12:
            mesCompleto = 'Dezembro';
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