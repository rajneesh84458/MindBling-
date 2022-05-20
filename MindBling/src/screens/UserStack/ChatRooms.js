// import React, {useState, useEffect, useLayoutEffect} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
//   FlatList,
//   StatusBar,
// } from 'react-native';
// import {Calendar} from 'react-native-calendars';
// import {EDIT, SETTING, USER} from '../../constants/icons';
// import {BACKGROUND} from '../../constants/images';
// import {Auth, database} from '../../network/config/setup';
// const {width, height} = Dimensions.get('screen');
// const dummypicture = require('../../../assets/icons/user.png');
// const TrainerHome = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     var ref = await database().ref('RegisteredTrainers/');
//     var query = ref.orderByChild('uid').equalTo(Auth().currentUser.uid);
//     query.once('value', (snapshot) => {
//       let data = snapshot.val();

//       if (data) {
//         let items = Object.values(data);
//         setDataSource(items);

//         setLoading(false);

//         console.log('shdfhkshf', dataSource);
//         // console.log("name",dataSource)
//       } else {
//         return null;
//       }
//     });
//   };
//   const arrayOfDates = dataSource.map((item, i) => item.selectedDate);
//   console.log('array====<>', arrayOfDates);
//   var customMarkedDates = {};
//   arrayOfDates.map((day, i) => {
//     console.log(
//       'day==>',
//       day.map((item) => item),
//     );
//     var my = day;
//     my.map((item) => {
//       customMarkedDates[item] = {
//         selected: true,
//         marked: true,
//         selectedColor: '#fd5f00',
//       };
//     });
//   });
//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <View style={styles.loaderStyle}>
//           <ActivityIndicator color="#fd5f00" size="large" />
//         </View>
//       </View>
//     );
//   } else {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar hidden />

//           <FlatList
//             keyExtractor={(item) => item.uid}
//             data={dataSource}
//             renderItem={({item}) => {
//               return (
//                 <ImageBackground source={BACKGROUND} style={{width, height}}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate('editTrainer', {
//                         name: item.displayName,
//                         photo: item.photo,
//                       })
//                     }
//                     style={styles.touchable}>
//                     <Image source={SETTING} style={styles.img} />
//                   </TouchableOpacity>

//                   <Image
//                     // source={{uri:item.photo ? item.photo :null}}
//                     source={
//                       item.photo && item.photo ? {uri: item.photo} : dummyPhoto
//                     }
//                     style={styles.profileImg}
//                   />

//                   <Text style={styles.namesText}>{item.displayName}</Text>
//                   <Text style={styles.desText}>{item.description}</Text>

//                   <View style={styles.card}>
//                     <Text style={styles.cardText}>
//                       Specialization:
//                       <Text style={{fontSize: 15, fontWeight: '100'}}>
//                         {item.specializedItems}
//                       </Text>
//                     </Text>

//                     <Text style={styles.cardText}>
//                       Experience:
//                       <Text
//                         style={{
//                           fontSize: 15,
//                           fontWeight: '100',
//                         }}>
//                         {' '}
//                         {item.Experience}
//                       </Text>
//                     </Text>

//                     <Text style={styles.cardText}>
//                       Contact:
//                       <Text style={{fontSize: 15, fontWeight: '100'}}>
//                         {' '}
//                         {item.email}
//                       </Text>
//                     </Text>
//                   </View>

//                   <View style={styles.calendar}>
//                     <Calendar
//                       markedDates={customMarkedDates}
//                       markingType={'multi-dot'}
//                       onDayPress={() => alert('added soon')}
//                       //disabledDates={this.state.mydates}
//                       style={styles.calendar}
//                     />
//                   </View>
//                   </ImageBackground>
//               );
//             }}
//           />

//       </SafeAreaView>
//     );
//   }
// };

// export default TrainerHome;

// const styles = StyleSheet.create({
//   container: {
//     width,
//     height,
//     marginBottom:10
//   },
//   touchable: {
//     height: 40,
//     width: 40,
//     backgroundColor: 'black',
//     margin: 10,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//   },
//   img: {
//     height: 20,
//     width: 20,
//     tintColor: 'white',
//   },
//   profileImg: {
//     height: 100,
//     width: 100,
//     borderRadius: 50,

//     alignSelf: 'center',
//   },
//   namesText: {
//     fontSize:20,
//     fontWeight: 'bold',
//     color: 'white',
//     alignSelf: 'center',
//   },
//   desText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: 'white',
//     textAlign: 'center',
//   },
//   card: {
//     padding: 10,
//     height:height*0.18,
//     width,
//     alignSelf: 'center',
//     backgroundColor: 'white',

//     marginTop: 20,
//   },
//   cardText: {
//     flex: 0.2,
//     fontSize: 16,
//     fontWeight: 'bold',
//     padding: 2,
//     color: '#2d2d2d',
//   },
//   calendar: {
//     marginVertical:10,
//     borderRadius: 10,
//   },

