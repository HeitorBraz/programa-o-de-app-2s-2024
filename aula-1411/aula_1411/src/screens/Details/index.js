import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetailsScreen() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>
      <Text style={styles.text}>Aqui você pode ver mais detalhes sobre o aplicativo.</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} color="#6200ea"/>
      <View style={styles.buttonContainer}></View>
      <Button title="Ir para Sobre" onPress={() => navigation.navigate('About')} color="#6200ea" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
