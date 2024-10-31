import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  SafeAreaView,
  ScrollView,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormularioPersistente = () => {
  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [dadosSalvos, setDadosSalvos] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosArmazenados = await AsyncStorage.getItem('@dadosFormulario');
        if (dadosArmazenados) {
          setFormulario(JSON.parse(dadosArmazenados));
        }
      } catch (erro) {
        console.error('Erro ao carregar dados', erro);
      }
    };

    carregarDados();
  }, []);

  // Salvar dados sempre que o formulário muda
  useEffect(() => {
    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem(
          '@dadosFormulario', 
          JSON.stringify(formulario)
        );
      } catch (erro) {
        console.error('Erro ao salvar dados', erro);
      }
    };

    salvarDados();
  }, [formulario]);

  const handleChange = (name, value) => {
    setFormulario(prevFormulario => ({
      ...prevFormulario,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    Alert.alert(
      'Formulário Enviado', 
      JSON.stringify(formulario, null, 2)
    );
  };

  const limparFormulario = async () => {
    try {
      setFormulario({
        nome: '',
        email: '',
        telefone: ''
      });
      await AsyncStorage.removeItem('@dadosFormulario');
    } catch (erro) {
      console.error('Erro ao limpar dados', erro);
    }
  };

  const visualizarDadosSalvos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@dadosFormulario');
      if (dados) {
        setDadosSalvos(JSON.parse(dados));
        setModalVisivel(true);
      } else {
        Alert.alert('Aviso', 'Não há dados salvos');
      }
    } catch (erro) {
      console.error('Erro ao buscar dados', erro);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formularioContainer}>
          <Text style={styles.titulo}>Formulário Persistente</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={formulario.nome}
              onChangeText={(value) => handleChange('nome', value)}
              placeholder="Digite seu nome"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formulario.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder="Digite seu email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={formulario.telefone}
              onChangeText={(value) => handleChange('telefone', value)}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity 
              style={[styles.botao, styles.botaoEnviar]}
              onPress={handleSubmit}
            >
              <Text style={styles.botaoTexto}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botao, styles.botaoLimpar]}
              onPress={limparFormulario}
            >
              <Text style={styles.botaoTexto}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.botao, styles.botaoVisualizarDados]}
            onPress={visualizarDadosSalvos}
          >
            <Text style={styles.botaoTexto}>Ver Dados Salvos</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text style={styles.modalTitulo}>Dados Salvos</Text>
              {dadosSalvos && (
                <>
                  <Text style={styles.modalTexto}>Nome: {dadosSalvos.nome}</Text>
                  <Text style={styles.modalTexto}>Email: {dadosSalvos.email}</Text>
                  <Text style={styles.modalTexto}>Telefone: {dadosSalvos.telefone}</Text>
                </>
              )}
              <TouchableOpacity 
                style={[styles.botao, styles.botaoFecharModal]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.botaoTexto}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formularioContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botao: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%',
  },
  botaoEnviar: {
    backgroundColor: '#2196F3',
  },
  botaoLimpar: {
    backgroundColor: '#F44336',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVisualizarDados: {
    backgroundColor: '#4CAF50',
    width: '100%',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalConteudo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 10,
  },
  botaoFecharModal: {
    backgroundColor: '#2196F3',
    marginTop: 15,
    width: '100%',
  },
});

export default FormularioPersistente;