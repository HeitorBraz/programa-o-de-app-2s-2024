import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import styles from '../styles/estilos';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TelaAdicionarPlanta({ navigation }) {
  const [nomePlanta, setNomePlanta] = useState('');
  const [frequenciaRega, setFrequenciaRega] = useState('');
  const [imagemPlanta, setImagemPlanta] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const selecionarImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagemPlanta(resultado.assets[0].uri);
    }
  };

  const adicionarPlanta = async () => {
    if (nomePlanta.trim()) {
      const novaPlanta = {
        id: Date.now(),
        nome: nomePlanta,
        ultimaRega: new Date().toISOString(),
        frequenciaRega: parseInt(frequenciaRega),
        imagem: imagemPlanta
      };

      try {
        setCarregando(true);

        const plantasSalvas = await AsyncStorage.getItem('plantas');
        const plantas = plantasSalvas ? JSON.parse(plantasSalvas) : [];
        
        const plantasAtualizadas = [...plantas, novaPlanta];
        await AsyncStorage.setItem('plantas', JSON.stringify(plantasAtualizadas));

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Hora de Regar 💧",
            body: `É hora de regar ${novaPlanta.nome}!`,
          },
          trigger: {
            seconds: novaPlanta.frequenciaRega * 24 * 60 * 60,
          }
        });
        console.log("Notificação agendada para planta:", novaPlanta.nome);

        navigation.goBack();
      } catch (erro) {
        console.error('Erro ao salvar planta', erro);
        Alert.alert('Erro', 'Não foi possível salvar a planta');
      } finally {
        setCarregando(false);
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira o nome da planta');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Adicionar Nova Planta</Text>
        
        <TextInput
          style={styles.input}
          value={nomePlanta}
          onChangeText={setNomePlanta}
          placeholder="Nome da Planta"
          placeholderTextColor="#81C784"
        />
        
        <TextInput
          style={styles.input}
          value={frequenciaRega}
          onChangeText={setFrequenciaRega}
          placeholder="Frequência de Rega (dias)"
          keyboardType="numeric"
          placeholderTextColor="#81C784"
        />
        
        <TouchableOpacity style={styles.botao} onPress={selecionarImagem}>
          <Text style={styles.textoBotao}>Selecionar Imagem</Text>
        </TouchableOpacity>
        
        {imagemPlanta && (
          <Image source={{ uri: imagemPlanta }} style={styles.imagemSelecionada} />
        )}
        
        {carregando ? (
          <LoadingSpinner />
        ) : (
          <TouchableOpacity style={styles.botao} onPress={adicionarPlanta}>
            <Text style={styles.textoBotao}>Adicionar Planta</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}