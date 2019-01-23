import React ,{Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default class Dashboard extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Hello There!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#34495e',
      alignItems: 'center',
      justifyContent: 'center',
    },
});