import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { estilosmodal } from "./estilos";

export default function ModalMensagem({ texto, textobotao, fecharModal }) {
    return (
        <View style={estilosmodal.conteiner}>
            <View style={estilosmodal.conteudo}>
                <Text style={estilosmodal.texto}>{texto}</Text>

                <TouchableOpacity style={estilosmodal.botao} onPress={fecharModal}>
                    <Text style={estilosmodal.textobotao}>{textobotao}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
