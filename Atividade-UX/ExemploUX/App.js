import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions, 
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const window = useWindowDimensions();
  const [orientation, setOrientation] = useState('portrait');
  const [layout, setLayout] = useState({
    cardWidth: 0,
    imageHeight: 0,
    topButtonSize: 0
  });

  // Atualiza o layout baseado nas dimensões da tela
  useEffect(() => {
    const isPortrait = window.height > window.width;
    setOrientation(isPortrait ? 'portrait' : 'landscape');

    // Calcula dimensões responsivas
    const cardSpacing = window.width * 0.05; // 5% da largura para espaçamento
    const cardWidth = (window.width - (cardSpacing * 4)) / 3;
    const imageHeight = isPortrait ? 200 : 150;
    const topButtonSize = isPortrait ? 13 : 11;

    setLayout({
      cardWidth,
      imageHeight,
      topButtonSize
    });
  }, [window.width, window.height]);

  const renderTopButtons = () => {
    const buttons = ['Home', 'Perfil', 'Chat', 'Busca', 'Menu'];
    return buttons.map((text, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.topButton,
          { padding: orientation === 'portrait' ? 8 : 6 }
        ]}
        onPress={() => alert(`${text} pressionado!`)}
      >
        <Text style={[
          styles.topButtonText,
          { fontSize: layout.topButtonSize }
        ]}>{text}</Text>
      </TouchableOpacity>
    ));
  };

  const renderCards = () => {
    const cards = [
      { title: 'Card 1', content: 'Descrição 1' },
      { title: 'Card 2', content: 'Descrição 2' },
      { title: 'Card 3', content: 'Descrição 3' },
    ];

    return (
      <View style={[
        styles.cardsContainer,
        orientation === 'landscape' && styles.cardsContainerLandscape
      ]}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.card,
              { 
                width: layout.cardWidth,
                height: orientation === 'portrait' ? 180 : 150 // Aumentei a altura aqui
              }
            ]}
            onPress={() => alert(`${card.title} selecionado!`)}
          >
            <Text style={[
              styles.cardTitle,
              { fontSize: orientation === 'portrait' ? 16 : 14 }
            ]}>{card.title}</Text>
            <Text style={[
              styles.cardContent,
              { fontSize: orientation === 'portrait' ? 13 : 11 }
            ]}>{card.content}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderBottomButtons = () => {
    const buttons = [
      { text: 'Início', color: '#4CAF50' },
      { text: 'Favoritos', color: '#FF9800' },
      { text: 'Perfil', color: '#2196F3' },
      { text: 'Config', color: '#9C27B0' }
    ];
    return buttons.map((button, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.bottomButton,
          { 
            backgroundColor: button.color,
            paddingVertical: orientation === 'portrait' ? 10 : 8,
            paddingHorizontal: orientation === 'portrait' ? 16 : 12
          }
        ]}
        onPress={() => alert(`${button.text} pressionado!`)}
      >
        <Text style={[
          styles.bottomButtonText,
          { fontSize: orientation === 'portrait' ? 13 : 11 }
        ]}>{button.text}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container} onLayout={() => {}}>
      <StatusBar style="light" />
      
      <View style={[
        styles.topButtonsContainer,
        { paddingTop: orientation === 'portrait' ? 50 : 30 }
      ]}>
        {renderTopButtons()}
      </View>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.imageContainer,
            { margin: orientation === 'portrait' ? 20 : 15 }
          ]}
          onPress={() => alert('Imagem pressionada!')}
        >
          <Image
            source={{ uri: 'https://picsum.photos/400/200' }}
            style={[styles.image, { height: layout.imageHeight }]}
          />
          <TouchableOpacity
            style={[
              styles.imageButton,
              {
                bottom: orientation === 'portrait' ? 15 : 10,
                right: orientation === 'portrait' ? 15 : 10
              }
            ]}
            onPress={(e) => {
              e.stopPropagation();
              alert('Botão da imagem pressionado!');
            }}
          >
            <Text style={[
              styles.imageButtonText,
              { fontSize: orientation === 'portrait' ? 14 : 12 }
            ]}>Ver mais</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={[
          styles.textButtonContainer,
          { 
            paddingHorizontal: orientation === 'portrait' ? 20 : 15,
            marginBottom: orientation === 'portrait' ? 20 : 15
          }
        ]}>
          <Text style={[
            styles.mainText,
            { fontSize: orientation === 'portrait' ? 20 : 16 }
          ]}>Conteúdo em destaque</Text>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => alert('Botão lateral pressionado!')}
          >
            <Text style={[
              styles.sideButtonText,
              { fontSize: orientation === 'portrait' ? 14 : 12 }
            ]}>Explorar</Text>
          </TouchableOpacity>
        </View>

        {renderCards()}
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        {renderBottomButtons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flex: 1,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topButton: {
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
  },
  topButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  imageButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  sideButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  sideButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardsContainerLandscape: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  cardContent: {
    color: '#666666',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomButton: {
    borderRadius: 25,
    elevation: 2,
  },
  bottomButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});