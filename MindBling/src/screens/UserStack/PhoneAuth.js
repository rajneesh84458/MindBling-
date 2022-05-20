// import React, {Component} from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Pressable,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';

// import {Auth, database, messaging, storage} from '../../network/config/setup';
// import Icon from 'react-native-vector-icons/Entypo';

// import ImagePicker from 'react-native-image-picker';
// import {PHONE, PLUS, PROFILE, USER} from '../../constants/icons';

// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-community/async-storage';

// import FormButton from '../../components/FormButton';

// const {width, height} = Dimensions.get('window');

// export default class PhoneAuthScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.unsubscribe = null;
//     this.state = {
//       uploading: false,
//       transferred: 0,
//       user: null,
//       message: '',
//       codeInput: '',
//       phoneNumber: '+91',
//       confirmResult: null,
//       name: null,
//       id: null,
//       avatarSource: null,
//       loading:false,
//       notifyToken: null,
//     };
//   }

//   componentDidMount() {
//     messaging()
//       .getToken()
//       .then((fcmToken) => {
//         if (fcmToken) {
//           this.setState({notifyToken: fcmToken});
//           console.log('token====>', fcmToken);
//           // user has a device token
//         } else {
//           // user doesn't have a device token yet
//         }
//       });
//   }

//   selectPhotoTapped = () => {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       allowEditing: true,

//       storageOptions: {
//         skipBackup: true,
//       },
//     };

//     ImagePicker.showImagePicker(options, async (response) => {
//       // console.log('Response = ', response.data);

//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const {uri} = response;
//         const filename = uri.substring(uri.lastIndexOf('/') + 1);
//         const uploadUri =
//           Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//         //setUploading(true);
//         this.setState({uploading: true});
//         //setTransferred(0);
//         this.setState({transferred: 0});
//         const task = storage().ref(filename).putFile(uploadUri);

//         // set progress state
//         task.on('state_changed', (snapshot) => {});
//         try {
//           await task;
//         } catch (e) {
//           console.error(e);
//         }
//         //setUploading(false);
//         this.setState({uploading: false});

//         await storage()
//           .ref(filename)
//           .getDownloadURL()
//           .then((downloadURL) => {
//             console.log('dhfakshkfhsfkdsf', downloadURL);
//             this.setState({avatarSource: downloadURL});
//           });

//         // this.setState({avatarSource: this.state.avatarSource});
//       }
//     });
//   };

//   validatePhoneNumber = () => {
//     var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
//     return regexp.test(this.state.phoneNumber);
//   };

//   signIn = () => {
//     if (this.validatePhoneNumber()) {
//       this.setState({loading: true});
//       Auth()
//         .signInWithPhoneNumber(this.state.phoneNumber)
//         .then((confirmResult) => {
//           console.log("confirmResult ",confirmResult)
//           this.setState({confirmResult});
//         })
//         .catch((error) => {
//           Alert.alert(error.message);

//           // console.log(error)
//         });
//     } else {
//       Alert.alert('Invalid Phone Number');
//     }
//   };

//   confirmCode = async () => {
//     const {codeInput, confirmResult, name} = this.state;

//     if (confirmResult && codeInput.length) {
//       confirmResult
//         .confirm(codeInput)
//         .then(async(user) => {
//           this.setState({loading: true});

//            console.log('cofirm user', user);
//           // console.log('display user', user.user._user);
//           await AsyncStorage.setItem(
//             'userLogin',
//             JSON.stringify({
//               userid: user.user._user.uid,
//               username: this.state.name,
//               userPhoto: this.state.avatarSource,
//               notifyToken: this.state.notifyToken,
//             }),
//           );
//           // this.props.navigation.navigate('home');

