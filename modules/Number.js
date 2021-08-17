import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Number = props =>{
    return(
        <View style ={styles.numberstyle}>
            <Text style={styles.numbertext}>{props.children}</Text>
        </View>

    );

};

const styles = StyleSheet.create({
    numberstyle:{
        borderWidth: 2,
        borderColor: Colors.scond,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent:'center', 
    },
    numbertext: {
        color: Colors.scond,
        fontSize :22,

    },

});

export default Number;