import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const choices = [
  { name: 'Pedra', image: require('./assets/pedra.png') },
  { name: 'Papel', image: require('./assets/papel.png') },
  { name: 'Tesoura', image: require('./assets/tesoura.png') },
];

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  const play = (userChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(userChoice);
    setComputerChoice(computerChoice);

    if (userChoice.name === computerChoice.name) {
      setResult('Empate!');
      setScore(prevScore => ({ ...prevScore, ties: prevScore.ties + 1 }));
    } else if (
      (userChoice.name === 'Pedra' && computerChoice.name === 'Tesoura') ||
      (userChoice.name === 'Papel' && computerChoice.name === 'Pedra') ||
      (userChoice.name === 'Tesoura' && computerChoice.name === 'Papel')
    ) {
      setResult('Você ganhou!');
      setScore(prevScore => ({ ...prevScore, wins: prevScore.wins + 1 }));
    } else {
      setResult('Você perdeu!');
      setScore(prevScore => ({ ...prevScore, losses: prevScore.losses + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel e Tesoura</Text>
      
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>Placar:</Text>
        <Text style={styles.scoreText}>Vitórias: {score.wins}</Text>
        <Text style={styles.scoreText}>Derrotas: {score.losses}</Text>
        <Text style={styles.scoreText}>Empates: {score.ties}</Text>
      </View>

      <View style={styles.choicesContainer}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice.name}
            style={styles.choiceButton}
            onPress={() => play(choice)}
          >
            <Image source={choice.image} style={styles.choiceImage} />
            <Text style={styles.choiceText}>{choice.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {userChoice && (
        <View style={styles.resultContainer}>
          <Text style={styles.choiceText}>Sua escolha: {userChoice.name}</Text>
          <Image source={userChoice.image} style={styles.resultImage} />
          <Text style={styles.choiceText}>Escolha do computador: {computerChoice.name}</Text>
          <Image source={computerChoice.image} style={styles.resultImage} />
          <Text style={[
            styles.result,
            result === 'Você perdeu!' && styles.lostResult,
            result === 'Você ganhou!' && styles.wonResult
          ]}>{result}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Próxima Rodada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  scoreBoard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  choiceButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  choiceImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 16,
    color: '#333',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultImage: {
    width: 60,
    height: 60,
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  lostResult: {
    color: '#FF0000', // Red color for "Você perdeu!"
  },
  wonResult: {
    color: '#4CAF50', // Green color for "Você ganhou!"
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});