//   loaderStyle: {
//     width: width * 0.2,
//     height: width / 6,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     // shadowColor: '#000',
//     shadowOpacity: 0.35,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 5,
//       width: 1,
//     },
//     elevation: 5,
//   },
// });








import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import requestCameraAndAudioPermission from '../../components/Permission';

class ChatRooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AppID: '86c98c0b669b4f0bb8e3bb8e76a85672',                    //Set your APPID here
            ChannelName: 'Test',                                  //Set a default channel or leave blank
        };
        if (Platform.OS === 'android') {                    //Request required permissions from Android
            requestCameraAndAudioPermission().then(_ => {
                console.log('requested!');
            });
        }
    }
    handleSubmit = () => {
        let AppID = this.state.AppID;
        let ChannelName = this.state.ChannelName;
        if (AppID !== '' && ChannelName !== '') {

            // Actions.video({ AppID, ChannelName });
            this.props.navigation.navigate('Video')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formLabel}>App ID</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(AppID) => this.setState({ AppID })}
                    value={this.state.AppID}
                />
                <Text style={styles.formLabel}>Channel Name</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(ChannelName) => this.setState({ ChannelName })}
                    value={this.state.ChannelName}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        title="Start Call!"
                        onPress={this.handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={{ color: '#ffffff' }}> Start Call </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    formLabel: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#0093E9',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    submitButton: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    formInput: {
        height: 40,
        backgroundColor: '#f5f5f5',
        color: '#0093E9',
        borderRadius: 4,
        paddingLeft: 20,
    },
});

export default ChatRooms;





















// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   Dimensions,
//   ActivityIndicator,
//   Pressable,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {database} from '../../network/config/setup';
// import {RIGHTARRROW, USER} from '../../constants/icons';
// import CustomHeader from '../../components/CustomHeader';

// const {width, height} = Dimensions.get('window');

// export default function ChatRooms({navigation}) {
//   const [dataSource, setDataSource] = useState([]);
//   const [displayName, setDisplayName] = useState('');
//   const [photoURL, setPhotoURL] = useState('');
//   const [mycalender, setMyCalender] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     fetchConsultations();

//   }, []);

//   const getLocalData = async () => {
//     await AsyncStorage.getItem('trainerLogin')
//       .then((value) => {
//         const user = JSON.parse(value);
//         setDisplayName(user.username);
//         setPhotoURL(user.userPhoto);
//         setMyCalender(user.trainerCalender)
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const fetchConsultations = async () => {
//     var ref = await database().ref('consultation/');
//     // var query = ref.orderByChild('uid').equalTo(Auth().currentUser.uid);
//     ref.on('value', (snapshot) => {
//       let data = snapshot.val();

//       if (data) {
//         let items = Object.values(data);
//         setDataSource(items);

//         setLoading(false);

//         // console.log('shdfhkshf', dataSource);
//         // console.log("name",dataSource)
//       } else {
//         return null;
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <View style={styles.loaderStyle}>
//           <ActivityIndicator color="#fd5f00" size="large" />
//         </View>
//       </View>
//     );
//   } else {
//     return (
//       <ScrollView style={styles.container}>
       

//         {dataSource.map((item, index) => {
//           return (
//             <Pressable onPress ={()=>navigation.navigate('ChatMessage', {thread:item})}
//             key={index} style={styles.mainView}>
//               <View style={styles.imgView}>
//                 <Image
//                   style={styles.userImg}
//                   source={
//                     item.trainerpic && item.trainerpic
//                       ? {uri: item.trainerpic}
//                       : USER
//                   }
//                 />
//               </View>
//               <View style={styles.textView}>
//                 <Text style={styles.nameText}>{item.trainerName}</Text>
//                 <Text style={{fontSize:12,marginTop:13}}>By {item.Name}</Text>
//               </View>

//               <View
            
//               style={[styles.touchable]}>
//               <Image style={styles.imgDot} source={RIGHTARRROW} />
//             </View>
//             </Pressable>
//           );
//         })}
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },


//   mainView: {
//     // height: 'auto',
//     height:100,
//     width,
//     flexDirection: 'row',
//     // backgroundColor: 'green',
//     borderBottomWidth:StyleSheet.hairlineWidth,
//     borderBottomColor:'#ddd'
    
    
//   },
//   imgView: {
//     height: 100,
//     width: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//   },
//   userImg: {
//     height: 60,
//     width: 60,
//     overflow: 'hidden',
//     borderRadius: 100,
//   },
//   textView: {
//     height: 100,
//     width: '70%',
//     justifyContent: 'center',
//     marginLeft: 10,
//   },
//   nameText: {
//     textAlign: 'left',
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#999daa',
//   },
//   timeText: {
//     color: '#c1c8de',
//     fontSize: 15,
//     fontWeight: '500',
//     paddingVertical: 10,
//   },
//   touchable: {
//     height: 100,
//     width: '10%',
//     justifyContent: 'center',
//   },
//   imgDot: {
//     height: 15,
//     width: 15,
//     tintColor: 'blue',
//   },
// });
