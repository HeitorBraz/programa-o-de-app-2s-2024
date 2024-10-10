import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [alcoholPrice, setAlcoholPrice] = useState('');
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [result, setResult] = useState('');

  const calculateBestFuel = () => {
    const alcohol = parseFloat(alcoholPrice);
    const gasoline = parseFloat(gasolinePrice);
    
    if (isNaN(alcohol) || isNaN(gasoline)) {
      setResult('Por favor, insira valores válidos.');
      return;
    }
    
    const ratio = alcohol / gasoline;
    if (ratio < 0.7) {
      setResult('Abasteça com Álcool');
    } else {
      setResult('Abasteça com Gasolina');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Comparador de Combustível</Text>
        <Image
          source={require('./assets/fuel-pump.png')}
          style={styles.image}
        />
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preço do Álcool (por litro)</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 0.00"
              keyboardType="numeric"
              value={alcoholPrice}
              onChangeText={setAlcoholPrice}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preço da Gasolina (por litro)</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 0.00"
              keyboardType="numeric"
              value={gasolinePrice}
              onChangeText={setGasolinePrice}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={calculateBestFuel}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
        {result ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderColor: '#3b5998',
    borderWidth: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
});