import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
    list: {
        marginTop: 10,
        alignItems: 'center',


    },
    linha: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    lista: {
        padding: 6,
        paddingLeft: 12,
        width: '95%',
        height: 100,
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 12,
        elevation: 4,
    },
    produto: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5
    },
    demaistexto: {
        marginBottom: 3,
    },
    botaoview: {
        paddingRight: 8,
        width: 50,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'

    }, horario: {
        fontWeight: '200'
    }
})