// import React, { Component } from 'react';
// import { View, Text,StyleSheet,TouchableOpacity,Modal,Alert } from 'react-native';

// export default class CustomModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         modalVisible:true,
//     };
//   }

//   close=()=>{

//     this.setState({
//         modalVisible:!this.state.modalVisible
//     });
//   }

//   render() {
//     return (
//       <View style={{flex:1,}}>

//     <View style={styles.centeredView}>
//      <Modal
//         animationType='fade'
//         transparent={true}
//         visible={this.state.modalVisible}
//         onRequestClose={() => {
//             Alert.alert("Modal has been closed.");
//             this.setState({modalVisible:!this.state.modalVisible});
//           }}

//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//               <TouchableOpacity

//                 style={{ position:'absolute', right:10,top:10}}
//                 onPress={() => {
//                     this.setState({modalVisible:!this.state.modalVisible});
//                 }}
//                 >
//               </TouchableOpacity>

//             <View
//               style={{
//                 padding:30,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>

//               <TouchableOpacity
//                 onPress={this.close}
//                 style={[
//                   styles.ButtonStyle,
//                   {
//                     height:30,
//                     width:80,
//                     backgroundColor: '#367896',
//                     borderColor: 'black',
//                     borderWidth: 0.5,
//                     marginBottom: 10,
//                   },
//                 ]}>

//                 <Text style={{fontSize: 15,color:'white'}} >
//                   Submit
//                 </Text>

//               </TouchableOpacity>
//             </View>
//           </View>
//           </View>
//       </Modal>
//       </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({

//     centeredView: {
//           flex: 0.5,
//           justifyContent: 'center',
//           alignItems: "center",
//           backgroundColor: "transparent"
//         },
//         modalView: {
//           width:300,
//           marginTop: 40,
//           backgroundColor: "white",
//           borderRadius: 10,
//           alignItems: "center",
//           justifyContent:'center',
//         //   borderWidth:0.2
//           shadowColor: "gray",
//           shadowOffset: {
//             width: 0,
//             height: 2
//           },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//           elevation:5
//         },

//         ButtonStyle: {
//           flexDirection: 'row',
//           backgroundColor: 'blue',
//           justifyContent: 'space-evenly',
//           alignItems: 'center',
//           marginBottom: 15,
//           borderRadius: 8,
//         }
//     });

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
// const dummyPhoto = require('../../../assets/icons/user.png');
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

import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Modal,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import CheckBox from '@react-native-community/checkbox';

const BannerWidth = Dimensions.get('window').width - 20;
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CustomModal() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [SelectedPokemon, setSelectedPokemon] = useState([]);
  const [SavedPokemon, setSavedPokemon] = useState([]);
  const [MultiSelectPopup, setMultiSelectPopup] = useState(true);
  const [PokemonList, setPokemonList] = useState([
    {
      Name: 'Wed 9:30am - 10:00am',
    },
  ]);

  const onChoose = () => {
    setSavedPokemon(SelectedPokemon);
    setMultiSelectPopup(false);
  };

useEffect(() => {
   setTimeout(() => {
    setMultiSelectPopup(false)
    
   },2000);
}, [])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.selectView} />

      <Modal transparent={true} visible={MultiSelectPopup}>
        <View style={styles.modalMain}>
          <View style={{alignSelf: 'flex-end'}}>
            <Icon
              name="cross"
              size={27}
              color="#ff6a00"
              style={{padding: 10, marginLeft: 10}}
              onPress={() => setMultiSelectPopup(false)}
            />
          </View>

          <View style={[styles.modalView, {padding: 10}]}>
            {PokemonList.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={true}
                style={{paddingHorizontal: 20}}>
                {PokemonList.map((item, index) => {
                  return (
                    <View style={{flexDirection: 'row'}} key={index}>
                      <Text
                        style={{
                          marginVertical: 25,
                          fontSize: 30,
                          color: !item.Choose ? 'rgba(84, 84, 84, 1)' : 'black',
                          fontWeight: item.Choose ? 'bold' : 'normal',
                        }}>
                        {item.Name}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <Text>No data Found</Text>
            )}
            <TouchableOpacity
              onPress={() => onChoose()}
              style={styles.chooseButton}>
              <Text style={styles.chooseText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  touchable: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  img: {
    height: 20,
    width: 20,
    tintColor: '#ccc',
  },

  trainerName: {
    fontSize: 25,
    fontFamily: 'Lato-Light',
    color: '#2c3550',
    paddingLeft: 20,
    paddingVertical: 20,
  },

  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeImg: {
    height: 20,
    width: 20,
    marginHorizontal: 20,
  },
  timeViewText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
  },
  photoView: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  photoImg: {
    height: 55,
    width: 55,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  usrName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#686e81',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },

  appointmentText: {
    fontSize: 20,
    fontFamily: 'BalsamiqSans-Regular',
    color: '#ccc',
    paddingLeft: 20,

    color: '#9aa6cc',
  },
  mainView: {
    height: 'auto',
    width: 300,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  imgView: {
    height: 100,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  textView: {
    height: 100,
    width: '60%',
    justifyContent: 'center',
    backgroundColor: '#f4f5f6',
    borderRadius: 20,
    // marginLeft:5,
    paddingLeft: 10,
  },
  nameText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Lato-Light',
  },
  timeText: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Lato-Light',
    paddingVertical: 10,
  },
  touchable: {
    height: 100,
    width: '10%',
    justifyContent: 'center',
  },
  imgDot: {
    height: 20,
    width: 20,
    tintColor: 'blue',
    marginLeft: 10,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Lato-Light',
    color: '#ccc',
  },
  mycard: {
    width: 300,
    margin: 10,
    height: 100,
    borderRadius: 10,
    shadowColor: '#000',
    // shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 2,
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
  },
  userImg: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    borderRadius: 100,
    marginLeft: 10,
  },
  pokeImage: {
    width: 100,
    height: 100,
  },
  pokeName: {
    color: 'white',
    marginBottom: 5,
    fontSize: 40,
    fontFamily: 'Lato-Light',
    padding: 10,
  },
  modalMain: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleView: {
    padding: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#efefef',
  },
  modalView: {
    backgroundColor: 'rgba(158, 158, 158, 1)',
    width: BannerWidth,
    height: 'auto',
    maxHeight: '30%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 15,
    color: '#000',
  },
  chooseButton: {
    backgroundColor: '#000',
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 100,
    borderRadius: 5,
  },
  chooseText: {
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noPokemonSelected: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectView: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f5f6',
  },
  cardFooter: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    width: Dimensions.get('window').width,
  },
  footerText: {
    color: '#fff',
    padding: 10,
  },
  selectListTitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 35,
  },
  cardView: {
    flexDirection: 'row',
    // justifyContent: 'space',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  cardMain: {
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#000',
    // width: Dimensions.get('window').width/3.4,
    marginHorizontal: 10,
  },
  Btn: {
    padding: 10,
    backgroundColor: '#005792',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
});
