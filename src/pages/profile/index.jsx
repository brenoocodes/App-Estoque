import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts";
import { estilosperfil } from './estilos'
export default function Perfil() {
  const { usuario, sair } = useContext(AuthContext);

  return (
    <View style={estilosperfil.container}>
      <Image
        style={estilosperfil.imagem}
        source={require('../../assets/images/foto-perfil.png')}
      />
      <View style={estilosperfil.textos}>
        <Text style={estilosperfil.text}>
          Nome: {usuario.nome}
        </Text>
        <Text style={estilosperfil.text}>
          Email: {usuario.email}
        </Text>
        <View style={estilosperfil.botaoView}>
          <TouchableOpacity
            style={estilosperfil.botao}
            onPress={() => sair()}
          >
            <Text style={estilosperfil.textoBotao}>
              Sair do sistema
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}