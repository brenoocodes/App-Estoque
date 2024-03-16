//contexts/index.js
import React, { createContext, useState, useEffect } from "react";
import { Alert, Modal } from "react-native";
import api from '../services'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMensagem from "../components/modal/modal-mensagens";

export const AuthContext = createContext({});

function Autenticacao({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalErro, setModalErro] = useState(false);
    const [modalMensagem, setModalMensagem] = useState('')
    const [modalMensagemBotao, setModalMensagemBotao] = useState('')

    useEffect(() => {
        setLoading(true);
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@finToken');

            if (storageUser) {
                const userData = JSON.parse(storageUser);
                api.defaults.headers['Authorization'] = `Bearer ${userData.token}`;
                setUsuario(userData);
            }
            setLoading(false);
        }

        loadStorage();
    }, []);

    async function Logar(email, senha) {
        setLoading(true);
        try {
            const response = await api.post('/login', {
                username: email,
                password: senha
            });

            if (response.data.mensagem === 'Funcionário não cadastrado') {
                setUsuario(null)
                setLoading(false)
                Alert.alert(
                   'Erro ao fazer o login',
                   'Esse usuário não existe'
                    
                )
                return;


            }
            if (response.data.mensagem === 'Senha incorreta') {
                setUsuario(null)
                setLoading(false)
                Alert.alert(
                   'Erro ao fazer o login',
                   'Sua senha está incorreta'
                    
                )
                return;

            } else {
                const { funcionario_administrador, funcionario_email, funcionario_matricula, funcionario_nome, token } = response.data;
                const data = {
                    id: funcionario_matricula,
                    nome: funcionario_nome,
                    email: funcionario_email,
                    adm: funcionario_administrador,
                    token: token
                };

                await AsyncStorage.setItem('@finToken', JSON.stringify(data));
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                setUsuario(data);
                setLoading(false)
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function sair() {
        await AsyncStorage.clear()
            .then(() => {
                setUsuario(null);
            });
    }

    return (
        <AuthContext.Provider value={{ signed: !!usuario, usuario, Logar, sair, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default Autenticacao;

