//login/index
import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native'; // Importe Modal e Button
import { estiloslogin } from './estilos';
import { Input } from '../../components/input';
import { Botao } from '../../components/botoes';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../../contexts/index';
import ModalMensagem from '../../components/modal/modal-mensagens';

export default function Login() {
    const { Logar } = useContext(AuthContext);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalErro, setModalErro] = useState(false)
    const [modalMensagem, setModalMensagem] = useState('')
    const [modalMensagemBotao, setModalMensagemBotao] = useState('')

    async function fazerLogin() {
        if (email === '' || senha === '') {  
            setModalMensagem("Preencha todos os campos")
            setModalMensagemBotao('Ok')
            setModalErro(true)
            return;
        } else {
            Logar(email.toLowerCase(), senha)
        }
    }

    const alternarVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <View style={estiloslogin.conteiner}>

            <Image
                style={estiloslogin.imagem}
                source={require('../../assets/images/imagem-login.png')}
            />
            <Text style={{
                fontSize: 22,
                marginTop: 12,
                marginBottom: 12,
                textAlign: "center",
                fontWeight: '600',
            }}>
                Entre no sistema
            </Text>

            <View style={estiloslogin.viewinput}>
                <Text style={estiloslogin.titletextos}>Digite seu email</Text>
                <View style={{ width: '90%'}}>
                <Input placeholder="Digite seu email" value={email} onChangeText={setEmail} autoCapitalize="none"/>
                </View>
                

                <Text style={[estiloslogin.titletextos, { marginTop: 25 }]}>Digite sua senha</Text>
                <View style={estiloslogin.senhaview}>
                    <View style={{ width: '90%'}}>
                    <Input placeholder="Digite sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />
                    </View>
                   

                    <TouchableOpacity onPress={alternarVisibilidadeSenha} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 8 }}>
                        <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="black" style={{ position: 'absolute', right: 10 }} />
                    </TouchableOpacity>

                </View>

                <Botao texto='Acessar' onPress={fazerLogin} />

                
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalErro}
                  >
                    <ModalMensagem  fecharModal={()=> setModalErro(false)} texto={modalMensagem} textobotao={modalMensagemBotao}/>
                  </Modal>

            </View>

        </View>
    );
}