//           this.setState({message: 'Code Confirmed!'});
//           const saveProfile = database().ref(`users/${Auth().currentUser.uid}`);
//           saveProfile.set({
//             notifyToken: this.state.notifyToken,
//             uid: user.user._user.uid,
//             displayName: name,
//             photo: this.state.avatarSource,
//             mobile: this.state.phoneNumber,
//           });
//         })
//         //
//         .catch((error) =>
//           // this.setState({message: `Code Confirm Error: ${error.message}`}),
//           // this.setState({loading:false})
//           Alert.alert('Invalid code'),
//         );
//     }
//   };

//   renderPhoneNumberInput() {
//     const {phoneNumber, name, avatarSource, uploading, loading} = this.state;

//     return (
//       <ScrollView
//         keyboardShouldPersistTaps="always"
//         contentContainerStyle={{flex: 1}}>

//         <Pressable
//           style={[styles.avatar, styles.avatarContainer]}
//           onPress={this.selectPhotoTapped}>
//           {this.state.avatarSource == null ? (
//             <Image source={PROFILE} style={styles.avatar} />
//           ) : (
//             <Image
//               //source={{uri: this.state.avatarSource}}
//               source={avatarSource && avatarSource ? {uri: avatarSource} : null}
//               style={styles.avatar}
//             />
//           )}

//           {uploading ? (
//             <View style={styles.progressBarContainer}>
//               <ActivityIndicator size="small" color="#ff6a00" />
//             </View>
//           ) : null}

//           <Image
//             source={PLUS}
//             style={{
//               width: 25,
//               height: 25,
//               left: 44,
//               bottom: 35,
//               tintColor: '#014955',
//               alignSelf: 'center',
//             }}
//           />
//         </Pressable>

//         <View
//           style={{
//             flexDirection: 'row',
//             borderWidth: 0.5,
//             borderColor: '#ccc',
//             margin: 10,
//             borderRadius: 30,
//             padding: 5,
//             marginHorizontal: 30,
//             marginTop: 30,
//           }}>
//           <Icon
//             name="user"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//           <TextInput
//             placeholder="Name"
//             underlineColorAndroid={'transparent'}
//             value={this.state.name}
//             onChangeText={(value) => this.setState({name: value})}
//             keyboardType="default"
//             underlineColorAndroid="transparent"
//             //   mode="outlined"
//             style={styles.textinput}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderWidth: 0.5,
//             borderColor: '#ccc',
//             margin: 10,
//             borderRadius: 30,
//             padding: 5,
//             marginHorizontal: 30,
//             marginTop: 10,
//           }}>
//           <Icon
//             name="mobile"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//           <TextInput
//             placeholder="+919876544323"
//             underlineColorAndroid={'transparent'}
//             value={phoneNumber}
//             onChangeText={(value) => this.setState({phoneNumber: value})}
//             keyboardType="phone-pad"
//             underlineColorAndroid="transparent"
//             //   mode="outlined"
//             style={styles.textinput}
//           />
//         </View>

//         <Pressable onPress={() => this.signIn()} style={[styles.button]}>
//           <LinearGradient
//             start={{x: 0, y: 1}}
//             end={{x: 1, y: 0}}
//             //locations={[0, 0.5]}
//             colors={['#ee0979', '#ff6a00']}
//             style={[styles.button, {flexDirection: 'row'}]}>
//             <Image
//               source={PHONE}
//               style={{height: 20, width: 20, tintColor: '#fff'}}
//             />

//             <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>
//               SignIn with Phone Number
//             </Text>
//           </LinearGradient>
//         </Pressable>
//         <View style={loading ? styles.modalMain : null}>
//           <ActivityIndicator size="large" color="#000" animating={loading} />
//         </View>

//       </ScrollView>
//     );
//   }

//   renderMessage() {
//     const {message} = this.state;

//     if (!message.length) return null;

//     return (
//       <Text style={{padding: 5, backgroundColor: '#000', color: '#fff'}}>
//         {message}
//       </Text>
//     );
//   }

//   renderVerificationCodeInput() {
//     const {codeInput, phoneNumber, loading} = this.state;

