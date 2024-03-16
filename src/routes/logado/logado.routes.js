import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

import Profile from "../../pages/profile";
import SaidasRoutes from "./saida";
import EntradaRoutes from "./entrada";

const Tab = createBottomTabNavigator();

export default function Logado() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#767676',
                tabBarStyle: {
                    backgroundColor: '#170F56',
                    borderTopWidth: 0

                },
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Entradas"
                component={EntradaRoutes}
                options={{
                    headerTitle: 'Suas entradas',
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="upload" size={24} color={color}/>
                    }
                }}
            />
            <Tab.Screen
                name="Saidas"
                component={SaidasRoutes}
                options={{
                    headerTitle: 'Suas saidas',
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="download" size={24}color={color} />
                    }
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="user" size={24} color={color} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}