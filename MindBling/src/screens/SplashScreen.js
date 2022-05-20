

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Dimensions,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
// import { SPLASHSCREEN } from '../constants/images';




// const {width, height} = Dimensions.get('window');

// const SplashScreen = (props) => {
//   React.useEffect(() => {
//     setTimeout(() => {
//       goToHome();
//     }, 3000);
//   });

//   const goToHome = async() => {
//      const userLogin = await AsyncStorage.getItem('userLogin')
  

//     if(userLogin){
//       console.log("userLogin===>",userLogin)
//       props.navigation.replace('home')
      
//     }
//     else{
//       console.log("signin")
//       props.navigation.replace('phoneAuth')
//     }

//   };

//   // const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//        {/* <View style={{width:50,height:50,elevation:3,backgroundColor:'#ddd',justifyContent:'center',alignItems:'center'}}>
//        <ActivityIndicator size = "small" color="#ff6a00"/>
//        </View>
//      */}
//       <ImageBackground
//         style={styles.splash}
//         source={SPLASHSCREEN}
//       />
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   splash: {
//     width,
//     height,
//   },
// });




import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';




const {width, height} = Dimensions.get('window');

const SplashScreen = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      // goToHome();
    }, 3000);
  });

    const goToHome = async() => {
     const userLogin = await AsyncStorage.getItem('userLogin')
  

    if(userLogin){
       console.log("userLogin===>",userLogin)
      props.navigation.replace('home')
      
    }
    else{
       console.log("signin")
      props.navigation.replace('phoneAuth')
    }

  };


  return (
    <View style={styles.container}>
      <StatusBar hidden />
       <View style={{width:50,height:50,elevation:3,backgroundColor:'#ddd',justifyContent:'center',alignItems:'center'}}>
       <ActivityIndicator size = "small" color="#ff6a00"/>
       </View>
    
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  splash: {
    width,
    height,
  },
});
