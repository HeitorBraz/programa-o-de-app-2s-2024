import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

// Função para carregar citações do arquivo JSON
const quotes = require('./assets/quotes.json'); // Carregar citações do arquivo JSON

// Mapeamento de imagens para autores
const authorImages = {
  'Charles R. Swindoll': require('./assets/charles.jpg'),
  'Vidal Sassoon': require('./assets/vidal.jpg'),
  'Theodore Roosevelt': require('./assets/theodore.jpg'),
  'Charles Darwin': require('./assets/darwin.jpg'),
  'Winston Churchill': require('./assets/churchill.jpg'),
  'Steve Jobs': require('./assets/steve_jobs.jpg'),
  'Albert Einstein': require('./assets/einstein.jpg'),
};

export default function QuotesApp() {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    setQuote(selectedQuote);
    setLoading(false);
  };

  // Função para obter a imagem do autor
  const getAuthorImage = (author) => authorImages[author];

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.author}>- {quote.author}</Text>
          {quote.author && authorImages[quote.author] && (
            <Image source={getAuthorImage(quote.author)} style={styles.authorImage} />
          )}
        </>
      )}
      <TouchableOpacity onPress={fetchQuote} style={styles.button}>
        <Text style={styles.buttonText}>Nova Citação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  authorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
