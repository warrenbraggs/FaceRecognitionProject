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
import * as firebase from 'firebase';

console.disableYellowBox = true;



export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    uId: 'ciao',
  };

  
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  componentDidMount()
  {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user !=null)
      {
        this.setState({uId: user.uid})
      }
    })

  }
  ur(){
    
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        

        <Button onPress={this._takePhoto} title="VERIFY" />

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
      console.log("pickerResult",pickerResult);
      if (!pickerResult.cancelled) {
        let prova = await uploadImageAsync(pickerResult.uri,this.state.uId);
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


confidenceMethod = async => {
  this.props.navigation.navigate('Dashboard');
}

async function uploadImageAsync(uri,uid) {
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
  .child('Utenti/ ' + uid + '/Image1');

  const ref1 = firebase
  .storage()
  .ref()
  .child('Utenti/ ' + uid + '/Image');

  const snapshot = await ref.put(blob);

let formData = new FormData();
formData.append('api_key', '0U6kvuNRGOt8NUdhL54CUwu2IqJ9jULv');
formData.append('api_secret', 'Axr2N1WqPPr1pEChT-pJLdxIPu_90WXT');
formData.append('image_url1', await ref1.getDownloadURL());
formData.append('image_url2', await snapshot.ref.getDownloadURL()); // da cambiare


  

  const response = await fetch(
    'https://api-us.faceplusplus.com/facepp/v3/compare',
    {
      method:"POST",
      body:formData
    }
    ).then((response)=>response.json())
    .then((json) => {
      console.log(json.confidence);
      if(parseFloat(json.confidence) > 90){
        this.confidenceMethod();
        console.log("UR TUTTO OKKKKKKKKKKKKKKKKKK?");
      }
     })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACE ')
    })

    blob.close();


return await ref.getDownloadURL();
}


