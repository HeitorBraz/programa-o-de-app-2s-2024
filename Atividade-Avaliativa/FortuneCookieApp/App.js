import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Função para carregar as citações do arquivo JSON
const loadFortunes = () => {
  // Substitua isso com a importação direta se estiver usando um bundler de assets
  const json = require('./assets/fortunes.json');
  return json;
};

const fortunes = loadFortunes(); // Carregar citações

export default function FortuneCookieApp() {
  const [cookieBroken, setCookieBroken] = useState(false);
  const [fortune, setFortune] = useState('');

  const breakCookie = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    setCookieBroken(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={cookieBroken ? require('./assets/cookie_open.png') : require('./assets/cookie_closed.png')}
        style={styles.cookie}
      />
      <TouchableOpacity onPress={breakCookie} style={styles.button}>
        <Text style={styles.buttonText}>Quebrar Biscoito</Text>
      </TouchableOpacity>
      {cookieBroken && (
        <Text style={styles.fortune}>{fortune}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adiciona um espaçamento ao redor do conteúdo
  },
  cookie: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  fortune: {
    marginTop: 30, // Aumenta o espaço acima da frase
    fontSize: 20,  // Aumenta o tamanho do texto
    textAlign: 'center', // Centraliza o texto
    color: '#333',  // Cor do texto
    lineHeight: 30, // Define o espaçamento entre as linhas do texto
    paddingHorizontal: 20, // Adiciona espaçamento horizontal para não ficar apertado
  },
});