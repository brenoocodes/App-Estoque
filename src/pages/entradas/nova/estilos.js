import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingTop: 12,
        paddingHorizontal: "3%"
      },
      centerInput:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
      },
      titleInput: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10,
        paddingLeft: 2
      },
      input: {
        backgroundColor: '#fff',
        height: 50,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
      },
      listagem: {
        backgroundColor: '#fff',
        height: 50,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center'
      },
      botao: {
        backgroundColor: '#160E55',
        width: '55%',
        height: 30,
        marginTop: 20,
        borderRadius: 12,
        justifyContent: 'center'
      },
      viewbota: {
        backgroundColor: '#160E5556',
        width: '55%',
        height: 50,
        marginTop: 20,
        borderRadius: 12,
        justifyContent: 'center'
      },
      meio: {
        alignItems: 'center'
      },
      modal: {
        flex: 1,
        backgroundColor: '#00000056',
        alignItems: 'center',
        justifyContent: 'center'
      },
      conteudomodal: {
        backgroundColor: '#fff',
        width: '80%',
        height: '20%',
        padding: 12,
        borderRadius: 12
      },
      botaoviewmodal:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '12%'
      }, 
      botaomodal:{
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 10
      }
})