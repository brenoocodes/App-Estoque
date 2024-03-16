import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListarEntradas from '../../../pages/entradas/listagem'
import DetalhesEntrada from "../../../pages/entradas/detalhes";
import NovaEntrada from "../../../pages/entradas/nova"

const Stack = createNativeStackNavigator();

export default function EntradaRoutes() {
    return(
    <Stack.Navigator>
        <Stack.Screen
            name="ListarEntradas"
            component={ListarEntradas}
            options={{
                headerTitle: 'Todas as entradas'
            }}
        />

        <Stack.Screen
            name="DetalhesdaEntrada"
            component={DetalhesEntrada}
            options={{
                headerTitle: 'Detalhes da entrada'
            }}
        />

        <Stack.Screen
            name="AdicionarEntrada"
            component={NovaEntrada}
            options={{
                headerTitle: 'Adicionar nova entrada'
            }}
        />

    </Stack.Navigator>
    )
}