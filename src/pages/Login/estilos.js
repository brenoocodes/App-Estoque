import { StyleSheet } from 'react-native';

export const estiloslogin = StyleSheet.create({
    conteiner:{
        flex: 1,
        paddingTop: '20%',
        backgroundColor: '#d9d9d9',
        alignItems: 'center'
    },
    imagem: {
        width: 150,
        height: 150,
        marginBottom: 25
    },
    viewinput:{
        marginTop: 25,
        width: '100%',
        alignItems: 'center'
    },
    titletextos:{
        marginTop: 10,
        width: '88%',
        textAlign:'left',
        marginBottom: 5,
        fontSize: 17,
        fontWeight: '600'
    }, 
    senhaview:{
        
        flexDirection: 'row', 
        alignItems: 'center'
    }
})