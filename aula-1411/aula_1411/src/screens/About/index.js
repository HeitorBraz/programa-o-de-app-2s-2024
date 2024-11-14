import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const About = ({ route }) => {
  const navigation = useNavigation(); 


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={styles.text}>Este é um exemplo simples de tela sobre.</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} color="#6200ea"r/>
      <View style={styles.buttonContainer}></View>
      <Button title="Ir para Detalhes" onPress={() => navigation.navigate('Details')} color="#6200ea"/>
    </View>
  );
}

export default About;

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
