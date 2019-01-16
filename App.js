import React ,{Component} from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import MainScreen from './Screens/MainScreen.js'

import Login from './Screens/Login'
import Camera from './Screens/Camera'
import LoginUsername from './Screens/LoginUsername'

import Sign from './Screens/Sign.js'
import RegisterFace from './Screens/CameraRegister'

import Dashboard from './Screens/Dashboard'

 

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';




const AppNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    }
  },
  Sign:{
    screen: Sign,
    navigationOptions: {
      header: null,
    }
  },
  Camera:{
    screen: Camera,
    navigationOptions: {
      header: null,
    }
  },
  RegisterFace:{
    screen: RegisterFace,
    navigationOptions: {
      header: null,
    }
  },
  Login:{
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  LoginUsername: {
    screen: LoginUsername,
    navigationOptions: {
      header: null,
    }
  },
  Dashboard:{
    screen: Dashboard,
    navigationOptions: {
      header: null,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
      /*<View style={{flex:1}}>
        <Camera></Camera>
      </View>*/
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  

    
});


