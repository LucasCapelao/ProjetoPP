export function calcularIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split("/").map(Number);
    const dataNasc = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    if (mesAtual < (mes - 1) || (mesAtual === (mes - 1) && diaAtual < dia)) {
      idade--;
    }
    
    return idade;
  }