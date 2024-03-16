import { StyleSheet } from 'react-native';

export const estilosmodal = StyleSheet.create({
    conteiner:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000045'
    }, 
    conteudo:{
        width: '65%',
        backgroundColor: '#fff',
        minHeight: '20%',
        borderRadius: 12,
        paddingHorizontal: 5,
        paddingVertical: 12,
        alignItems: 'center'
    },
    texto:{
        fontSize: 16,
        textAlign: 'justify'
    }, 
    botao:{
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000ff',
        height: 40,
        minWidth: '45%',
        borderRadius: 12
    },
    textobotao:{
        color: '#fff',
        fontSize: 15
    }
})