// import { Entypo, MaterialIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { corAmarela } from '../Constants/Constantes';

// export function NumberInCategoryIcon(pCategoria){
//     switch(pCategoria){
//         case 1:
//             return 'Carpintaria';
//         case 2:
//             return 'Encanamento';
//         case 3:
//             return 'Elétrica';
//         case 4:
//             return <MaterialCommunityIcons name="brush-variant" size={30} color={corAmarela} />
//         case 5:
//             return 'Jardinagem';
//         case 6:
//             return 'Faxina';
//         case 7:
//             return 'Reparos Gerais';
//         case 8:
//             return'Marcenaria';
//         case 9:
//             return 'Eletrodomésticos';
//         default:
//             return '';   
//     }
// }

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { corAmarela } from '../Constants/Constantes';

// Componente que recebe um número e retorna o ícone correspondente
const NumberInCategoryIcon = ({ pCategoria }) => {
  switch(pCategoria) {
    case 1:
      return <MaterialCommunityIcons name="hammer" size={30} color={corAmarela} />;
    case 2:
      return <MaterialCommunityIcons name="pipe" size={30} color={corAmarela} />;
    case 3:
      return <MaterialCommunityIcons name="lightning-bolt" size={30} color={corAmarela} />;
    case 4:
      return <MaterialCommunityIcons name="brush-variant" size={30} color={corAmarela} />;
    case 5:
      return <MaterialCommunityIcons name="flower" size={30} color={corAmarela} />;
    case 6:
      return <MaterialCommunityIcons name="broom" size={30} color={corAmarela} />;
    case 7:
      return <MaterialCommunityIcons name="tools" size={30} color={corAmarela} />;
    case 8:
      return <MaterialCommunityIcons name="saw-blade" size={30} color={corAmarela} />;
    case 9:
      return <MaterialCommunityIcons name="washing-machine" size={30} color={corAmarela} />;
    default:
      return null; // Retorna null se o valor não corresponder a nenhum ícone
  }
};

export default NumberInCategoryIcon;