//     return (
//       <View style={{backgroundColor: 'white'}}>
//         <Text style={styles.heading}> Code is sent to {phoneNumber}</Text>

//         <View style={loading ? loading : null}>
//             {/* <ActivityIndicator
//               size="large"
//               color="#000"
//               animating={loading}
//             /> */}

//           </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             borderWidth: 0.5,
//             borderColor: '#ccc',
//             margin: 10,
//             borderRadius: 30,
//             padding: 5,
//             marginHorizontal: 30,
//             marginTop: 10,
//           }}>
//           <Icon
//             name="mobile"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//           <TextInput
//             autoFocus={true}
//             // mode="outlined"
//             // theme={theme}
//             style={styles.textInput}
//             placeholder="Verification code"
//             placeholderTextColor="#eee"
//             value={codeInput}
//             keyboardType="numeric"
//             onChangeText={(value) => this.setState({codeInput: value})}
//             maxLength={6}
//             style={styles.textinput}
//           />
//         </View>

//         <FormButton
//           buttonTitle="Verify and Create Account"
//           onPress={this.confirmCode}
//         />
//       </View>
//     );
//   }

//   render() {
//     const {user, confirmResult,loading} = this.state;
//     return (
//       // <KeyboardAvoidingView style={styles.container} behavior={Platform.OS ==='android' ? 20 :'padding'} enabled>
//       <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
//         {!user && !confirmResult && this.renderPhoneNumberInput()}

//         {this.renderMessage()}

//         {!user && confirmResult && this.renderVerificationCodeInput()}
//       </ScrollView>
//     );
//   }
// }

//  const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//     },
//     textinput: {
//       backgroundColor: '#fff',
//       fontFamily: 'BalsamiqSans-Regular',
//       width: 225,
//     },

//     avatarContainer: {
//       paddingTop: 25,
//       borderRadius: 140,
//       width: width * 0.4,
//       height: width * 0.4,
//       // backgroundColor:'#ddd',
//       // borderWidth: 0,
//       justifyContent: 'center',
//       alignItems: 'center',
//       alignSelf: 'center',
//       marginTop: 50,
//       tintColor: '#F4F5F6',
//       // elevation:5,
//     },
//     avatar: {
//       borderRadius: 120,
//       width: width * 0.3,
//       height: width * 0.3,

//       //tintColor:'#F4F5F6'
//     },

//     textInput: {
//       width: '85%',
//       height: 60,
//       alignSelf: 'center',
//       borderBottomColor: '#17223b',
//       borderBottomWidth: StyleSheet.hairlineWidth,
//       // borderRadius: 5,
//       // paddingVertical:2,
//       fontSize: 22,

//       backgroundColor: '#fff',
//       // letterSpacing: 2,
//     },
//     progressBarContainer: {
//       marginTop: 0,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },

//     heading: {
//       textAlign: 'center',
//       padding: 30,
//       fontSize: 20,
//       color: 'gray',
//       fontWeight: 'bold',
//       //  letterSpacing:3,
//     },
//     button: {
//       height: 50,
//       width: '95%',
//       borderRadius: 10,
//       alignSelf: 'center',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginVertical: 18,
//     },
//     modalMain: {
//       flex:1,
//       backgroundColor: 'rgba(52, 52, 52, 0.8)',
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Button,
  Platform,
  Alert,
} from 'react-native';

import {Auth, database, messaging, storage} from '../../network/config/setup';
import Icon from 'react-native-vector-icons/Entypo';

import ImagePicker from 'react-native-image-picker';
import {PHONE, PLUS, PROFILE, USER} from '../../constants/icons';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import FormButton from '../../components/FormButton';



const {width, height} = Dimensions.get('window');


