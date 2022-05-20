import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {PROFILE, USER} from '../../constants/icons';

import {Auth, database} from '../../network/config/setup';
import Icon from 'react-native-vector-icons/Entypo';
export default function RequestAppointment({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    var ref = await database().ref(`consulations/`);
    var query = ref.orderByChild('uid').equalTo(Auth().currentUser.uid);
    query.on('value', (snapshot) => {
      let data = snapshot.val();

      if (data) {
        let items = Object.values(data);
        setDataSource(items);

        setLoading(false);

        console.log('shdfhkshf', dataSource);
        // console.log("name",dataSource)
      } else {
        return null;
      }
    });
  };

  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => fetchData(item)}>
        Not yet any Appointment
      </Text>
    );
  };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.loaderStyle}>
          <ActivityIndicator color="#fd5f00" size="large" />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <Pressable
                style={styles.mainView}
                onPress={() => navigation.navigate('ChatMessage', {item})}>
                <View style={{padding: 10}}>
                  <Image
                    style={styles.userImg}
                    source={
                      item.trainerpic && item.trainerpic
                        ? {uri: item.trainerpic}
                        : PROFILE
                    }
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.nameText}>{item.trainerName}</Text>
                  <Text
                    style={[
                      styles.nameText,
                      {fontSize: 12, paddingVertical: 5},
                    ]}>
                    {item.day}
                  </Text>

                  <Text style={[styles.nameText, {fontSize: 12}]}>
                    {item.time}
                  </Text>
            

                 
                    
              
               
                    
                  
                </View>
                <Icon name="chat" size={27} color="#ff6a00" />
              </Pressable>
            );
          }}
          //Message to show for the Empty list
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'white',
  },

  img: {
    height: 20,
    width: 20,
    tintColor: '#000',
  },

  mainView: {
    height: 'auto',
    width,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 5,
  },
  imgView: {
    height: 100,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  userImg: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    borderRadius: 100,
  },
  textView: {
    height: 100,
    width: '70%',
    justifyContent: 'center',
    backgroundColor: '#f4f5f6',
    borderRadius: 20,
    // marginLeft:5,
    paddingLeft: 10,
   
  },
  nameText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Roboto-Black',
    padding:5
  },
});





// import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
// import { SafeAreaView, Alert, Text, View, FlatList } from "react-native";

// // import { Store } from "../../context/store";
// // import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
// import { uuid, smallDeviceHeight } from "../../utility/constants";

// import { deviceHeight } from "../../utility/styleHelper/appStyle";

// import { database } from "../../network/config/setup";
// import StickyHeader from "../../components/stickyHeader";
// import ShowUsers from "../../components/showUsers";
// import Colors from "../../utility/colors";

// export default ({ navigation }) => {
//   // const globalState = useContext(Store);
//   // const { dispatchLoaderAction } = globalState;

//   const [userDetail, setUserDetail] = useState({
//     id: "",
//     name: "",
//     profileImg: "",
//   });
//   const [getScrollPosition, setScrollPosition] = useState(0);
//   const [allUsers, setAllUsers] = useState([]);
//   const { profileImg, name } = userDetail;

//   useEffect(() => {
//     // dispatchLoaderAction({
//     //   type: LOADING_START,
//     // });
//     try {

//         database()
//         .ref("users/")
//         .on("value", (dataSnapshot) => {
//           let users = [];
//           let currentUser = {
//             id: "",
//             name: "",
//             profileImg: "",
//           };
//           dataSnapshot.forEach((child) => {
//             if (uuid === child.val().uid) {
//               currentUser.id = uuid;
//               currentUser.name = child.val().displayName;
//               currentUser.profileImg = child.val().photo;
//             } else {
//               users.push({
//                 id: child.val().uid,
//                 name: child.val().displayName,
//                 profileImg: child.val().photo,
//               });
//             }
//           });
//           setUserDetail(currentUser);
//           setAllUsers(users);
//           // dispatchLoaderAction({
//           //   type: LOADING_STOP,
//           // });
//         });
//     } catch (error) {
//       alert(error);
//       // dispatchLoaderAction({
//       //   type: LOADING_STOP,
//       // });
//     }
//   }, []);

//   // * LOG OUT

//   // * ON IMAGE TAP
//   const imgTap = (profileImg, name) => {
//     if (!profileImg) {
//       navigation.navigate("ShowFullImg", {
//         name,
//         imgText: name.charAt(0),
//       });
//     } else {
//       navigation.navigate("ShowFullImg", { name, img: profileImg });
//     }
//   };

//   // * ON NAME TAP
//   const nameTap = (profileImg, name, guestUserId) => {
//     if (!profileImg) {
//       navigation.navigate("Chat", {
//         name,
//         imgText: name.charAt(0),
//         guestUserId,
//         currentUserId: uuid,
//       });
//     } else {
//       navigation.navigate("Chat", {
//         name,
//         img: profileImg,
//         guestUserId,
//         currentUserId: uuid,
//       });
//     }
//   };
//   // * GET OPACITY

//   const getOpacity = () => {
//     if (deviceHeight < smallDeviceHeight) {
//       return deviceHeight / 4;
//     } else {
//       return deviceHeight / 6;
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor:Colors.white }}>
//       {getScrollPosition > getOpacity() && (
//         <StickyHeader
//           name={name}
//           img={profileImg}
//           onImgTap={() => imgTap(profileImg, name)}
//         />
//       )}

//       {/* ALL USERS */}
//       <FlatList
//         alwaysBounceVertical={false}
//         data={allUsers}
//         keyExtractor={(_, index) => index.toString()}
//         onScroll={(event) =>
//           setScrollPosition(event.nativeEvent.contentOffset.y)
//         }
//         ListHeaderComponent={
//           <View
//             style={{
//               opacity:
//                 getScrollPosition < getOpacity()
//                   ? (getOpacity() - getScrollPosition) / 100
//                   : 0,
//             }}
//           >

//           </View>
//         }
//         renderItem={({ item }) => (
//           <ShowUsers
//             name={item.name}
//             img={item.profileImg}
//             onImgTap={() => imgTap(item.profileImg, item.name)}
//             onNameTap={() => nameTap(item.profileImg, item.name, item.id)}

//           />
//         )}
//       />

//     </SafeAreaView>
//   );
// };

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const RequestAppointment = () => {
//   return (
//     <View>
//       <Text>sdfsfsdfsfs</Text>
//     </View>
//   )
// }

// export default RequestAppointment

// const styles = StyleSheet.create({})
