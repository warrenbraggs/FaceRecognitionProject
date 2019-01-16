import React ,{Component} from 'react';
import {Alert, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
//import Camera from 'Login/Screens/Camera.js'
//import Login from 'Login/Screens/Login.js'
//import LoginUsername from 'Login/Screens/LoginUsername.js'

//import Sign from 'Login/Screens/Sign.js'


export default class MainScreen extends React.Component {
  handleButton = () =>{
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}> 
        <Image 
            style={styles.image}
            source={require('/Users/fede/node_modules/Login/Images/homeImage.png')}/>
            
      </View>

      <View style={styles.loginContainer}> 
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('LoginUsername')} >LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer1}>
          <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('Sign')}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginContainer: {
    flex: 1,
    margin:30,
  },

  image:{
    height:300,
    width:300,
  },
  buttonContainer:{
    backgroundColor:'#2980b9',
    height:40,
    width:200,
  },
  buttonContainer1:{
    marginTop:30,
    backgroundColor:'#2980b9',
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
