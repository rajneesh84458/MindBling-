import React,{useEffect} from 'react'
import {StatusBar} from 'react-native'
import Router from '../src/navigation/Router';
// import SplashScreen from 'react-native-splash-screen'
export default function App() {

  // useEffect(()=>{
  //   setTimeout(() => SplashScreen.hide() , 3000);
  // },[])
  return (
    <>
        <StatusBar barStyle ="dark-content" translucent backgroundColor ="transparent"/>
            <Router />
         </>
  )
}

// import React, {useState, useRef} from 'react';
// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import ImagePicker from 'react-native-image-picker';

// const Bottom = () => {
//   const [avatarSource, setAvatarSource] = useState('');
//   const refRBSheet = useRef();

//   const launchCamera = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.launchCamera(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         console.log('response', JSON.stringify(response));
//         setAvatarSource(response.uri);
//       }
//     });
//     refRBSheet.current.close();
//   };

//   const launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.launchImageLibrary(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         console.log('response', JSON.stringify(response));
//         setAvatarSource(response.uri);
//       }
//     });

//     refRBSheet.current.close();
//   };

//   const renderFileUri = () => {
//     if (avatarSource) {
//       return (
//         <Image
//           source={{uri: avatarSource}}
//           style={{
//             width: 150,
//             height: 150,
//             borderColor: 'black',
//             borderWidth: 1,
//             marginHorizontal: 3,
//           }}
//         />
//       );
//     } else {
//       return (
//         <Image
//           source={require('../assets/icons/add.png')}
//           style={{
//             width: 150,
//             height: 150,
//             borderColor: 'black',
//             borderWidth: 1,
//             marginHorizontal: 3,
//           }}
//         />
//       );
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <TouchableOpacity
//         activeOpacity={1}
//         // onPress={() => Standard.open()}
//         onPress={() => refRBSheet.current.open()}
//         style={{
//           height: 40,
//           width: 150,
//           marginVertical: 50,
//           justifyContent: 'center',
//           alignItems: 'center',
//           alignSelf: 'center',
//           backgroundColor: '#Aca545',
//           borderRadius: 10,
//         }}>
//         <Text style={{fontSize: 20}}>Open</Text>
//       </TouchableOpacity>

//       <View
//         style={{
//           paddingHorizontal: 8,
//           paddingVertical: 8,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <View>
//           {renderFileUri()}
//           <Text style={{textAlign: 'center'}}>File Uri</Text>
//         </View>
//       </View>

//       <RBSheet
//         // ref={ref => {
//         //    Standard = ref;
//         // }}
//         ref={refRBSheet}
//         height={300}
//         openDuration={250}
//         customStyles={{
//           container: {
//             justifyContent: 'flex-start',
//             alignItems: 'flex-start',
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//           },
//         }}>
//         <Text
//           style={{
//             fontSize: 20,
//             padding: 20,
//             color: 'gray',
//             marginVertical: 15,
//           }}>
//           Select an option
//         </Text>

//         <View style={{height: 60, width: '100%', flexDirection: 'row'}}>
//           <Icon
//             onPress={launchCamera}
//             name="camera"
//             size={25}
//             color="gray"
//             style={{marginHorizontal: 20}}
//           />
//           <Text style={{fontSize: 18, paddingLeft: 30, color: 'gray'}}>
//             Open Camera
//           </Text>
//         </View>

//         <View style={{height: 60, width: '100%', flexDirection: 'row'}}>
//           <Icon
//             onPress={launchImageLibrary}
//             name="photo"
//             size={25}
//             color="gray"
//             style={{marginHorizontal: 20}}
//           />
//           <Text style={{fontSize: 18, paddingLeft: 30, color: 'gray'}}>
//             Open Gallery
//           </Text>
//         </View>
//       </RBSheet>
//     </View>
//   );
// };

// export default Bottom;
