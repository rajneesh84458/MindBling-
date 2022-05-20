// import AsyncStorage from '@react-native-community/async-storage'
// import React,{useState,useEffect} from 'react'
// import { StyleSheet, Text, View,Dimensions,Pressable } from 'react-native'
// import { database, storage } from '../../network/config/setup'
// import ImagePicker from 'react-native-image-picker';
// const {width, height} = Dimensions.get('window');

// const UserUpdate = () => {
// const [userId, setUserId] = useState('')
// const [fetchUser,setFetchUser] = useState([])
// const [avatarSource, setAvatarSource] = useState(null)
// const [uploading, setUploading] = useState(false)
// const [transferred, setTransferred] = useState(0)

// useEffect(()=>{
//   fetchData();
// getLocalData();
 

// },[])





// const fetchData = async () => {
//   var ref = await database().ref('users/');
//   var query = ref.orderByChild('uid').equalTo(parseInt(userId));
//   query.once('value', (snapshot) => {
//     let data = snapshot.val();

//     if (data) {
//       let items = Object.values(data);
//       setFetchUser(items)


//       // setLoading(false);

//       console.log('shdfhkshf', fetchUser);
      
//     } else {
//       return null;
//     }
//   });
// };
//   const getLocalData = async () => {
//     await AsyncStorage.getItem('userLogin')
//       .then((value) => {
//         const user = JSON.parse(value);
//         // setUser(user)
//         setUserId(user.userid)
//         console.log("idddddd",userId)
//         // setDisplayName(user.username);
//         // setPhotoURL(user.userPhoto);
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

// // const  selectPhotoTapped = () => {
// //   const options = {
// //     quality: 1.0,
// //     maxWidth: 500,
// //     maxHeight: 500,
// //     allowEditing: true,

// //     storageOptions: {
// //       skipBackup: true,
// //     },
// //   };

// //   ImagePicker.showImagePicker(options, async (response) => {
// //     // console.log('Response = ', response.data);

// //     if (response.didCancel) {
// //       console.log('User cancelled photo picker');
// //     } else if (response.error) {
// //       console.log('ImagePicker Error: ', response.error);
// //     } else if (response.customButton) {
// //       console.log('User tapped custom button: ', response.customButton);
// //     } else {
// //       const {uri} = response;
// //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
// //       const uploadUri =
// //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
// //       setUploading(true);
     
// //       setTransferred(0);
    
// //       const task = storage().ref(filename).putFile(uploadUri);

// //       // set progress state
// //       task.on('state_changed', (snapshot) => {});
// //       try {
// //         await task;
// //       } catch (e) {
// //         console.error(e);
// //       }
// //       setUploading(false);
  

// //       await storage()
// //         .ref(filename)
// //         .getDownloadURL()
// //         .then((downloadURL) => {
// //           console.log('dhfakshkfhsfkdsf', downloadURL);
// //           setAvatarSource(downloadURL)

// //         });

// //       // this.setState({avatarSource: this.state.avatarSource});
// //     }
// //   });
// // };

//   return (
//     <View style ={styles.container}>
//    {/* <Pressable
//           style={[styles.avatar, styles.avatarContainer]}
//           onPress={selectPhotoTapped}>
//           {avatarSource === null ? (
//             <Image source={USER} style={styles.avatar} />
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
//         </Pressable> */}

//         <Text>sdfhhsf</Text>
//     </View>
//   )
// }

// export default UserUpdate





import AsyncStorage from '@react-native-community/async-storage'
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,Dimensions,Pressable,Image,TextInput} from 'react-native'

import { database, storage } from '../../network/config/setup'
import ImagePicker from 'react-native-image-picker';
import { PLUS, USER } from '../../constants/icons';
import FormButton from '../../components/FormButton';
const {width, height} = Dimensions.get('window');
const UserUpdate = ({route}) => {
 const [user, setUser] = useState([])
 const [userId, setUserId] = useState('')
 const [avatarSource, setAvatarSource] = useState(null)
 const [uploading, setUploading] = useState(false)
 const [transferred, setTransferred] = useState(0)
 const [displayName, setDisplayName] = useState('')
useEffect(()=>{
   fetchData()
   getLocalData()
},[])

  const fetchData = async () => {
    var ref = await database().ref('users/');
    var query = ref.orderByChild('uid').equalTo(userId);
    query.once('value', (snapshot) => {
      let data = snapshot.val();

      if (data) {
        let items = Object.values(data);
        setUser(items);
        console.log("sdffsfs",user);
        
      } 
      else {
        return null;
      }
    });
  };
  
  const getLocalData = async () => {
    await AsyncStorage.getItem('userLogin')
      .then((value) => {
        const user = JSON.parse(value);
        setUserId(user.userid)
        console.log("idddddd",userId)
     
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    
            });
  
        }
      });
    };
   

  const updateProfile = (item) =>{
        database()
      .ref('users/')
      .update({
        displayName:item.displayName,
        photo:item.avatarSource
      })
      .then(() => console.log('Data updated.'));
      }
  return (
    <View style={styles.container}>
       {
        user.map(item =>{
           return (
             <View>
              <Pressable
          style={[styles.avatar, styles.avatarContainer]}
          onPress={selectPhotoTapped}>
         
            <Image
              //source={{uri: this.state.avatarSource}}
              source={item.photo && item.photo ? {uri: item.photo} :USER}
              style={styles.avatar}
            />
     

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
        </Pressable> 

        <View>
        <TextInput
         
            style={styles.textInput}
        
             defaultValue ={item.displayName}
             value={displayName}
            onChangeText={(text) => setDisplayName({displayName: text})}
          />
          
        </View>
        <FormButton buttonTitle ="Update Profile" onPress ={()=>updateProfile(item)}/>
             </View>
           )
         })
        
       }
      
    
    </View>
  )
}

export default UserUpdate

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  textInput: {
    width: '85%',
    height:60,
    alignSelf: 'center',
    // borderRadius: 5,
    // paddingVertical:2, 
    fontSize:22,
     paddingLeft:10,
    backgroundColor: '#fff',
    // letterSpacing: 2,
  },
  avatarContainer: {
    paddingTop:25,
    borderRadius: 140,
    width: width * 0.4,
    height: width * 0.4,
    // backgroundColor:'#ddd',
    // borderWidth: 0,
     justifyContent: 'center',
     alignItems:'center',
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

})











