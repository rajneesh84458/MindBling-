// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// export default class Testfile extends Component {



//   //  goToHome = async() => {
//   //   const userLogin = await AsyncStorage.getItem('userLogin')
//   //   const trainerLogin = await AsyncStorage.getItem('trainerLogin')
//   //   console.log("userLogin======>",userLogin)
//   //   console.log("trainerLogin======>",trainerLogin)
//   //   Auth().onAuthStateChanged(user => {
//   //     console.log("user==>",user)
//   //              if(userLogin){
//   //                 navigation.replace('drawer')
//   //              }
//   //              else if (trainerLogin){
//   //               navigation.replace('trainerHome')
//   //              }
//   //              else{
//   //               navigation.replace('choose');
//   //              }
     
//   //   });
//   // }
//   render() {
//     return (
//       <View style={{flex:1}}>
//         <TouchableOpacity onPress ={this.chooseFile}
//         style={{flex:0.2}}>
//         <Text> choose file </Text>
//         </TouchableOpacity>
      
//       </View>
//     )
//   }
// }




import React from 'react'
import { View, Text ,TouchableOpacity} from 'react-native'
import DocumentPicker from 'react-native-document-picker';
export default function Testfile() {

 // Pick a single file
  const chooseFile = async() =>{
   
try {
  const res = await DocumentPicker.pick({
    type: [DocumentPicker.types.images],
  });
  console.log(
    res.uri,
    res.type, // mime type
    res.name,
    res.size
  );
} catch (err) {
  if (DocumentPicker.isCancel(err)) {
    // User cancelled the picker, exit any dialogs or menus and move on
  } else {
    throw err;
  }
}

  }
  return (
    <View style={{flex:1}}>
        <TouchableOpacity onPress ={chooseFile}
        style={{flex:0.2}}>
        <Text> choose file </Text>
        </TouchableOpacity>
      
      </View>
  )
}



//custom drawer

// const HomeStack = createStackNavigator();
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="home"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//     </HomeStack.Navigator>
//   );
// }

// function CustomDrawerContent() {

//   return (
//     <LinearGradient
//       start={{x: 0, y: 1}}
//       end={{x: 1, y: 0}}
//       colors={['#001871', '#41b6e6']}
//       style={styles.gradient}>
      
//       <ScrollView
//         contentContainerStyle={{
//           flex: 1,

//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//           <View
//           style={{
//             flex: 0.2,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingTop: 40,
//           }}>
        
//         </View>

//         <TouchableOpacity
//            onPress={() => alert('addded soon..')}
//           style={styles.menuStyle}>
//           <Image
//             source={require('../../assets/icons/edit.png')}
//             style={styles.iconStyle}
//           />
//           <Text style={styles.iconText}> Edit the Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => alert('addded soon..')}
//           style={styles.menuStyle}>
//           <Image
//             source={require('../../assets/icons/about.png')}
//             style={styles.iconStyle}
//           />
//           <Text style={styles.iconText}> About the App </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={myCustomShare} style={styles.menuStyle}>
//           <Image
//             source={require('../../assets/icons/share.png')}
//             style={styles.iconStyle}
//           />
//           <Text style={styles.iconText}> Share the App </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogOut} style={styles.menuStyle}>
//           <Image
//             source={require('../../assets/icons/logout.png')}
//             style={styles.iconStyle}
//           />
//           <Text style={styles.iconText}> Logout the App</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// }


// const handleLogOut = () => {

//   Alert.alert(
//     'Logout',
//     'Are you sure to log out',
//     [
//       {
//         text: 'Yes',
//         onPress: () => signOut,
//       },
//       {
//         text: 'No',
//       },
//     ],
//     {cancelable: false},
//   )
// }

// const signOut = async() => {
//   try {
//     await AsyncStorage.clear();
//     Alert.alert('Logout Success!');
//     navigation.replace('login');
//   } catch (error) {
//     console.log('AsyncStorage error: ' + error.message);
//   }
//                }
// const myCustomShare = async () => {
//   try {
//     const result = await Share.share({
//       message:
//         'Hey, would like you use SOS application , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
//     });

//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// };

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerType="back"
//       initialRouteName="Home"
//       drawerContent={props => CustomDrawerContent(props)}>
//       <Drawer.Screen
//         name="home"
//         component={HomeStackScreen}
//         options={{swipeEnabled: true}}
//       />
//     </Drawer.Navigator>
//   );
// }
