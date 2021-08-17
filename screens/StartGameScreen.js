import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../modules/Card';
import Input from '../modules/Input';
import Colors from '../constants/colors';
import Number from '../modules/Number';

const StartGameScreen = props =>{

    const [enteredNumber, setEnteredNumber] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectNumber, setSelectedNumber] = useState('');
    
    const numberInputHandler = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
    };
    const resetButtonHandler=()  => {
        setEnteredNumber('');
        setConfirmed(false);

    };
    const confirmButtonHandler = () =>{
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber<=0 ||chosenNumber > 99){
            Alert.alert('Invalid Number Entered', 'Number has to be between 1 to 99', [{text: 'okay', style:'destructive', onPress: resetButtonHandler}])
            return; 
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredNumber('');
        Keyboard.dismiss();

    };

    let confiremedOutput;

    if (confirmed){
        confiremedOutput = (
            <Card style= {styles.summary}>
                <Text>Entered Number is: </Text>
                <Number>{selectNumber}</Number>
                <Button title="START GAME" color={Colors.scond} onPress = {() =>props.onStartGame(selectNumber)} />
            </Card>
        );

    }

    return(
        <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style = {styles.title}>Start a New Game...!</Text>
            <Card style = {styles.inputContainer}>
                <Text>Guess a Number</Text>
                <Input 
                    style = {styles.input} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect = {false} 
                    keyboardType="numeric" 
                    maxLength={2} 
                    onChangeText = {numberInputHandler}
                    value = {enteredNumber}
                />
                <View style = {styles.button}>
                    <View style = {styles.buttonsize}>
                        <Button 
                            title = "Reset" 
                            onPress= {resetButtonHandler} 
                            color ={Colors.scond} 
                        />
                    </View>
                    <View style = {styles.buttonsize}>
                        <Button 
                            title = "Confirm" 
                            onPress={confirmButtonHandler} 
                            color = {Colors.primary} 
                        />
                    </View>
                </View>
            </Card>
            {confiremedOutput}
        </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    button:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    buttonsize:{
        width:'40%',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    input:{
        width:100,
        textAlign: 'center',
        
    },
    summary: {
        marginTop: 20,
        alignItems: 'center',
    },

});

export default StartGameScreen;
