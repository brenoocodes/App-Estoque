import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListaSaidas from "../../../components/listas/listas-saidas";
import api from "../../../services";

export default function ListarSaidas() {
  const [saidas, setSaidas] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      try {
        async function buscarSaidas() {
          const response = await api.get('/saida_ao_estoque/logado')
          setSaidas(response.data.saidas)
          setLoading(false)
        }
        buscarSaidas();
      } catch (err) {
        console.log("ERRO AO BUSCAR Saida", err);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);




  if (loading) {
    return (
      <ActivityIndicator size="large" color="#131313" />
    );
  }

  function adicionarSaida() {
    navigation.navigate('AdicionarSaida')
  }

  return (

    <View style={estilos.conteiner}>
      {!saidas || saidas.length === 0 ? (
        <View style={{height: "100%", alignItems: 'center', justifyContent:'center'}}>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          NENHUMA SAÍDA CADASTRADA
        </Text>
        <MaterialCommunityIcons name="flask-empty-off" size={80} color="#00ff" />
      </View>
      ): (
          <FlatList
        data = { saidas }
        keyExtractor = {item => String(item.id)}
      renderItem={({ item }) => <ListaSaidas data={item} />}
      showsVerticalScrollIndicator={false}
      />
      )

      }

      <TouchableOpacity style={estilos.botao}
        onPress={() => adicionarSaida()}
      >
        <AntDesign name="minus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#d9d9d9'
  },
  botao: {
    position: 'absolute',
    bottom: '6%',
    right: '1%',
    width: 60,
    height: 60,
    backgroundColor: '#8044E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    zIndex: 10

  }
})