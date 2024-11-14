import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Página Inicial</Text>
      <Text style={styles.text}>Esta é a tela Home do aplicativo.</Text>
      <Button title="Ir para Sobre" onPress={() => navigation.navigate('About', {name: 'Heitor', email: 'heitor@email.com'})} color="#6200ea" />
      <View style={styles.buttonContainer}></View>
      <Button title="Ir para Detalhes" onPress={() => navigation.navigate('Details')} color="#6200ea"/>
    </View>
  );
}

export default Home;

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
