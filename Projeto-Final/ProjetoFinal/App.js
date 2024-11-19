import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/telas/TelaInicial';
import TelaAdicionarPlanta from './src/telas/TelaAdicionarPlanta';
import TelaDetalhesPlanta from './src/telas/TelaDetalhesPlanta';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#E8F5E9',
            elevation: 0,
            shadowOpacity: 0
          },
          headerTintColor: '#2E7D32',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <Stack.Screen name="Inicio" component={TelaInicial} options={{ title: 'Minhas Plantas' }} />
          <Stack.Screen name="AdicionarPlanta" component={TelaAdicionarPlanta} options={{ title: 'Adicionar Planta' }} />
          <Stack.Screen name="DetalhesPlanta" component={TelaDetalhesPlanta} options={{ title: 'Detalhes da Planta' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}