import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons, Octicons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { color } from 'echarts';

const corAmarela = '#E2DA1A';



const RelatoriosScreen = ({ navigation }) => {
  const data=[ {value:140, label:'Jan.'}, {value:80, label:'Fev.'}, {value:90, label:'Mar.'}, {value:70, label:'Abr.'}, ]
  return (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
       <View style={styles.headerScreen}>
          <Text style={styles.textHeaderScreen}>Relatórios</Text>
        </View>
        <View style={{marginTop:300, width: '90%'}}>
          <LineChart width={280} noOfSections={5} color='white' dataPointsColor1={corAmarela} yAxisColor='white' xAxisColor='white' data={data} yAxisTextStyle={styles.AxisTextColor} xAxisLabelTextStyle={styles.AxisTextColor} curved={true} />
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
});

export default RelatoriosScreen;

// import React, { useRef, useEffect } from 'react';
// import * as echarts from 'echarts/core';
// import { LineChart } from 'echarts/charts';
// import { GridComponent } from 'echarts/components';
// import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';

// echarts.use([SVGRenderer, LineChart, GridComponent]);

// export default function RelatoriosScreen() {
//   const skiaRef = useRef(null);
//   useEffect(() => {
//     const option = {
//       xAxis: {
//         type: 'category',
//         data: ['Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           data: [150, 230, 224, 218, 135, 147, 260],
//           type: 'line',
//         },
//       ],
//     };
//     let chart
//     if (skiaRef.current) {
//       chart = echarts.init(skiaRef.current, 'light', {
//         renderer: 'svg',
//         width: 400,
//         height: 400,
//       });
//       chart.setOption(option);
//     }
//     return () => chart?.dispose();
//   }, []);

//   return <SkiaChart ref={skiaRef} />;
// }