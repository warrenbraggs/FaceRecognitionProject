import * as firebase from 'firebase';
  const firebaseConfig={
      apiKey: "AIzaSyA3Zc9eS49PSwmxsbW6mPZRLy9hvFCgCfc",
      authDomain: "face-recognition-d77ee.firebaseapp.com",
      databaseURL: "https://face-recognition-d77ee.firebaseio.com",
      projectId: "face-recognition-d77ee",
      storageBucket: "face-recognition-d77ee.appspot.com",
      messagingSenderId: "422037729933"
  };
  const fire=firebase.initializeApp(firebaseConfig);
  export default  fire;