import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './modules/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound ] = useState(0);

  const newGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  };
  const starGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    
  };

  const gameOverHandler = numOfRounds =>{
    setGuessRound(numOfRounds);
  };

  let content = <StartGameScreen onStartGame = {starGameHandler} />;

  if (userNumber && guessRound <=0) {
    content = <GameScreen  userChoice = {userNumber} onGameOver ={gameOverHandler} />;

  } else if (guessRound>0){
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart = {newGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title ="Number Guess" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
