export const formatarCpfDB = (cpf) => {
    return cpf.replace(/[.-]/g, '');
};

export const formatarDataDB = (dateString) => {
    let parts = dateString.split(' ')[0].split('-');          
    let formattedDate = parts.reverse().join('-');
    return formattedDate;
};
export const formatarDataUsuario = (dateString) => {
    let parts = dateString.split(' ')[0].split('-');
    let formattedDate = parts.reverse().join('/');          
    return formattedDate;
};

export const formatarFone = (fone) => {
    return fone.replace(/[()\-. \s]/g, '');
};

export const formatarCep = (cep) => {
    return cep.replace('-','');
}

export const toCapitalize = (palavra) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}