// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Alert,
//   ActivityIndicator,
//   Image,
//   PixelRatio,
//   TouchableOpacity,
// } from 'react-native';
// import {Auth, database} from '../../network/config/setup';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { ScrollView } from 'react-native-gesture-handler';

// export default class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       isLoading: false,
//       avatarSource:''
//         };
//   }

//   selectPhotoTapped = () => {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true,
//       },
//     };

//     launchImageLibrary(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         let source = {uri:response.uri};

//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//         this.setState({
//           avatarSource: source,
//         });
//       }
//     });
//   };

//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   };

//   registerUser = () => {
//     if (this.state.email === '' && this.state.password === '') {
//       Alert.alert('Enter details to signup!');
//     } else {
//       this.setState({
//         isLoading: true,
//       });
//       Auth()
//         .createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .then(res => {
//           console.log('Register token===>', res);
//           res.user.updateProfile({
//             displayName: this.state.displayName,

//           });
//           const save = database().ref('users/' + res.user.uid);
//           save.push({
//             name: this.state.displayName,
//             email: this.state.email,
//             photo:this.state.avatarSource
//           });
//           console.log('User registered successfully!');
//           this.setState({
//             isLoading: false,
//             displayName: '',
//             email: '',
//             password: '',
//             avatarSource:''
//           });

//           this.props.navigation.navigate('home');
//         })
//         .catch(error => this.setState({errorMessage: error.message}));
//     }
//   };

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       );
//     }
//     return (
//       <ScrollView contentContainerStyle ={styles.container}>
//         <View style={{flex:0.5, justifyContent: 'center', alignItems: 'center'}}>
//           <TouchableOpacity onPress={this.selectPhotoTapped}>
//             <View style={[styles.avatar, styles.avatarContainer]}>
//               {this.state.avatarSource === '' ? (
//                 <Image
//                   source={require('../../../assets/icons/user.png')}
//                   style={styles.avatar}
//                 />
//               ) : (
//                 <Image
//                   style={styles.avatar}
//                   source={this.state.avatarSource}
//                 />
//               )}
//             </View>
//             <Image
//               source={require('../../../assets/icons/add.png')}
//               style={{
//                 width: 25,
//                 height: 25,
//                 left: 90,
//                 bottom: 35,
//                 tintColor: '#014955',
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Name"
//           value={this.state.displayName}
//           onChangeText={val => this.updateInputVal(val, 'displayName')}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={val => this.updateInputVal(val, 'email')}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={val => this.updateInputVal(val, 'password')}
//           maxLength={15}
//           secureTextEntry={true}
//         />
//         <Button
//           color="#3740FE"
//           title="Signup"
//           onPress={() => this.registerUser()}
//         />

//         <Text
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('login')}>
//           Already Registered? Click here to login
//         </Text>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     padding: 35,
//     backgroundColor: '#fff',
//   },
//   inputStyle: {
//     width: '100%',
//     marginBottom: 15,
//     paddingBottom: 15,
//     alignSelf: 'center',
//     borderColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   loginText: {
//     color: '#3740FE',
//     marginTop: 25,
//     textAlign: 'center',
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   avatarContainer: {
//     borderColor: '#9B9B9B',
//     borderWidth: 1 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     tintColor: '#F4F5F6',
//   },
//   avatar: {
//     borderRadius: 60,
//     width: 120,
//     height: 120,
//     //tintColor:'#F4F5F6'
//   },
// });

import React, {Component,useState} from 'react';
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
  PixelRatio,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {Auth, database, storage} from '../../network/config/setup';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {PLUS, USER} from '../../constants/icons';
import FormButton from '../../components/FormButton';
export default class UserRegister extends Component {

  //const [loading,setLoading] = useState(false)
  //const [email,setEmail] = useState('')
  //const [password,setPassword] = useState('')
  //const [confirm,setConfirmPwd] = useState('')
  //const [displayName,setDisplayName] = useState('')
  //const [avatarSource,setAvatarSource] = useState('')
  //const [enabled,setEnabled] = useState(false)
  //const [uploading,setUploading] = useState(false)
  //const [transferred,setTransferred] = useState(0)
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      displayName: '',
      confirmPwd: '',
      avatarSource: null,
      isEnabled: false,
      uploading: false,
      transferred: 0,
    };
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // const validateEmail = (email) => {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // };

  toggleSwitch = () => {
    this.setState({isEnabled: !this.state.isEnabled});
  };
//  const  toggleSwitch = () => {
   //        setEnabled(!enabled)
  
//   };

  selectPhotoTapped = () => {
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
        //setUploading(true);
        this.setState({uploading: true});
        //setTransferred(0);
        this.setState({transferred: 0});
        const task = storage().ref(filename).putFile(uploadUri);

        // set progress state
        task.on('state_changed', (snapshot) => {});
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        //setUploading(false);
        this.setState({uploading: false});

        await storage()
          .ref(filename)
          .getDownloadURL()
          .then((downloadURL) => {
            console.log('dhfakshkfhsfkdsf', downloadURL);
            this.setState({avatarSource: downloadURL});
          });

        this.setState({avatarSource: this.state.avatarSource});
      }
    });
  };

