import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListaEntradas from "../../../components/listas/listas-entradas";
import api from '../../../services'

export default function ListarEntradas() {
  const [entradas, setEntradas] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      try {
        async function buscarEntradas() {
          const response = await api.get('/entrada_ao_estoque/logado')
          setEntradas(response.data.entradas)
          setLoading(false)
        }
        buscarEntradas();
      } catch (err) {
        console.log("ERRO AO BUSCAR ENTRADA", err);
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

  function adicionarEntrada() {
    navigation.navigate('AdicionarEntrada')
  }



  return (
    <View style={estilos.conteiner}>
      {!entradas || entradas.length === 0 ? (
        <View style={{height: "100%", alignItems: 'center', justifyContent:'center'}}>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          NENHUMA ENTRADA CADASTRADA
        </Text>
        <MaterialCommunityIcons name="flask-empty-off" size={80} color="#00ff" />
      </View>
      ) : (
        <FlatList
          data={entradas}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ListaEntradas data={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity style={estilos.botao} onPress={() => adicionarEntrada()}>
        <FontAwesome6 name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  
}
const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#d9d9d9',
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
});