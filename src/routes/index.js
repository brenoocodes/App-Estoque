//routes/index.js
import React, {useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Logado from './logado/logado.routes';
import Login from '../pages/Login/index.jsx'

import { AuthContext } from '../contexts/index.js';

function Routes() {
  const { usuario, loading } = useContext(AuthContext); 
  if(loading){
      return(
        <View 
        style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F0F4FF'
        }}>
          <ActivityIndicator size="large" color="#131313" />
        </View>
      )
    }
  return (
      usuario ?  <Logado /> : <Login /> 
  );
}

export default Routes; 