// functional component

  //const  selectPhotoTapped = () => {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     allowEditing: true,

  //     storageOptions: {
  //       skipBackup: true,
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, async (response) => {
  //     // console.log('Response = ', response.data);

  //     if (response.didCancel) {
  //       console.log('User cancelled photo picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const {uri} = response;
  //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //       const uploadUri =
  //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //       setUploading(true);
  // 
  //       setTransferred(0);
  //       
  //       const task = storage().ref(filename).putFile(uploadUri);

  //       // set progress state
  //       task.on('state_changed', (snapshot) => {});
  //       try {
  //         await task;
  //       } catch (e) {
  //         console.error(e);
  //       }
  //       setUploading(false);
  //      

  //       await storage()
  //         .ref(filename)
  //         .getDownloadURL()
  //         .then((downloadURL) => {
  //           console.log('dhfakshkfhsfkdsf', downloadURL);
  //          
                 //    setAvatarSource(downloadURL)
  //         });

           // setAvatarSource(avatarSource)
  
  //     }
  //   });
  // };


  handleRegister = () => {
    const {displayName, email, password, confirmPwd} = this.state;
    if (!displayName) {
      alert('Name is required');
    } else if (!email) {
      alert('Email is required');
      return true;
    } else if (!this.validateEmail(email)) {
      alert('Please enter valid email');
    } else if (!password) {
      alert('Password is required');
    } else if (password != confirmPwd) {
      alert('Password do not match correctly ');
    } else {
      this.setState({loading: true});

      Auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          // console.log("all response",res)
          if (res.user) {
            res.user
              .updateProfile({
                displayName: this.state.displayName,
                photoURL: this.state.avatarSource,
              })
              .then(async (s) => {
                //  console.log("ye s vala ",s)

                await AsyncStorage.setItem('userLogin', res.user.uid);
                const save = database().ref('users/');
                save.push({
                  uid: res.user.uid,
                  name: this.state.displayName,
                  email: this.state.email,
                  photo: this.state.avatarSource,
                });
                this.props.navigation.navigate('home');
                this.setState({loading: false});
                this.setState({displayName: ''});
                this.setState({email: ''});
                this.setState({password: ''});
                this.setState({confirmPwd: ''});
                this.setState({avatarSource: null});
                this.setState({loading: false});
              });
          }
        })
        .catch(function (error) {
          alert('User has already exit ');
          // this.setState({loading:false})
        });
    }
  };

  //functionl component


//  const  handleRegister = () => {
//    
//     if (!displayName) {
//       alert('Name is required');
//     } else if (!email) {
//       alert('Email is required');
//       return true;
//     } else if (!validateEmail(email)) {
//       alert('Please enter valid email');
//     } else if (!password) {
//       alert('Password is required');
//     } else if (password != confirmPwd) {
//       alert('Password do not match correctly ');
//     } else {
        //  setLoading(true)
