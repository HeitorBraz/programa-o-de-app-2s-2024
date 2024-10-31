import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

const ContadorApp = () => {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(prevContador => prevContador + 1);
  };

  const decrementar = () => {
    setContador(prevContador => prevContador > 0 ? prevContador - 1 : 0);
  };

  const resetar = () => {
    setContador(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>
      
      <View style={styles.displayContainer}>
        <Text style={styles.displayTexto}>{contador}</Text>
      </View>
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={[styles.botao, styles.botaoDecrementar]} 
          onPress={decrementar}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botao, styles.botaoResetar]} 
          onPress={resetar}
        >
          <Text style={styles.botaoTexto}>Resetar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botao, styles.botaoIncrementar]} 
          onPress={incrementar}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  displayContainer: {
    backgroundColor: 'white',
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  displayTexto: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  botao: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  botaoIncrementar: {
    backgroundColor: '#4CAF50',
  },
  botaoDecrementar: {
    backgroundColor: '#F44336',
  },
  botaoResetar: {
    backgroundColor: '#2196F3',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContadorApp;