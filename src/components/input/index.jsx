import React from "react";
import { View, TextInput } from "react-native";
import { estilos } from "./estilos";

export function Input({...rest}){
    return(
        <TextInput style={estilos.input} {...rest}>

        </TextInput>
    )
}