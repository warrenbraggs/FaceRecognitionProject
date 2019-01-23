import React ,{Component} from 'react';
import {Alert, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';

export default class MainScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}> 
        <Image 
            style={styles.image}
            source={require('/Users/fede/node_modules/Login/Images/logo.png')}/>
      </View>

      <View style={styles.loginContainer}> 
        <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.props.navigation.navigate('LoginUsername')} >
          <Text style={styles.textButton}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer1} onPress={() => this.props.navigation.navigate('Sign')}>
          <Text style={styles.textButton} >SIGN IN</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginContainer: {
    flex: 1,
    margin:30,
  },

  image:{
    height:200,
    width:200,
    
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