export default function PhoneAuthScreen() {
  // If null, no SMS has been sent
  const [name, setname] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setphoneNumber] = useState('+91 ');
  const [code, setCode] = useState('');
  const [avatarSource, setAvatarSource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
const [verifyLoader ,setVerifyLoader] = useState(false)

  // useEffect(()=>{
  //   messaging()
  //         .getToken()
  //         .then((fcmToken) => {
  //           if (fcmToken) {
  //             this.setState({notifyToken: fcmToken});
  //             console.log('token====>', fcmToken);
  //             // user has a device token
  //           } else {
  //             // user doesn't have a device token yet
  //           }
  //         });
  // },[])
   const  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      allowEditing: true,

      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      // console.log('Response = ', response.data);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {uri} = response;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
         setTransferred(0);
        
        const task = storage().ref(filename).putFile(uploadUri);

        // set progress state
        task.on('state_changed', (snapshot) => {});
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        setUploading(false);
      

        await storage()
          .ref(filename)
          .getDownloadURL()
          .then((downloadURL) => {
            console.log('dhfakshkfhsfkdsf', downloadURL);
            setAvatarSource(downloadURL)
          //  this.setState({avatarSource: downloadURL});
          });

        // this.setState({avatarSource: this.state.avatarSource});
      }
    });
  };

  
 const  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(phoneNumber);
  }
  const signIn = () => {
    if (validatePhoneNumber()) {
      setLoading(true)
      
    Auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        console.log('confirmResult ', confirmResult);
        setConfirm(confirmResult);
      })
      .catch(error => {
        Alert.alert(error.message);

        // console.log(error)
      });
    } else {
            Alert.alert('Invalid Phone Number');
          }
  };



  const confirmCode = async () => {
      
      if (confirm) {
          confirm
            .confirm(code)
            .then(async(user) => {
              setVerifyLoader(true)
              
    
               console.log('cofirm user', user);
              // console.log('display user', user.user._user);
              await AsyncStorage.setItem(
                'userLogin',
                JSON.stringify({
                  userid: user.user._user.uid,
                  username: name,
                  userPhoto: avatarSource,
                  // notifyToken: this.state.notifyToken,
                }),
              );
              // this.props.navigation.navigate('home');
    
              // this.setState({message: 'Code Confirmed!'});
              const saveProfile = database().ref(`users/${Auth().currentUser.uid}`);
              saveProfile.set({
                // notifyToken: this.state.notifyToken,
                uid: user.user._user.uid,
                displayName: name,
                photo: avatarSource,
                mobile: phoneNumber,
              });
            })
            //
            .catch((error) =>
              // this.setState({message: `Code Confirm Error: ${error.message}`}),
              // this.setState({loading:false})
              setLoading(false)
              // Alert.alert('Invalid code'),
            );
        }
      };
  if (!confirm) {
    return (
    
      <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{flex: 1,backgroundColor:'#fff'}}>
      
              <TouchableOpacity
                style={[styles.avatar, styles.avatarContainer]}
                onPress={()=>selectPhotoTapped()}
                >
                {avatarSource == null ? (
                  <Image source={PROFILE} style={styles.avatar} />
                ) : (
                  <Image
                    //source={{uri: avatarSource}}
                    source={avatarSource && avatarSource ? {uri: avatarSource} : null}
                    style={styles.avatar}
                  />
                )}
      
                {uploading ? (
                  <View style={styles.progressBarContainer}>
                    <ActivityIndicator size="small" color="#ff6a00" />
                  </View>
                ) : null}
      
                <Image
                  source={PLUS}
                  style={{
                    width: 25,
                    height: 25,
                    left: 44,
                    bottom: 35,
                    tintColor: '#014955',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
      
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderColor: '#ccc',
                  margin: 10,
                  borderRadius: 30,
                  padding: 5,
                  marginHorizontal: 30,
                  marginTop: 30,
                }}>
                <Icon
                  name="user"
                  size={27}
                  color="#ff6a00"
                  style={{padding: 10, marginLeft: 10}}
                />
                <TextInput
                  placeholder="Name"
                  underlineColorAndroid={'transparent'}
                  value={name}
                  onChangeText={(value) => setname(value)}
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  //   mode="outlined"
                  style={styles.textinput}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderColor: '#ccc',
                  margin: 10,
                  borderRadius: 30,
                  padding: 5,
                  marginHorizontal: 30,
                  marginTop: 10,
                }}>
                <Icon
                  name="mobile"
                  size={27}
                  color="#ff6a00"
                  style={{padding: 10, marginLeft: 10}}
                />
                <TextInput
                 
                  underlineColorAndroid={'transparent'}
                  value={phoneNumber}
                  onChangeText={(value) => setphoneNumber(value)}
                  keyboardType="phone-pad"
                  underlineColorAndroid="transparent"
                
                  style={styles.textinput}
                />
              </View>
      
              <TouchableOpacity onPress={() => signIn()} style={[styles.button]}>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  //locations={[0, 0.5]}
                  colors={['#ee0979', '#ff6a00']}
                  style={[styles.button, {flexDirection: 'row'}]}>
                  <Image
                    source={PHONE}
                    style={{height: 20, width: 20, tintColor: '#fff'}}
                  />
      
                  <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>
                    SignIn with Phone Number
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={loading ? styles.modalMain : null}>
                <ActivityIndicator size="large" color="#000" animating={loading} />
              </View>
      
            </ScrollView>
    );
  }

  return (
    <>
     
      <View style={{backgroundColor: 'white'}}>
         <Text style={styles.heading}> Code is sent to {phoneNumber}</Text>

        
            
<ActivityIndicator
              size="small"
              color="#000"
              animating={verifyLoader}
            />
          

         <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: '#ccc',
            margin: 10,
            borderRadius: 30,
            padding: 5,
            marginHorizontal: 30,
            marginTop: 10,
          }}>
          <Icon
            name="mobile"
            size={27}
            color="#ff6a00"
            style={{padding: 10, marginLeft: 10}}
          />
          <TextInput
            autoFocus={true}
            // mode="outlined"
            // theme={theme}
            style={styles.textInput}
            placeholder="Verification code"
            placeholderTextColor="#eee"
            value={code}
            keyboardType="numeric"
            onChangeText={(value) =>setCode(value)}
            maxLength={6}
            style={styles.textinput}
          />
        </View>

    
      </View>
      
      <TouchableOpacity  onPress={() => confirmCode()} style={[styles.button]}>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  //locations={[0, 0.5]}
                  colors={['#ee0979', '#ff6a00']}
                  style={[styles.button, {flexDirection: 'row'}]}>
                  <Image
                    source={PHONE}
                    style={{height: 20, width: 20, tintColor: '#fff'}}
                  />
      
                  <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>
                   Create Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

     
    </>
  );
}


 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    textinput: {
      backgroundColor: '#fff',
      fontFamily: 'BalsamiqSans-Regular',
      width: 225,
    },

    avatarContainer: {
      paddingTop: 25,
      borderRadius: 140,
      width: width * 0.4,
      height: width * 0.4,
      // backgroundColor:'#ddd',
      // borderWidth: 0,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 50,
      tintColor: '#F4F5F6',
      // elevation:5,
    },
    avatar: {
      borderRadius: 120,
      width: width * 0.3,
      height: width * 0.3,

      //tintColor:'#F4F5F6'
    },

    textInput: {
      width: '85%',
      height: 60,
      alignSelf: 'center',
      borderBottomColor: '#17223b',
      borderBottomWidth: StyleSheet.hairlineWidth,
      // borderRadius: 5,
      // paddingVertical:2,
      fontSize: 22,

      backgroundColor: '#fff',
      // letterSpacing: 2,
    },
    progressBarContainer: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    heading: {
      textAlign: 'center',
      padding: 30,
      fontSize: 20,
      color: 'gray',
      fontWeight: 'bold',
      //  letterSpacing:3,
    },
    button: {
      height: 50,
      width: '95%',
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 18,
    },
    modalMain: {
      flex:1,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });