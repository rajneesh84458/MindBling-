
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
  Dimensions,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';

import {
  ACCOUNTING,
  BUSINESS,
  CAREER,
  CHAT_ICON,
  CLOSE,
  COMMENT,
  COMMERCIAL,
  CORPORATE,
  DATING,
  DIET,
  DOTS,
  EDUCATION,
  FINANCE,
  FITNESS,
  HEALTH_ICON,
  HEIGHT,
  INDUSTRIAL,
  LEADER,
  MENTAL,
  NEXT,
  NUTRITION,
  PERSONAL,
  PIC,
  PROFILE,
  RELATION,
  RIGHTARRROW,
  SAFTETY,
  SEARCH,
  SETTING,
  SOCIAL,
  SPORTS,
  USER,
  VIRUS,
  WEIGHT,
  YOGA,
} from '../../constants/icons';
const {width, height} = Dimensions.get('window');
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const dotImage = RIGHTARRROW;

import AsyncStorage from '@react-native-community/async-storage';
import {Auth, database} from '../../network/config/setup';

import CategoryTopic from '../../components/CategoryTopic';
import HealthCategory from '../../components/HealthCategory';
import BusinessCategory from '../../components/BusinessCategory';

const dummylist = [
  {Img: HEALTH_ICON, name: 'Health', img: dotImage},
  {Img: BUSINESS, name: 'Business', img: dotImage},
  {Img: FINANCE, name: 'Finance', img: dotImage},
  {Img: CAREER, name: 'Career', img: dotImage},
  {Img: EDUCATION, name: 'Education', img: dotImage},
  {Img: RELATION, name: 'RelationShips', img: dotImage},
  {Img: SPORTS, name: 'Sports', img: dotImage},
  {Img: DATING, name: 'Dating', img: dotImage},
  {Img: LEADER, name: 'LeaderShip', img: dotImage},
  {Img: USER, name: 'Sober Coaching', img: dotImage},
];

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [trainer, setTrainer] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [list, setList] = useState(dummylist);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchAppointment, setFetchAppointment] = useState([]);
  const [userdetail,setUserDetail] = useState({
    name:'',
    email:'',
    id:'',
    photo:null,

 })

  useEffect(() => {
    //  fetchUser()
   getLocalData();
    fetchData();
    fetchConsultations();
  }, []);


  const fetchUser = async() =>{
    await database().ref(`users/${Auth().currentUser.uid}`)
    .on('value',snapshot =>{
         setUserDetail({name:snapshot.val().displayName,photo:snapshot.val().photo})
        console.log({name:snapshot.val().displayName})
        
    })
  }
  const fetchData = async () => {
    const mydata = await database().ref('RegisteredTrainers/');
    mydata.once('value', (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data);
        setTrainer(items);
        setLoading(false);
        // console.log(trainer);
      } else {
        return null;
      }
    });
  };

  const fetchConsultations = async () => {
    var ref =  await database().ref(`consulations/`)
   var query = ref.orderByChild('uid').equalTo(Auth().currentUser.uid);
    query.on('value', (snapshot) => {
      let data = snapshot.val();

      if (data) {
        let items = Object.values(data);
        setFetchAppointment(items);
        // setDataSource(items);
        setLoading(false);
        console.log('shdfhkshf', fetchAppointment);
        // /console.log("name",dataSource)
      } else {
        return null;
      }
    });
  };




    const getLocalData = async () => {
    await AsyncStorage.getItem('userLogin')
      .then((value) => {
        const user = JSON.parse(value);

        setDisplayName(user.username);
         setPhotoURL(user.userPhoto);
        // console.log("oeyeyeyey",user)
        // alert(`${user.username} ${user.userid}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const modalComponent = () => {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  justifyContent: 'flex-start',
                  width: 50,
                  alignItems: 'center',
                  margin: 15,
                }}
                onPressOut={() => {
                  setModalVisible(false);
                }}>
                <Text style={{fontSize: 25, fontFamily: 'JosefinSans-Bold'}}>
                  X
                </Text>
                {/* <Image source={CLOSE} style={{height: 30, width: 30}} /> */}
              </TouchableOpacity>
              <View style={{height: 60, width: '95%', marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                  }}>
                  Know Specialization?
                </Text>
                <Text style={{color: 'gray', paddingLeft: 15}}>
                  Select from top specializations
                </Text>
              </View>

              <FlatList
                keyExtractor={(item) => item.Ia}
                data={list}
                renderItem={({item}) => (
                  <View style={styles.mainView}>
                    <View style={styles.imgView}>
                      <Image style={styles.userImgs} source={item.Img} />
                    </View>
                    <View style={styles.textView}>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => Alert.alert('Go to user profile')}
                      style={styles.touch}>
                      <Image style={styles.imgDot} source={NEXT} />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderList = ({item}) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() =>
          navigation.navigate('profile', {
            item,
            name: item.displayName,
            photo: item.photo,
            guestid:item.uid
          })
        }>
        <View style={styles.cardView}>
         
            <Image
              style={styles.img}
              //source={{uri: item.photo ? item.photo : null}}
              source={item.photo && item.photo ? {uri: item.photo} : PROFILE}
            />
          

          <View style={{marginLeft: 10, flex: 1, padding: 5}}>
            <Text style={styles.text}>{item.displayName}</Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, fontFamily: 'Lato-Light', top: 5},
              ]}>
              {item.email}
            </Text>
            <View style={{width: width * 0.7}}>
              {/* <Text style={{fontWeight:'bold',paddingHorizontal:2,paddingTop:5,fontFamily:'Quicksand-Bold'}}>{item.specializedItems}</Text> */}
            </View>
          </View>
          <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 10}}>
            4.5 stars
          </Text>
        </View>
      </Card>
    );
  };

  const EmptyListMessage = ({item}) => {
    return (

      <View style={styles.emptyListStyle} >
        {/* <ActivityIndicator size ="small" color  = "blue"/> */}
      <Text
        style={[styles.emptyListStyle,{fontSize:12,color:'#cccc'}]}
        onPress={() => fetchAppointment(item)}>
        Not yet any Appointment
      </Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.welcome}>Welcome Back!</Text> */}
      <View style={styles.headerStyle}>
        <Text
          style={{fontSize: 20, fontFamily: 'Lato-Light', textAlign: 'center'}}>
          MindBling
        </Text>
        <TouchableOpacity
          style={{left: 120}}
          onPress={() =>
            navigation.navigate('searchquery', {searchData: trainer})
          }>
          <Icon name="search" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Image
        //  source={{uri:photoURL}}
        // source={userdetail.photo && userdetail.photo ? {uri: userdetail.photo} : PROFILE}
         source={photoURL && photoURL ? {uri: photoURL} : PROFILE}
        style={styles.userImg}
      />
      <Text style={styles.name}>{displayName}</Text>
      {/* <Text style={styles.name}>{displayName}</Text> */}


      <View>
        {/* <ProfileCard navigation={navigation} details={trainer} /> */}
        <Text style={styles.previousText}>Your Previous consultation</Text>
        <FlatList
          horizontal
          data={trainer}
          renderItem={(item, index) => {
            //console.log("indexing data===>", item.index)
            if (item.index < 3) return renderList(item);
          }}
          keyExtractor={(item, index) => item.uid}
        />
      </View>

      <Text
        onPress={() => navigation.navigate('seeMore', {gotoProfile: trainer})}
        style={{
          color: '#000',
          padding: 10,
          textAlign: 'right',
          fontFamily: 'Lato-Light',
        }}>
        See More
      </Text>

      <View>
        {/* <ProfileCard navigation={navigation} details={trainer} /> */}
        <Text style={[styles.previousText, {marginTop: 0}]}>
          Your Upcoming consultation
        </Text>
        <FlatList
          keyExtractor ={(item,index)=>index.toString()}
          horizontal
          data={fetchAppointment}
          renderItem={({item}) => {
            return (
              <Card
                style={styles.mycard}
                onPress={() =>
                  navigation.navigate('requestTrainer', {
                    item,
                    name: item.trainerName,
                    photo: item.trainerpic,
                  })
                }>
                <View style={styles.cardView}>
                  <Image
                    style={styles.img}
                    //source={{uri: item.photo ? item.photo : null}}
                    source={
                      item.trainerpic && item.trainerpic
                        ? {uri: item.trainerpic}
                        : PROFILE
                    }
                  />

                  <View style={{marginLeft: 10, flex: 1, padding: 5}}>
                    <Text style={styles.text}>{item.trainerName}</Text>
                    <Text style={[styles.text,{paddingTop:10,fontFamily:'Lato-Light'}]}>{item.day}</Text>
                    <Text style={[styles.text,,{paddingTop:5,fontFamily:'Lato-Light'}]}>{item.time}</Text>
                    <View style={{width: width * 0.7}}>
                      {/* <Text style={{fontWeight:'bold',paddingHorizontal:2,paddingTop:5,fontFamily:'Quicksand-Bold'}}>{item.specializedItems}</Text> */}
                    </View>
                  </View>
                  <Text
                    style={{color: 'blue', fontWeight: 'bold', fontSize: 10}}>
                    pending
                  </Text>
                </View>
              </Card>
            );
          }}
          //Message to show for the Empty list
          ListEmptyComponent={EmptyListMessage}
        />

        <Text
          onPress={() => navigation.navigate('requestTrainer')}
          style={{
            color: '#000',
            padding: 10,
            textAlign: 'right',
            fontFamily: 'Lato-Light',
          }}>
          See More
        </Text>
      </View>

      <Text style={styles.heading}>Choose from top consultation </Text>

      <View style={styles.clone}>
        <CategoryTopic title="Health" image={HEALTH_ICON} />

        <CategoryTopic title="Business" image={BUSINESS} />

        <CategoryTopic title="Finance" image={FINANCE} />

        <CategoryTopic title="Career" image={CAREER} />
      </View>

      <View style={styles.clone}>
        <CategoryTopic title="Education" image={EDUCATION} />

        <CategoryTopic title="Relation" image={RELATION} />

        <CategoryTopic title="Sports" image={SPORTS} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: 80,
            width: 80,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          //    onPress={()=>alert('hii')}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#687516',
              fontFamily: 'Lato-Light',
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.textHeading, {paddingTop: 15}]}>Health</Text>
      <View style={styles.view}>
        <View style={styles.clone}>
          <HealthCategory title="Height" image={HEIGHT} />
          <HealthCategory title="Weight" image={WEIGHT} />
          <HealthCategory title="Fitness" image={FITNESS} />
          <HealthCategory title="Yoga" image={YOGA} />
        </View>

        <View style={styles.clone}>
          <HealthCategory title="Disease" image={VIRUS} />
          <HealthCategory title="Mental" image={MENTAL} />
          <HealthCategory title="Nutrition" image={NUTRITION} />
          <HealthCategory title="Diet" image={DIET} />
        </View>
      </View>

      <Text style={styles.textHeading}>Business</Text>
      <View style={styles.view}>
        <View style={styles.clone}>
          <BusinessCategory
            title="Commercial"
            image={COMMERCIAL}
            onPress={() => alert('Businsess')}
          />

          <BusinessCategory
            title="Corporate"
            image={CORPORATE}
            onPress={() => alert('Businsess')}
          />
          <BusinessCategory
            title="Industrial"
            image={INDUSTRIAL}
            onPress={() => alert('Businsess')}
          />
          <BusinessCategory
            title="Social"
            image={SOCIAL}
            onPress={() => alert('Businsess')}
          />
        </View>

        <View style={styles.clone}>
          <BusinessCategory
            title="Personal"
            image={PERSONAL}
            onPress={() => alert('Businsess')}
          />
          <BusinessCategory
            title="PartnerShip"
            image={SAFTETY}
            onPress={() => alert('Businsess')}
          />
          <BusinessCategory
            title="Safety"
            image={NUTRITION}
            onPress={() => alert('Businsess')}
          />
          <BusinessCategory
            title="Accounting"
            image={ACCOUNTING}
            onPress={() => alert('Businsess')}
          />
        </View>
      </View>
      {modalComponent()}
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {
    width,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop :Platform.OS =='android' ? 30:0
  },
  welcome: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8b98c3',
    paddingLeft: 20,
    paddingTop: 30,
  },
  userImg: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Lato-Light',
    color: '#2c3550',
    paddingLeft: 30,
  },
  previousText: {
    fontSize: 18,
    fontFamily: 'Lato-Light',
    padding: 10,
    color: 'gray',
    marginTop: 20,
  },
  previous: {
    height: 80,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,

    paddingLeft: 20,
    fontFamily: 'Lato-Light',

    color: 'gray',
  },
  main: {
    height: 180,
    width: '90%',
    alignSelf: 'center',
  },
  clone: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  touchable: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
  },
  textHeading: {
    fontSize: 25,
    fontFamily: 'Lato-Light',
    paddingLeft: 20,
    marginTop: 30,
  },
  view: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '99%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: 'center',
    // alignSelf: 'center',
    elevation: 10,
  },

  mainView: {
    height: 90,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imgView: {
    height: 100,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  userImgs: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    // borderRadius:100
  },
  textView: {
    height: 100,
    width: '70%',
    justifyContent: 'center',
  },
  nameText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    color: '#999daa',
  },

  touch: {
    height: 100,
    width: '10%',
    justifyContent: 'center',
  },
  imgDot: {
    height: 15,
    width: 15,
    tintColor: '#9397a5',
  },
  searchStyle: {
    height: 40,
    paddingLeft: 15,
    marginVertical: 30,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    elevation: 5,
  },
  searchIcon: {
    width: 15,
    height: 15,
    tintColor: '#ccc',
    marginLeft: 20,
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
    elevation: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
  },

  footerText: {fontSize: 18, color: '#e5e5e5'},
  footer: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },

  img: {width: 60, height: 60, borderRadius: 30},
  emptyListStyle:{
    justifyContent:'center',alignItems:'center',marginLeft:30
  }
});




// import React,{useState,useEffect} from 'react'
// import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// const HomeScreen = () => {
//   // const [displayName, setDisplayName] = useState('');
//   //  const [photoURL, setPhotoURL] = useState(null);
//   //  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

//   const [userInfo,setUserInfo] = useState(null)

//    useEffect(()=>{
//        getLocalData()
//    },[])

//    const _signOut = async () => {
//     // setGettingLoginStatus(true);
//     // Remove user session from the device.
//     try {
//       // await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       // Removing user Info
//       setUserInfo(null); 
//     } catch (error) {
//       console.error(error);
//     }
//     // setGettingLoginStatus(false);
//   };
//     const getLocalData = async () => {
//     await AsyncStorage.getItem('googleLogin')
//       .then((value) => {
//         const user = JSON.parse(value);
//          setUserInfo(user)
//         console.log("oeyeyeyey",userInfo.user.givenName)
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <View style={{flex:1}}>
//       {/* <Text style={{marginTop:30}}>Name{userInfo.user.givenName}</Text> */}

//       <TouchableOpacity
//                   style={styles.buttonStyle}
//                   onPress={_signOut}>
//                   <Text>Logout</Text>
//                 </TouchableOpacity>
//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width: 300,
//     marginTop: 30,
//   },
// })






