// import React, {useState, useEffect} from 'react';

// import {
//   Dimensions,
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   Image,
//   Platform,
//   Share,
//   Alert,
// } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Auth, dynamicLinks} from '../../network/config/setup';
// const {width, height} = Dimensions.get('window');
// import AsyncStorage from '@react-native-community/async-storage';
// import {
//   EDIT,
//   LOGOUT,
//   SHARE,
//   USER,
//   LEADER,
//   ABOUT,
//   PROFILE,
// } from '../../constants/icons';
// import Icon from 'react-native-vector-icons/Ionicons';
// export default function UserAccount({navigation, route}) {
//   const [displayName, setDisplayName] = useState('');
//   const [photoURL, setPhotoURL] = useState(null);
//   const [key, setKey] = useState('');


//   const shareLinkHandle = async () => {
//     try {
//       const initialLink = await dynamicLinks().getInitialLink();
//       console.log('initialLink', initialLink);

//       if (initialLink.url !== null) {
//         if (initialLink.url === 'https://lifeguruapp.page.link/test') {
//           return alert(initialLink);
//         }
//       }
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getLocalData();
//     shareLinkHandle();
//   }, []);

//   const myCustomShare = async () => {
//     try {
//       const result = await Share.share({
//         message:
//           'Welcome to the LifeGuru application , AppLink :https://lifeguruapp.page.link/test',
//       });

//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   const handleLogOut = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure to log out',
//       [
//         {
//           text: 'Yes',
//           onPress: signOut,
//         },
//         {
//           text: 'No',
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const signOut = async () => {
//     await Auth().signOut();
//     //  .then(async()=>{
//     // try {
//     //   await AsyncStorage.removeItem('userLogin');
//     //   console.log('remove user id');
//     //   //Alert.alert('Logout Success!');
//     //   navigation.replace('phoneAuth');
//     // } catch (error) {
//     //   console.log('AsyncStorage error: ' + error.message);
//     // }

//     //  })
//     //  .catch((error)=>console.log(error)
//     //  )
//   };

//   const getLocalData = async () => {
//     await AsyncStorage.getItem('userLogin')
//       .then((value) => {
//         const user = JSON.parse(value);

//         setDisplayName(user.username);
//         setPhotoURL(user.userPhoto);
//         setKey(user.userid);
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.header}>
//         <Image
//           source={photoURL && photoURL ? {uri: photoURL} : PROFILE}
//           style={styles.imageContainer}
//         />
//         <Text style={{padding: 20, fontSize: 20, fontFamily: 'Lato-Light'}}>
//           {displayName}
//         </Text>
//       </View>
//       <View style={{flex: 1}}>
//         {/* <TouchableOpacity
//           onPress={() => navigation.navigate('userupdate')}
//           style={styles.buttons}>
//           <Text style={styles.iconText}>Edit</Text>
//           <Image source={EDIT} style={styles.iconStyle} />
//         </TouchableOpacity> */}
//         <TouchableOpacity onPress={myCustomShare} style={styles.buttons}>
//           <Text style={styles.iconText}>Share</Text>
//           <Icon
//             name="share-social-outline"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('requestTrainer')}
//           style={styles.buttons}>
//           <Text style={styles.iconText}>Requested Appointments</Text>
//           <Icon
//             name="md-notifications"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Notification')}
//           style={styles.buttons}>
//           <Text style={styles.iconText}>Notifications</Text>
//           <Icon
//             name="notifications-outline"
//             size={27}
//             color="#ff6a00"
//             style={{padding: 10, marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogOut} style={styles.buttons}>
//           <Text style={styles.iconText}>Logout</Text>
//           <Image source={LOGOUT} style={styles.iconStyle} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//   },
//   header: {
//     width: width,
//     height: height * 0.2,

//     flexDirection: 'row',
//     padding: 20,
//   },
//   imageContainer: {
//     width: 100,
//     height: 100,

