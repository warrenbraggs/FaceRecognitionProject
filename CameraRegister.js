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

import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';

console.disableYellowBox = true;



export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  };
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={() => this.props.navigation.navigate('MainScreen')}
          >Go back to home
        </Text>
      </View>
    );
  };

  
  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });
        
      if (!pickerResult.cancelled) {
        let prova = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: prova });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}


