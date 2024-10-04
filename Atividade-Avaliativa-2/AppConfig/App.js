import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [theme, setTheme] = useState('Claro');
  const [fontSize, setFontSize] = useState(16);
  const [nightMode, setNightMode] = useState(false);

  // Função para resetar as preferências
  const resetPreferences = () => {
    setTheme('Claro');
    setFontSize(16);
    setNightMode(false);
  };

  // Estilos dinâmicos baseados no estado
  const dynamicStyles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: nightMode || theme === 'Escuro' ? '#333' : '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: nightMode || theme === 'Escuro' ? '#fff' : '#000',
    },
    label: {
      fontSize: 18,
      marginTop: 20,
      color: nightMode || theme === 'Escuro' ? '#ddd' : '#000',
    },
    fontSizeLabel: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: fontSize, // O tamanho da fonte é dinâmico
      color: nightMode || theme === 'Escuro' ? '#ddd' : '#000',
    },
    picker: {
      height: 50,
      width: '100%',
      color: nightMode || theme === 'Escuro' ? '#fff' : '#000', // Cor do texto dentro do Picker
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Configurações de Preferências</Text>

      {/* Picker para selecionar o tema */}
      <Text style={dynamicStyles.label}>Tema:</Text>
      <Picker
        selectedValue={theme}
        style={dynamicStyles.picker} // Aplicando estilo dinâmico no Picker
        onValueChange={(itemValue) => setTheme(itemValue)}
      >
        <Picker.Item label="Claro" value="Claro" />
        <Picker.Item label="Escuro" value="Escuro" />
        <Picker.Item label="Automático" value="Automático" />
      </Picker>

      {/* Slider para ajustar o tamanho da fonte */}
      <Text style={dynamicStyles.label}>Tamanho da Fonte:</Text>
      <Slider
        style={styles.slider}
        minimumValue={12}
        maximumValue={30}
        value={fontSize}
        onValueChange={(value) => setFontSize(value)}
        step={1}
      />
      <Text style={dynamicStyles.fontSizeLabel}>{`Tamanho: ${fontSize}`}</Text>

      {/* Switch para o Modo Noturno */}
      <Text style={dynamicStyles.label}>Modo Noturno:</Text>
      <Switch
        value={nightMode}
        onValueChange={() => setNightMode((previousState) => !previousState)}
      />
      <Text style={dynamicStyles.label}>{nightMode ? 'Ativado' : 'Desativado'}</Text>

      {/* Botão para resetar preferências */}
      <Button title="Resetar Preferências" onPress={resetPreferences} />
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 40,
  },
});
