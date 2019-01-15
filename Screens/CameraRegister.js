/*import React ,{Component} from 'react';
import {Alert, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {Camera, Permissions} from 'expo'
import MainScreen from 'Login/Screens/MainScreen'


export default class CameraComponent extends React.Component {
    
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front
    }

    async componentWillMount(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === "granted"})
    }

    snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
        }
      };


  render() {
    const {hasCameraPermission} = this.state;

    if(hasCameraPermission === null){
        return <View/>
    }
    else if(hasCameraPermission === false){
        return <Text>No access camera</Text>
    }
    else{
        return(
            <View style={{flex:1}}>
                <Camera style={{flex: 1}} type={this.state.type}>
                    <TouchableOpacity style={styles.buttonContainer}>
                    <View style={styles.ButtonContainer}  >
                        <View style={styles.outerCircle} >
                            <View style={styles.innerCircle} />
                            <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('MainScreen')} >NEXT</Text>
                        </View>
                    </View>
                        
                    </TouchableOpacity>
                    
                </Camera>
            </View>

            
            
        )
    }
        
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute',
    bottom:'-80%',

  },
outerCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: 'white',
  },
  innerCircle: {
    borderRadius: 35,
    width: 70,
    height: 70,
    margin: 5,
  },
  
  
});
*/


import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Expo, { Constants, Permissions, Camera, MediaLibrary } from 'expo';

export default class App extends Component {
  state = {
    rollGranted: false,
    cameraGranted: false,
  };

  componentDidMount() {
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log('Uh oh! The user has not granted us permission.');
    }
    this.getCameraRollPermissions();
  }

  async getCameraRollPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ rollGranted: true });
    } else {
      console.log('Uh oh! The user has not granted us permission.');
      this.setState({ rollGranted: false });
    }
  }

  takePictureAndCreateAlbum = async () => {
    console.log('tpaca');
    const { uri } = await this.camera.takePictureAsync();
    console.log('uri', uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log('asset', asset);
    MediaLibrary.createAlbumAsync(this.props.navigation.getParam('email'), asset)
      .then(() => {
        Alert.alert('Album created!')
      })
      .catch(error => {
        Alert.alert('An Error Occurred!')
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.front}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert('Permissions not granted')
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

