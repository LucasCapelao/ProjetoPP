import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const IpAtual  = '192.168.0.21'; //ip
export const Port = '3003';
export const corAmarela = '#E2DA1A';
export const corCinzaPrincipal = '#20201C'; //cinza escuro
export const corCinzaSecundaria = '#828278'; //cinza claro
export const corCinzaTerciaria = '#2E2E2E'; //cinza medio
export const corVerdeIcon = '#24E520';
export const corVermelhaIcon = '#D30C0C';
export const userIcon = require('../../assets/userIcon.png');
export const dataAtual = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
  