//     borderRadius: 100 / 2,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//     resizeMode: 'cover',
//     margin: 5,
//     tintColor: '#ff6a00',
//   },
//   iconText: {
//     fontSize: 16,
//     marginLeft: 20,
//     color: '#000',
//     fontFamily: 'Lato-Light',
//   },
//   buttons: {
//     // backgroundColor: '#3399FF',
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     padding: 5,
//   },
// });








import React, {useState, useEffect} from 'react';

import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  Share,
  Alert,TouchableOpacity
} from 'react-native';

import {Auth, dynamicLinks} from '../../network/config/setup';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import {
  EDIT,
  LOGOUT,
  SHARE,
  USER,
  LEADER,
  ABOUT,
  PROFILE,
} from '../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
const UserAccount = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const [key, setKey] = useState('');


  const handleLogOut = () => {
        Alert.alert(
          'Logout',
          'Are you sure to log out',
          [
            {
              text: 'Yes',
              onPress: signOut,
            },
            {
              text: 'No',
            },
          ],
          {cancelable: false},
        );
      };
    
      const signOut = async () => {
        await Auth().signOut();
        console.log("logout sucesss....")
        
      };



        useEffect(() => {
    getLocalData();
    shareLinkHandle();
  }, []);


    const shareLinkHandle = async () => {
    try {
      const initialLink = await dynamicLinks().getInitialLink();
      console.log('initialLink', initialLink);

      if (initialLink.url !== null) {
        if (initialLink.url === 'https://lifeguruapp.page.link/test') {
          return alert(initialLink);
        }
      }
    } catch (error) {}
  };
  const myCustomShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Welcome to the MindBling application , AppLink :https://mindbling.page.link/peoples_v1',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
 
  const getLocalData = async () => {
    await AsyncStorage.getItem('userLogin')
      .then((value) => {
        const user = JSON.parse(value);

        setDisplayName(user.username);
        setPhotoURL(user.userPhoto);
        setKey(user.userid);
        // alert(`${user.username} ${user.userid}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
   
      <View style={styles.container}>
         
       <View style={styles.header}>
         <Image
          source={photoURL && photoURL ? {uri: photoURL} : PROFILE}
          style={styles.imageContainer}
        />
        <Text style={{padding: 20, fontSize: 20, fontFamily: 'Lato-Light'}}>
          {displayName}
        </Text>
      </View>
      <View style={{flex: 1}}>
    
        <TouchableOpacity onPress={myCustomShare} style={styles.buttons}>
          <Text style={styles.iconText}>Share</Text>
          <Icon
            name="share-social-outline"
            size={27}
            color="#ff6a00"
            style={{padding: 10, marginLeft: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('requestTrainer')}
          style={styles.buttons}>
          <Text style={styles.iconText}>Requested Appointments</Text>
          <Icon
            name="md-notifications"
            size={27}
            color="#ff6a00"
            style={{padding: 10, marginLeft: 10}}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={styles.buttons}>
          <Text style={styles.iconText}>Notifications</Text>
          <Icon
            name="notifications-outline"
            size={27}
            color="#ff6a00"
            style={{padding: 10, marginLeft: 10}}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>handleLogOut()} style={styles.buttons}>
          <Text style={styles.iconText}>Logout</Text>
          <Image source={LOGOUT} style={styles.iconStyle} />
        </TouchableOpacity>
       
      </View>
    
    </View>
      

  )
}

export default UserAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     paddingTop: Platform.OS === 'android' ? 30 : 20,
  },
  header: {
    width: width,
    height: height * 0.2,

    flexDirection: 'row',
    padding: 20,
    marginTop:20
  },
  imageContainer: {
    width: 100,
    height: 100,

    borderRadius: 100 / 2,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    margin: 5,
    tintColor: '#ff6a00',
  },
  iconText: {
    fontSize: 16,
    marginLeft: 20,
    color: '#000',
    fontFamily: 'Lato-Light',
  },
  buttons: {
    // backgroundColor: '#3399FF',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 5,
  },
});





