export const formatarCpfDB = (cpf) => {
    const result = cpf.replace(/[.-]/g, '');
    return result;
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
    const result = fone.replace(/[()\-. \s]/g, '');
    return result;
};

export const formatarCep = (cep) =>{
    const result = cep.replace('-','');
    return result;
}