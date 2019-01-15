import React ,{Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import Dashboard from 'Login/Screens/Dashboard'
import firebase from './firebase'

import Camera from 'Login/Screens/Camera.js'


export default class Sign extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
    }
  }
  loginUser (email,password)
   {
   firebase.auth().signInWithEmailAndPassword(email,password).
   then(()=>{ this.props.navigation.navigate("Camera");}).catch((error)=>{
             alert("Error!");
              console.log(error.toString())
          })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder='Username' 
        onChangeText={(data) => {this.setState({
          email : data
        })}}
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType="next"
            style={styles.input}/>
        <TextInput placeholder='Password'
          onChangeText={(data) => {this.setState({
            password : data
          })}}
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType="go"
          secureTextEntry
            style={styles.input}/>
      
      <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textButton} onPress={() => this.loginUser(this.state.email,this.state.password)} >NEXT</Text>
      </TouchableOpacity>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
    padding:20,
    paddingTop:100,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10,
  },
  buttonContainer:{
    backgroundColor: '#27ae60',
    height:40,
    width:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'700',
    paddingTop:5, 
    alignItems: 'center',
    justifyContent: 'center',
  },

});