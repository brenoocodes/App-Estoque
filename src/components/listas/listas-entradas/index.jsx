import React from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { estilos } from './estilos';


export default function ListaEntradas({ data }) {
    const navigate = useNavigation()

    function irdetalhes() {
        navigate.navigate('DetalhesdaEntrada', { id: data.id, quanti: data.quantidade,  itemData: data, title: `Detalhes da Entrada ${data.id}` });
    }
    return (
        <View style={estilos.list}>
            <View style={estilos.lista}>


                <View style={estilos.linha}>
                    <View>
                        <Text style={estilos.produto}>
                            {data.produto}
                        </Text>
                        <Text style={estilos.demaistexto}>
                            Quantidade: {data.quantidade}
                        </Text>


                        <Text>
                            Fornecedor: {data.fornecedor}

                        </Text>

                        <Text style={estilos.horario}>
                            {data.horario.hora}  {data.horario.dia}
                        </Text>
                    </View>


                    <View >
                        <TouchableOpacity style={estilos.botaoview}
                            onPress={() => irdetalhes()}
                        >
                            <FontAwesome6 name="arrow-alt-circle-right" size={24} color="black" />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        </View>
    );
}