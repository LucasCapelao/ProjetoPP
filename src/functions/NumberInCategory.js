export function NumberInCategory(pCategoria){
    let categoria = '';
    switch(pCategoria){
        case 1:
            categoria = 'Carpintaria';
            break
        case 2:
            categoria = 'Encanamento';
            break
        case 3:
            categoria = 'Elétrica';
            break
        case 4:
            categoria = 'Pintura';
            break
        case 5:
            categoria = 'Jardinagem';
            break
        case 6:
            categoria = 'Faxina';
            break
        case 7:
            categoria = 'Reparos Gerais';
            break
        case 8:
            categoria = 'Marcenaria';
            break
        case 9:
            categoria = 'Eletrodomésticos';
            break
        default:
            categoria = '';   
    }
    return categoria
}