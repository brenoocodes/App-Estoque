import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListarSaidas from '../../../pages/saidas/listagem'
import DetalhesSaida from "../../../pages/saidas/detalhes";
import NovaSaida from "../../../pages/saidas/nova"

const Stack = createNativeStackNavigator();

export default function SaidasRoutes() {
    return(
    <Stack.Navigator>
        <Stack.Screen
            name="ListaSaidas"
            component={ListarSaidas}
            options={{
                headerTitle: 'Todas as Saidas'
            }}
        />

        <Stack.Screen
            name="Detalhesdasaida"
            component={DetalhesSaida}

        />

        <Stack.Screen
            name="AdicionarSaida"
            component={NovaSaida}
            options={{
                headerTitle: 'Adicionar nova saida'
            }}
        />

    </Stack.Navigator>
    )
}