//       Auth()
//         .createUserWithEmailAndPassword(email,password)
//         .then((res) => {
//           // console.log("all response",res)
//           if (res.user) {
//             res.user
//               .updateProfile({
//                 displayName:displayName,
//                 photoURL:avatarSource,
//               })
//               .then(async (s) => {
//                 //  console.log("ye s vala ",s)

//                 await AsyncStorage.setItem('userLogin', res.user.uid);
//                 const save = database().ref('users/');
//                 save.push({
//                   uid: res.user.uid,
//                   name:displayName,
//                   email:email,
//                   photo:avatarSource,
//                 });
//                 navigation.navigate('home');
                    //setLoading(false)
                    //  setDisplayName('')
                    //  setEmail('')
                    //  setPassword('')
                    //  setConfirmPwd('')
                    //  setAvatarSource('')
//          
//        
//               });
//           }
//         })
//         .catch(function (error) {
//           alert('User has already exit ');
//           
//         });
//     }
//   };

  render() {
    const {uploading, avatarSource, loading} = this.state;
    const theme = {
      colors: {
        primary: '#ff6a00',
      },
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1, width: '100%'}}>
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 0.2, paddingTop: 20, marginTop: 20}}>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                fontWeight: 'bold',
                paddingLeft: 20,
                letterSpacing: 1,
              }}>
              Create Account,
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'gray',
                fontWeight: '500',
                paddingLeft: 20,
                letterSpacing: 0.5,
              }}>
              Register to get started!
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback
              onPress={this.selectPhotoTapped}>
              <View style={[styles.avatar, styles.avatarContainer]}>
                {this.state.avatarSource == null ? (
                  <Image source={USER} style={styles.avatar} />
                ) : (
                  <Image
                    //source={{uri: this.state.avatarSource}}
                    source={
                      avatarSource && avatarSource ? {uri: avatarSource} : null
                    }
                    style={styles.avatar}
                  />
                )}

                {uploading ? (
                  <View style={styles.progressBarContainer}>
                    <ActivityIndicator animating size="large" color="#ff6a00" />
                  </View>
                ) : null}
              </View>

              <Image
                source={PLUS}
                style={{
                  width: 25,
                  height: 25,
                  left: 90,
                  bottom: 35,
                  tintColor: '#014955',
                }}
              />
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            label="Name"
            style={styles.input}
            value={this.state.displayName}
            theme={theme}
            onChangeText={(displayName) => this.setState({displayName})}
          />

          <TextInput
            label="Email"
            style={styles.input}
            value={this.state.email}
            theme={theme}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />

          <TextInput
            label="Password"
            style={styles.input}
            value={this.state.password}
            theme={theme}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={
              this.state.isEnabled ? !this.state.isEnabled : true
            }
          />

          <TextInput
            label="Confirm Password"
            style={styles.input}
            value={this.state.confirmPwd}
            theme={theme}
            mode="flat"
            onChangeText={(confirmPwd) => this.setState({confirmPwd})}
            secureTextEntry={
              this.state.isEnabled ? !this.state.isEnabled : true
            }
            onSubmitEditing={()=>this.handleRegister()}
          />

          <View style={{flex: 0.2, margin: 10, alignItems: 'flex-end'}}>
            <Switch
              trackColor={{false: '#ccc', true: '#ff6a00'}}
              thumbColor={this.state.isEnabled ? '#ee0979' : '#ddd'}
              ios_backgroundColor="#ccc"
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
            />
          </View>
          <ActivityIndicator size="large" animating={loading} />

          <FormButton buttonTitle="Sign Up" onPress={this.handleRegister} />

          <View style={{flex: 1, height: 50, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', letterSpacing: 2}}>
              Already have an account ?{' '}
              <Text
                onPress={() => this.props.navigation.goBack()}
                style={{color: '#ff6a00'}}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginHorizontal: 30,

    fontSize: 15,
  },
  linarGradient: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  button: {
    flexDirection: 'row',
    height: 50,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 20,
    marginLeft: 10,
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
  avatarContainer: {
    borderColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    tintColor: '#F4F5F6',
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    //tintColor:'#F4F5F6'
  },
  progressBarContainer: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
