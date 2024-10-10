import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const BMICategories = [
  { range: '< 18.5', category: 'Abaixo do peso', color: '#3498db' },
  { range: '18.5 - 24.9', category: 'Peso normal', color: '#2ecc71' },
  { range: '25 - 29.9', category: 'Sobrepeso', color: '#f1c40f' },
  { range: '30 - 34.9', category: 'Obesidade Grau I', color: '#e67e22' },
  { range: '35 - 39.9', category: 'Obesidade Grau II', color: '#e74c3c' },
  { range: '≥ 40', category: 'Obesidade Grau III', color: '#c0392b' },
];

export default function App() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert cm to m
    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      setBMI(bmiValue.toFixed(1));
      setCategoryAndColor(bmiValue);
    }
  };

  const setCategoryAndColor = (bmiValue) => {
    const category = BMICategories.find(cat => {
      const [min, max] = cat.range.split(' - ').map(val => parseFloat(val) || 0);
      return bmiValue >= min && (max ? bmiValue <= max : true);
    });
    setBMICategory(category);
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Peso (kg)</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={200}
              step={1}
              value={parseFloat(weight)}
              onValueChange={(value) => setWeight(value.toString())}
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#bdc3c7"
              thumbTintColor="#3498db"
            />
            <Text style={styles.sliderValue}>{weight} kg</Text>
          </View>

          <Text style={styles.label}>Altura (cm)</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={220}
              step={1}
              value={parseFloat(height)}
              onValueChange={(value) => setHeight(value.toString())}
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#bdc3c7"
              thumbTintColor="#3498db"
            />
            <Text style={styles.sliderValue}>{height} cm</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>
        </View>

        {bmi && (
          <View style={styles.resultCard}>
            <Text style={styles.bmiValue}>Seu IMC: {bmi}</Text>
            <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>
              {bmiCategory.category}
            </Text>
          </View>
        )}

        <View style={styles.categoriesCard}>
          <Text style={styles.categoriesTitle}>Categorias de IMC</Text>
          {BMICategories.map((cat, index) => (
            <View key={index} style={styles.categoryRow}>
              <View style={[styles.categoryColor, { backgroundColor: cat.color }]} />
              <Text style={styles.categoryText}>{cat.range}: {cat.category}</Text>
            </View>
          ))}
        </View>
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
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  button: {
    backgroundColor: '#3498db',
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
  bmiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bmiCategory: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoriesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
});