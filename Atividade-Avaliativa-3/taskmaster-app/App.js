import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskMaster() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas');
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas');
    }
  };

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Math.random().toString(),
      title: task.trim(),
      createdAt: new Date().toLocaleString()
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const removeTask = (id) => {
    Alert.alert(
      'Remover Tarefa',
      'Tem certeza que deseja remover esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          }
        }
      ]
    );
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskItem}
      onLongPress={() => removeTask(item.id)}
    >
      <View style={styles.taskContent}>
        <Text style={styles.taskText}>{item.title}</Text>
        <Text style={styles.taskDate}>{item.createdAt}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => removeTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>TaskMaster</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma tarefa"
            placeholderTextColor="#666"
            value={task}
            onChangeText={setTask}
            returnKeyType="done"
            onSubmitEditing={addTask}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addTask}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                Nenhuma tarefa adicionada
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  content: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d8e0',
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    fontSize: 16,
    color: '#2c3e50'
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  taskContent: {
    flex: 1,
    marginRight: 10
  },
  taskText: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 4
  },
  taskDate: {
    fontSize: 12,
    color: '#7f8c8d'
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  emptyListText: {
    color: '#7f8c8d',
    fontSize: 18
  }
});