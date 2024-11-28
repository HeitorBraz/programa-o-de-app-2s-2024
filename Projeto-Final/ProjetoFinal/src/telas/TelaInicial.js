import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/estilos';

export default function TelaInicial({ navigation }) {
  const [plantas, setPlantas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPlantas = async () => {
      try {
        setCarregando(true);
        const plantasSalvas = await AsyncStorage.getItem('plantas');
        if (plantasSalvas) setPlantas(JSON.parse(plantasSalvas));
      } catch (erro) {
        console.error('Erro ao carregar plantas', erro);
        Alert.alert('Erro', 'Não foi possível carregar as plantas');
      } finally {
        setCarregando(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', carregarPlantas);
    carregarPlantas();
    return unsubscribe;
  }, [navigation]);

  const navegarParaAdicionarPlanta = () => {
    navigation.navigate('AdicionarPlanta');
  };

  const navegarParaDetalhesPlanta = (planta) => {
    navigation.navigate('DetalhesPlanta', { planta });
  };

  const removerPlanta = async (plantaId) => {
    try {
      const plantasSalvas = await AsyncStorage.getItem('plantas');
      let plantas = plantasSalvas ? JSON.parse(plantasSalvas) : [];
      
      const plantasAtualizadas = plantas.filter(p => p.id !== plantaId);
      
      await AsyncStorage.setItem('plantas', JSON.stringify(plantasAtualizadas));
      setPlantas(plantasAtualizadas);
    } catch (erro) {
      console.error('Erro ao remover planta', erro);
      Alert.alert('Erro', 'Não foi possível remover a planta');
    }
  };

  const confirmarRemocao = (planta) => {
    Alert.alert(
      'Remover Planta',
      `Tem certeza que deseja remover ${planta.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removerPlanta(planta.id) }
      ]
    );
  };

  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner size={70} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Minhas Plantas</Text>
      <FlatList
        data={plantas}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.cardInfo}>
            <Text style={[styles.textoInfo, { fontSize: 18, textAlign: 'center' }]}>
              Nenhuma planta cadastrada
            </Text>
            <Text style={[styles.textoInfo, { textAlign: 'center', marginTop: 8, opacity: 0.8 }]}>
              Adicione sua primeira planta!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemPlanta}>
            <TouchableOpacity 
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navegarParaDetalhesPlanta(item)}
              activeOpacity={0.7}
            >
              {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemPlanta} />}
              <View style={styles.detalhesPlanta}>
                <Text style={styles.nomePlanta}>{item.nome}</Text>
                <Text style={styles.dataRega}>
                  Última rega: {new Date(item.ultimaRega).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.botaoRemover}
              onPress={() => confirmarRemocao(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.textoRemover}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity 
        style={styles.botao} 
        onPress={navegarParaAdicionarPlanta}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>Adicionar Nova Planta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}