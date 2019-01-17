import React ,{Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

//import Camera from 'Login/Screens/Camera'
//import LoginUsername from 'Login/Screens/LoginUsername'


export default class Login extends React.Component {
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}> 
            <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('Camera')} >CAMERA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer1}>
            <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('LoginUsername')}>USERNAME</Text>
            </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b59b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginContainer: {
    margin:30,
  },
  buttonContainer:{
    backgroundColor:'#8e44ad',
    height:40,
    width:200,
  },
  buttonContainer1:{
    marginTop:30,
    backgroundColor:'#8e44ad',
    height:40,
    width:200,
  },
  textButton:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'700',
    paddingTop:10, 
  },

});