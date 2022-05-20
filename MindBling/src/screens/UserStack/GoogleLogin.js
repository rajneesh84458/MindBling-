import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
  ActivityIndicator,

} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import {Auth, firebase} from '../../network/config/setup';

import SocialButton from '../../components/SocialButton';





export default function GoogleLogin({navigation}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);





  useEffect(() => {
      //  unsubscribe()
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        '526492200837-vnu6uico7lcpkujd34b173p4a0tsqvbs.apps.googleusercontent.com',
    });
   
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    //setGettingLoginStatus(false);
    setLoggedIn(false);
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //this.setState({ userInfo });
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        //this.setState({ loggedIn: false });
        setLoggedIn(false);
      } else {
        // some other error
        //this.setState({ loggedIn: false });
        setLoggedIn(false);
      }
    }
  };

  const _signIn = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo: userInfo, loggedIn: true });
       console.log('Google info==>', userInfo);
      setUserInfo(userInfo);
      setLoggedIn(true);

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
         console.log('firebase credential==>', credential),
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      console.log('login with firebase', firebaseUserCredential.user.uid);
      await AsyncStorage.setItem(
        'googleLogin',
        JSON.stringify(userInfo),
      );
      console.log('firebaseUserCreditental====>', firebaseUserCredential);
      navigation.navigate('home');
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  // const unsubscribe = Auth().onAuthStateChanged(authUser=>{
  //      console.log("Login check User==>",authUser)
  //     if(authUser){
  //        navigation.replace('home')
  //     }
  //      return unsubscribe;
  // })
  const theme = {
    colors: {
      primary: '#ff6a00',
    },
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>

 
      <View style={{marginTop: 30}}>
        <ActivityIndicator size="large" animating={loading} />

       
        <SocialButton buttonTitle="Sign In with Google" onPress={_signIn} />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginHorizontal: 30,
    paddingVertical: 8,
  },
  linarGradient: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  button: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  heading: {
    paddingLeft: 28,
    fontSize: 17,
    color: 'black',
    fontWeight: '200',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },

  forgot: {
    padding: 10,
    fontSize: 35,
    color: 'black',
    marginLeft: 10,
    //fontWeight: '100',
    fontStyle: 'italic',
  },
  icon: {
    padding: 30,
    paddingTop: 40,
    alignSelf: 'flex-end',
  },
  passwordStyle: {
    fontSize: 35,
    color: 'black',
    marginLeft: 10,
    fontWeight: '600',
  },
  inputForgot: {
    fontSize: 20,

    marginLeft: 10,
    color: 'blue',
    paddingVertical: 8,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
  Resetbutton: {
    marginHorizontal: 50,
    padding: 10,
    backgroundColor: '#ff5d5b',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
