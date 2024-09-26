import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RestaurantCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador de Pessoas</Text>
      <Text style={styles.countText}>{count}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text style={styles.buttonText}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={decrement} style={[styles.button, styles.decrementButton]}>
          <Text style={styles.buttonText}>Saída</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 40,
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#74b9ff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  decrementButton: {
    backgroundColor: '#ff7675',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
});

export default RestaurantCounter;
