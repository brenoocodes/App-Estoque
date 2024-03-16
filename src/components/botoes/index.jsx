import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { estilos } from "./estilos";

export function Botao({texto, ...rest}){
    return(
        <TouchableOpacity style={estilos.botao} {...rest}>
            <Text style={estilos.texto}>{texto}</Text>
        </TouchableOpacity>
    )
}