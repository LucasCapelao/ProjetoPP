import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons, Octicons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { color } from 'echarts';
import { IpAtual, corAmarela } from '../src/Constants/Constantes';
import { Dropdown } from 'react-native-element-dropdown';
import { NumberInMonth } from '../src/functions/NumberInMonth';


const RelatoriosScreen = ({ navigation }) => {
  // const [mesInicio,setMesInicio] = useState([]);
  const meses = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' },
  ];
  const [isFocusMesInicio, setIsFocusMesInicio] = useState(false);
  const [selectedValueMesInicio, setSelectedValueMesInicio] = useState('');
  const [isFocusMesFinal, setIsFocusMesFinal] = useState(false);
  const [selectedValueMesFinal, setSelectedValueMesFinal] = useState('');
  
  const handleSelectMesInicio = (item, index) => {
    console.log("Valor selecionado:", item.value);
    setSelectedValueMesInicio(item.value);

    const inicioValue = parseInt(item.value);

    if (inicioValue > 7) {
      setAnoFiltro('2025');
      const finalValue = (inicioValue + 5 - 1) % 12 + 1;
      const finalItem = meses.find(mes => mes.value == finalValue.toString());
      setSelectedValueMesFinal(finalItem ? finalItem.value : '');
    } else {
      const finalValue = (inicioValue + 5 - 1) % 12 + 1;
      const finalItem = meses.find(mes => mes.value == finalValue.toString());
      setSelectedValueMesFinal(finalItem ? finalItem.value : '');
    }
  };

  const [anoFiltro,setAnoFiltro] = useState('2024');
  const [servicos,setServicos] = useState(0);
  const [servicos2,setServicos2] = useState(0);
  const [servicos3,setServicos3] = useState(0);
  const [servicos4,setServicos4] = useState(0);
  const [servicos5,setServicos5] = useState(0);
  const [servicos6,setServicos6] = useState(0);

  useEffect(() => {
    async function buscaServicos(pMes,bulletMes) {
      const idFirebase = window.idFirebaseGlobal
      let mes = pMes
      const ano = anoFiltro
      try {
          const response = await fetch(`http://${IpAtual}:3003/buscaServicos?idFirebase=${idFirebase}&mes=${mes}&ano=${ano}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await response.json();
          console.log('Resultado da consulta:', data,bulletMes);
          if (bulletMes == 1) return setServicos(data)
          else if (bulletMes == 2) return setServicos2(data)
          else if (bulletMes == 3) return setServicos3(data)
          else if (bulletMes == 4) return setServicos4(data)
          else if (bulletMes == 5) return setServicos5(data)
          else if (bulletMes == 6) return setServicos6(data)
      } catch (error) {
          console.error('Consulta erro busca servicos:', error);
      }
    }
    buscaServicos('01',1)
    buscaServicos('02',2)
    buscaServicos('03',3)
    buscaServicos('04',4)
    buscaServicos('05',5)
    buscaServicos('06',6)
  }, []);

  


  const data=[ {value:servicos, label:NumberInMonth(1,'N')}, {value:servicos2, label:NumberInMonth(2,'N')}, {value:servicos3, label:NumberInMonth(3,'N')}, {value:servicos4, label:NumberInMonth(4,'N')}, {value:servicos5, label:NumberInMonth(5,'N')}, {value:servicos6, label:NumberInMonth(6,'N')} ]
  return (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
       <View style={styles.headerScreen}>
          <Text style={styles.textHeaderScreen}>Relatórios</Text>
        </View>
        <View style={styles.containerFiltros}>
          <Dropdown
            style={[styles.dropdown, isFocusMesInicio && { borderColor: corAmarela }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={meses}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusMesInicio ? 'Inicio' : '...'}
            value={selectedValueMesInicio}
            onSelect={handleSelectMesInicio}
            selectedValue={selectedValueMesInicio}
            onChange={(selectedItem, index) => {handleSelectMesInicio(selectedItem, index); 
              setIsFocusMesInicio(false); }}
            onFocus={() => setIsFocusMesInicio(true)}
            onBlur={() => setIsFocusMesInicio(false)}
          />
          <Dropdown
            style={[styles.dropdown, isFocusMesFinal && { borderColor: corAmarela }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={meses}
            maxHeight={300}
            labelField="label"
            valueField="value"
            disable={true}
            placeholder={!isFocusMesFinal ? 'Final' : '...'}
            value={selectedValueMesFinal}
            selectedValue={selectedValueMesFinal}
            onChange={(selectedItem, index) => {handleSelectMesFinal(selectedItem, index); 
              setIsFocusMesFinal(false); }}
            onFocus={() => setIsFocusMesFinal(true)}
            onBlur={() => setIsFocusMesFinal(false)}
          />
        </View>
        <View style={{marginTop:300, width: '90%'}}>
          <LineChart width={280} noOfSections={5} color='white' dataPointsColor1={corAmarela} yAxisColor='white' xAxisColor='white' data={data} yAxisTextStyle={styles.AxisTextColor} xAxisLabelTextStyle={styles.AxisTextColor} curved={false} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerScreen:{
    width: '90%',
    backgroundColor: corAmarela,
    height: '12%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
    textHeaderScreen:{
    fontSize: 28,
    fontWeight: 'bold',
  },
  AxisTextColor: {
    color: 'white',
    fontSize: 12
  },
  containerFiltros:{
    width: '98%',
    height: 100,
    justifyContent:'center',
    alignItems:'center'
    // backgroundColor: 'green'
  },
  dropdown:{
    height: 40,
    marginTop: 5,
    width: '85%',
    borderColor: '#E2DA1A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
},
placeholderStyle:{
    fontSize: 16,
    color: '#828278'
},
selectedTextStyle:{
    fontSize: 16,
    color: 'white'
},
});

export default RelatoriosScreen;