import { StyleSheet } from "react-native";
export const estilosperfil = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '15%',
      backgroundColor: '#d9d9d9',
      alignItems: 'center',
    },
    imagem: {
      width: 100,
      height: 100
    },
    textos: {
      width: '90%',
      marginTop: 25
    },
    text: {
      marginTop: 12,
      fontSize: 18,
    },
    botao: {
      backgroundColor: '#FF3636',
      height: 50,
      width: '55%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    botaoView: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textoBotao: {
      fontSize: 18,
      fontWeight: '600'
    }
  });