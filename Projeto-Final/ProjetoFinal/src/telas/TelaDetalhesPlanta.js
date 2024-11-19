import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import styles from '../styles/estilos';

export default function TelaDetalhesPlanta({ route, navigation }) {
  const { planta } = route.params;
  const [nomePlanta, setNomePlanta] = useState(planta.nome);
  const [frequenciaRega, setFrequenciaRega] = useState(planta.frequenciaRega.toString());
  const [imagemPlanta, setImagemPlanta] = useState(planta.imagem);

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

  const salvarAlteracoes = async () => {
    if (nomePlanta.trim()) {
      try {
        const plantasSalvas = await AsyncStorage.getItem('plantas');
        let plantas = plantasSalvas ? JSON.parse(plantasSalvas) : [];
        
        const plantasAtualizadas = plantas.map(p => 
          p.id === planta.id 
            ? { 
                ...p, 
                nome: nomePlanta,
                frequenciaRega: parseInt(frequenciaRega),
                imagem: imagemPlanta
              } 
            : p
        );
        
        await AsyncStorage.setItem('plantas', JSON.stringify(plantasAtualizadas));
        
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Hora de Regar 💧",
            body: `É hora de regar ${nomePlanta}!`,
          },
          trigger: {
            seconds: parseInt(frequenciaRega) * 24 * 60 * 60,
          }
        });

        Alert.alert('Sucesso', 'Planta atualizada com sucesso!');
        navigation.goBack();
      } catch (erro) {
        console.error('Erro ao atualizar planta', erro);
        Alert.alert('Erro', 'Não foi possível atualizar a planta');
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira o nome da planta');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Editar Planta</Text>
        
        {imagemPlanta && (
          <Image source={{ uri: imagemPlanta }} style={styles.imagemDetalhes} />
        )}

        <Text style={styles.labelInput}>Nome da Planta</Text>
        <TextInput
          style={styles.input}
          value={nomePlanta}
          onChangeText={setNomePlanta}
          placeholder="Digite o nome da planta"
          placeholderTextColor="#81C784"
        />
        
        <Text style={styles.labelInput}>Frequência de Rega (dias)</Text>
        <TextInput
          style={styles.input}
          value={frequenciaRega}
          onChangeText={setFrequenciaRega}
          placeholder="Digite a frequência de rega"
          keyboardType="numeric"
          placeholderTextColor="#81C784"
        />
        
        <TouchableOpacity 
          style={[styles.botao, { backgroundColor: '#66BB6A' }]} 
          onPress={selecionarImagem}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Alterar Imagem</Text>
        </TouchableOpacity>
        
        <View style={styles.cardInfo}>
          <Text style={styles.textoInfo}>
            ℹ️ A planta será regada a cada {frequenciaRega} dias e você receberá uma notificação quando for hora de regar.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.botao} 
          onPress={salvarAlteracoes}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}