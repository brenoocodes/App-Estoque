import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';



const { height: Altura, width: Largura } = Dimensions.get('window')

export default function ModalEntradaFornecedor({ options, fecharModal, itemSelecionado }) {
  function onPressItem(item) {
    itemSelecionado(item)
    fecharModal()
  }
  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={estilos.opcao} onPress={() => onPressItem(item)} >
      <Text style={estilos.textoOpcao}>{item.nome_fantasia}</Text>
    </TouchableOpacity>
  ))

  return (
    <View
      style={estilos.tela}
    >
      <View style={estilos.conteudo}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>

    </View>
  );
}
const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#00000075',
    alignItems: 'center',

  },
  conteudo: {
    backgroundColor: '#fff',
    width: Largura - 40,
    height: Altura / 2,
    top: '10%',
    borderRadius: 15,
    paddingVertical: 5

  }, opcao: {
    paddingLeft: 12,
    justifyContent: 'center',
    height: 55,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  },
  textoOpcao: {
    fontSize: 20,
    fontWeight: '400'
  }

})