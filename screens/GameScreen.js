import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

import Number from '../modules/Number';
import Card from '../modules/Card';


const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min))+min;
    if(rndNum === exclude){
        return generateRandomNumber(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props =>{
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;


    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);




    const nextGuessHandler = direction => {
        if ((direction ==='lower' && currentGuess < props.userChoice) || (direction ==='greater' && currentGuess > props.userChoice)){
            Alert.alert('Please give currect hint', 'You know that this is wrong...', [{text: 'Sorry', style:'cancel'}]);
            return;
        }
        if (direction ==='lower') {
            currentHigh.current = currentGuess;

        }else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);


    };

    return(
        <View style= {styles.screen}>
            <Text> Computer's Guess </Text>
            <Number>{currentGuess} </Number>
            <Card style= {styles.buttonstyle}> 
                <Button title = "LOWER"  onPress = {nextGuessHandler.bind(this, 'lower')}/>
                <Button title = "GREATER" onPress = {nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
    

};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems: 'center',

    },
    buttonstyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',

    },
});

export default GameScreen;
