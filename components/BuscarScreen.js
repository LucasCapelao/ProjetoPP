import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { corCinzaPrincipal, corAmarela, corCinzaSecundaria, corCinzaTerciaria, IpAtual } from '../src/Constants/Constantes';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import { CardPrestante } from './CardPrestante';

const BuscarScreen = ({ navigation }) => {
  const [selecionado,setSelecionado] = useState(0)
  const [reload,setReload] = useState(false)
  const [prestantes,setPrestantes] = useState([])

  const selecionar = (p) =>{
    setSelecionado(p)
    setReload(true)
  }

  async function buscaPrestantes() {
    try {
        const response = await fetch(`http://${IpAtual}:3003/buscaPrestantes?especialidade=${selecionado}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setPrestantes(data)
        setReload(false)
    } catch (error) {
        console.error('Consulta erro busca prestantes:', error);
    }
  }

  useEffect(() => {
    buscaPrestantes();
  }, [reload]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems:'center' }}>
      <TouchableOpacity style={{width: '90%', height: 70, backgroundColor: corCinzaPrincipal, marginTop:'10%', flexDirection:'row', alignItems:'center', borderRadius: 10}}>
        <Text style={{marginLeft: 20, color:'white', fontSize: 22, fontWeight:'bold'}}>Filtros Avançados</Text>
        <View style={{width: 40, height:'100%', borderTopRightRadius:10, borderBottomRightRadius:10, alignItems:'center', justifyContent:'center', position:'absolute', right:0, backgroundColor:corAmarela}}>
          <AntDesign name="right" size={32} color='black' />
        </View>
      </TouchableOpacity>
      <Text style={{marginTop: 20, color:'white', fontSize: 20, fontWeight:'bold', width:'90%'}}>Categorias</Text>
      <View style={{width: '90%', height: 120, backgroundColor:corCinzaPrincipal, flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', marginTop: 10, borderRadius: 5}}>
        <TouchableOpacity style={selecionado!=7 ? styles.boxCategorias : styles.boxSelecionado} onPress={()=>selecionar(7)}>
          <MaterialCommunityIcons name="hammer-wrench" size={30} color={corAmarela} />
          <Text style={styles.textCategorias}>Reparos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selecionado!=3 ? styles.boxCategorias : styles.boxSelecionado} onPress={()=>selecionar(3)}>
          <MaterialCommunityIcons name="lightning-bolt" size={30} color={corAmarela} />
          <Text style={styles.textCategorias}>Elétrica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selecionado!=4 ? styles.boxCategorias : styles.boxSelecionado} onPress={()=>selecionar(4)}>
          <MaterialCommunityIcons name="brush-variant" size={30} color={corAmarela} />
          <Text style={styles.textCategorias}>Pintura</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxCategorias} onPress={()=>console.log('abrir modal')}>
          <Feather name="more-horizontal" size={30} color={corAmarela} />
          <Text style={styles.textCategorias}>Todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerFilter}>
        <Octicons name="arrow-switch" size={36} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
        <Text style={{color: 'white', fontSize: 22, fontWeight:'bold', paddingLeft: 15}}>Avaliação Média</Text>
      </View>
      <ScrollView refreshControl={<RefreshControl tintColor={corAmarela} />} style={styles.containerSolicitacoes} contentContainerStyle={styles.contentContainerSolicitacoes}>
        {prestantes.map((prestante, index) => (
          <CardPrestante
            key={index}
            navigation={navigation}
            nome={prestante[1]}
            sobrenome={prestante[2]}
            dataNascimento={prestante[3]}
            especialidade={prestante[4]}
            media={prestante[5]}
            avaliacoes={prestante[6]}
            idFirebasePrestante={prestante[7]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxCategorias:{
    width: '22%', 
    height: 100, 
    backgroundColor:corCinzaTerciaria,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  textCategorias:{
    color: corAmarela,
    fontSize: 16
  },
  boxSelecionado:{
    width: '22%', 
    height: 100, 
    backgroundColor:corCinzaTerciaria,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    borderColor: corAmarela,
    borderWidth: 3
  },
  containerFilter:{
    width: '90%',
    height: 40,
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
    // backgroundColor: 'green'
  },
  containerSolicitacoes:{
    width: '90%',
    marginTop: 10,
  },
  contentContainerSolicitacoes:{
    alignItems: 'center',
  }
});

export default BuscarScreen;