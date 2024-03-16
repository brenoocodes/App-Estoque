import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        paddingTop: 12,
        paddingHorizontal: "3%"
    },
    titleInput: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10,
        paddingLeft: 2
    },
    input: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 50,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        color: '#000'
    },
    editinputview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    botoesView: {
        paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    botoes: {
        width: '40%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
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
    botaoviewmodal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '12%'
    },
    botaomodal: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 10
    }
});