// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   Pressable,Modal
// } from 'react-native';
// import CustomHeader from '../../components/CustomHeader';
// import {Auth, database} from '../../network/config/setup';
// import RazorpayCheckout from 'react-native-razorpay';
// import Snackbar from 'react-native-snackbar';
// import {USER} from '../../constants/icons';
// import AsyncStorage from '@react-native-community/async-storage';
// import { SUCCESSFULL_FIRST } from '../../constants/images';
// import FormButton from '../../components/FormButton';

// //razorapay key rzp_test_bh3IqnnNbc7hO3
// //https://www.section.io/engineering-education/react-native-razorpay/
// // const PaymentPic = Auth.currentUser.photoURL

// export default class PaymentScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       paymentName: '',
//       photo: null,
//       userid:null,
//       timeSchedule:'',
//       modalVisible:false
//     };
//   }

//   _onPressButton() {
//     var options = {
//       description: 'Credits towards LifeGuru',
//       image: 'https://i.imgur.com/3g7nmJC.png',
//       currency: 'INR',
//       key: 'rzp_test_bh3IqnnNbc7hO3',
//       amount: '5000',
//       name: 'Rajneesh kumar',
//       prefill: {
//         email: 'rajneesh@razorpay.com',
//         contact: '9191919191',
//         name: 'LifeGuru Application',
//       },
//       theme: {color: '#005792'},
//     };
//     RazorpayCheckout.open(options)
//       .then((data) => {
//         // handle success
//         //alert(`Success: ${data.razorpay_payment_id}`);
//         Snackbar.show({
//           text: `Payment Successfully : ${data.razorpay_payment_id}`,
//           duration: Snackbar.LENGTH_SHORT,
//         });
//       })
//       .catch((error) => {
//         // handle failure
//         // alert(`Error: ${error.code} | ${error.description}`);
//         Snackbar.show({
//           text: `Payment Cancelled : ${error.code} | ${error.description}`,
//           duration: Snackbar.LENGTH_SHORT,
//         });
//       });
//   }

//   getLocalData = async () => {
//     await AsyncStorage.getItem('userLogin')
//       .then((value) => {
//         const user = JSON.parse(value);
//      console.log(user)
//         this.setState({paymentName:user.username})
//         this.setState({photo:user.userPhoto})
  
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };



//   componentDidMount() {
//     this.getLocalData();
//   }

  
//   saveUser = async()=>{
//        await database().ref('consultation/').push({
//            userid:this.state.userid,
//            Name:this.state.paymentName,
//            trainerpic:this.props.route.params.pic,
//            picture:this.state.photo,
//            consultationFor:this.props.route.params.consultation,
//            trainerName:this.props.route.params.name,
//            time:this.props.route.params.selectedtime.selectTime,
//            day:this.props.route.params.selectedtime.selectDays

//        })
      
//        this.setState({modalVisible:false},()=> this.props.navigation.navigate('requestTrainer'))
      
//  }



// modalComponent = () => {
//   return (
//     <View style={styles.centeredView}>
//       <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
//         <View style={styles.centeredView}>
//         <TouchableOpacity
//               activeOpacity={1}
//               style={{
//                alignSelf:'flex-end',
//                 width: 50,
              
//                 margin: 15,
//               }}
//               onPressOut={() => {
//                 this.setState({modalVisible:false})
//                 // setModalVisible(false);
//               }}>
//               <Text style={{fontSize: 25, fontFamily: 'JosefinSans-Bold',textAlign:'right'}}>
//                 X
//               </Text>
           
//             </TouchableOpacity>
//           <View style={styles.modalView}>
            
          
          
//            <Image source ={SUCCESSFULL_FIRST} style={{width:400,height:400}}/>
//            <Text style={{fontSize:17, fontFamily: 'Quicksand-Regular',textAlign:'right'}} >Your Consultation is Successfull</Text>
//            <FormButton buttonTitle ="Check it" onPress={this.saveUser} />
//           </View>
           
//         </View>
//       </Modal>
//     </View>
//   );
// };

//   render() {
//     const {selectTime, selectDays} = this.props.route.params.selectedtime;
//     const {photo, paymentName} = this.state;
//     // this.setState({timeSchedule:selectTime})
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <CustomHeader navigation={this.props.navigation} />

//           <View style={styles.header}>
//             {this.props.route.params.pic === '' ? (
//               <Image source={USER} style={styles.avatar} />
//             ) : (
//               <Image
//                 source={
//                   this.props.route.params.pic && this.props.route.params.pic
//                     ? {uri: this.props.route.params.pic}
//                     : USER
//                 }
//                 style={styles.avatar}
//               />
//             )}

//             <View
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={[styles.headerText]}>
//                 {this.props.route.params.name}
//               </Text>
//               <Text
//                 style={[
//                   styles.headerText,
//                   {fontSize: 14, fontWeight: '500', color: '#ccc'},
//                 ]}>
//                 {this.props.route.params.des}
//               </Text>
//               {/* <Text
//                 style={[
//                   styles.headerText,
//                   {fontSize: 14, fontWeight: '500', color: '#ccc'},
//                 ]}>
//                 {this.props.route.params.consultation}
//               </Text> */}
//             </View>
//           </View>

//           <View style={styles.rowsContainer}>
//             <Text>Purpose</Text>
//             <Text style={styles.rowsTitle}>Video Consultation</Text>
//           </View>
//           <View style={styles.rowsContainer}>
//             <Text>Selected Time Slots</Text>
//             <Text style={styles.rowsTitle}>
//               {selectDays} {selectTime}
//               {this.state.timeSchedule}
//             </Text>
//           </View>

//           <View style={styles.rowsContainer}>
//             <Text>Consultation fee</Text>
//             <Text style={styles.rowsTitle}>{'\u20B9'} 700</Text>
//           </View>

//           <View style={{paddingTop: 10}}>
//             <Text style={{padding: 10, fontWeight: 'bold'}}>
//               This video is consultation for:
//             </Text>
//             <View style={styles.userContainer}>
//               <Image
//                  source={photo && photo ? {uri: photo} : USER}
                
//                 style={{
//                   height: 30,
//                   width: 30,
//                   borderRadius: 25,
//                   marginLeft: 20,
//                 }}
//               />
//               <Text style={styles.name}>{paymentName}</Text>
//             </View>
//           </View>

//           <View>
//             <Text style={styles.footerTitle}>Note:</Text>
//             <Text style={styles.footerTitle}>
//               1. Updates will be sent to your contact number.
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 color: 'gray',
//                 paddingHorizontal: 10,
//               }}>
//               2. By contacting the video consultation, you agree to LifeGuru's
//               <Text style={{color: '#4BCFFA'}}>Terms and condition.</Text>You
//               can also Pre-pay for this consultation by selecting Pay online
//               option. You can read our payment
//               <Text style={{color: '#4BCFFA'}}> FAQs.</Text>
//             </Text>
//           </View>
//     <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
//     <Pressable onPress ={()=>this.setState({modalVisible:true})}

  
//     style={styles.button}>
//             <Text style={{color: 'white', fontSize: 20}}>Free</Text>
//           </Pressable>
//           <Pressable onPress={this._onPressButton} style={[styles.button,{backgroundColor:'#ff6a00'}]}>
//             <Text style={{color: 'white', fontSize: 20}}>Pay</Text>
//           </Pressable>
//     </View>
//           {this.modalComponent()}
//         </ScrollView>
//       </View>
//     );
//   }
// }










import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,Modal
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {Auth, database, messaging} from '../../network/config/setup';
// import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';
import {PROFILE, USER} from '../../constants/icons';
import AsyncStorage from '@react-native-community/async-storage';
import { SUCCESSFULL_FIRST } from '../../constants/images';
import FormButton from '../../components/FormButton';

const PaymentScreen = ({route,navigation}) => {
  // const [guestId,setGuestId]= useState('')
  const [paymentName, setPaymentName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [userid, setUserid] = useState(null)
  const [timeSchedule, setTimeSchedule] = useState('')
  const [modalVisible,setModalVisible] = useState(false)
  const [multicast_id, setMulticast_id] = useState('');
  const [success, setSuccess] = useState('');
  const [results, setResults] = useState('');
  const [token, setToken] = useState(null);
  const [appointment,setAppointment]= useState([])



  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  

  useEffect(() => {
    getLocalData()
    // messaging()
    //   .getToken()
    //   .then((fcmToken) => {
    //     if (fcmToken) {
    //       console.log('token====>', fcmToken);
    //       // user has a device token
    //     } else {
    //       // user doesn't have a device token yet
    //     }
    //   });
    // checkNotification()
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //   console.log("message ",JSON.stringify(remoteMessage))
    });

    return unsubscribe;
  }, []);


 const  saveUser = async()=>{ 
  sendnotifications()
          await database().ref(`consulations/`).push({
          //  guestId:,
           uid:userid,
           Name:paymentName,
           trainerpic:route.params.pic,
           picture:photo,
           consultationFor:route.params.consultation,
           trainerName:route.params.name,
           guestid:route.params.guestid,
           time:route.params.selectedtime.selectTime,
           day:route.params.selectedtime.selectDays,
           notifyToken:token

       })
        
         setModalVisible(false,navigation.navigate('requestTrainer'))
      
       
 }

  const getLocalData = async () => {
        await AsyncStorage.getItem('userLogin')
          .then((value) => {
            const user = JSON.parse(value);
         console.log(user)
         setUserid(user.userid)
         setPaymentName(user.username)
        setPhoto(user.userPhoto)
        setToken(user.notifyToken)
          
            // alert(`${user.username} ${user.userid}`);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    


  const  modalComponent = () => {
      return (
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modalMain}>
            {/* <TouchableOpacity
                  activeOpacity={1}
                  style={{
                   alignSelf:'flex-end',
                    width: 50,
                  
                    margin: 15,
                  }}
                  onPressOut={() => {
                  
                   setModalVisible(false);
                  }}>
                  <Text style={{fontSize: 25, fontFamily: 'JosefinSans-Bold',textAlign:'right'}}>
                    X
                  </Text>
               
                </TouchableOpacity> */}
              <View style={styles.modalView}>
                
              
              
               <Image source ={SUCCESSFULL_FIRST} style={{width:200,height:200}}/>
               <Text style={{fontSize:17, fontFamily: 'Quicksand-Regular',textAlign:'right'}} >Your Consultation is Successfull</Text>
               <FormButton buttonTitle ="Check it" onPress={saveUser} />
              </View>
               
            </View>
          </Modal>
        </View>
      );
    };

  // const _onPressButton =  () =>{
  //   var options = {
  //     description: 'Credits towards LifeGuru',
  //     image: 'https://i.imgur.com/3g7nmJC.png',
  //     currency: 'INR',
  //     key: 'rzp_test_bh3IqnnNbc7hO3',
  //     amount: '5000',
  //     name: 'Rajneesh kumar',
  //     prefill: {
  //       email: 'rajneesh@razorpay.com',
  //       contact: '9191919191',
  //       name: 'LifeGuru Application',
  //     },
  //     theme: {color: '#005792'},
  //   };
  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       //alert(`Success: ${data.razorpay_payment_id}`);
  //       Snackbar.show({
  //         text: `Payment Successfully : ${data.razorpay_payment_id}`,
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //     })
  //     .catch((error) => {
  //       // handle failure
  //       // alert(`Error: ${error.code} | ${error.description}`);
  //       Snackbar.show({
  //         text: `Payment Cancelled : ${error.code} | ${error.description}`,
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //     });
  // }




  const sendnotifications = async () => {
    console.log('xdfcghvjbkn');
    var YOUR_SERVER_KEY =
      'AAAAepVhb4U:APA91bFSLv5k67jaow6kZIgSaymqCRzCdM7AIe2BUkkP2lqkQR4y1Z2Ftpb7Vp-IMrOPjjvTOI_SXuDKz7l9ifFSPn_kYwkfaAmxjhht8DlBsr2IXu_EXt0gMFMoNZ9vnqAhARHIAYkO';
    var Token =route.params.sendmessage;
      
    var FCM_PUSH_URL = 'https://fcm.googleapis.com/fcm/send';

    var msg = 'Today your consulations is available.Please check out';
    var title =  route.params.name;

    return fetch(FCM_PUSH_URL, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        to: Token,
        data: {
          message: 'hello',
        },
        notification: {
          body: msg,
          title: title,
          sound: 'default',
        },

        //body:msg,
        //title:title,
        //sound:'default',
        icon: 'icon_name',
        tag: Token,
        priority: 'high',
        //text:msg,
        //title:title,
        //to:Token,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'key=' + YOUR_SERVER_KEY,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   multicast_id: responseJson.multicast_id,
        //   results: responseJson.results[0].message_id,
        //   success: responseJson.success,
        // });

        setMulticast_id(responseJson.multicast_id)
        setResults(responseJson.results[0].message_id)
        setSuccess(responseJson.results[0].message_id)

        console.log('dxfgchvjb', responseJson.results[0].message_id);

        console.log('dfghj', multicast_id, success, results);
        console.log('rzdxtfcygvhbj', responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const {selectTime, selectDays} = route.params.selectedtime;
  return (
    <View style={styles.container}>
        <ScrollView>
          

          <View style={styles.header}>
            
              <Image
                source={
                  route.params.pic && route.params.pic
                    ? {uri: route.params.pic}
                    : PROFILE
                }
                style={styles.avatar}
              />
            

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.headerText]}>
                {route.params.name}
              </Text>
              <Text
                style={[
                  styles.headerText,
                  {fontSize: 14, fontWeight: '500', color: '#ccc'},
                ]}>
                {route.params.des}
              </Text>
              {/* <Text
                style={
                
                  {fontSize: 14, fontWeight: '500', color: '#000'}
                }>
                {route.params.sendmessage}
              </Text> */}
                     </View>
          </View>

          <View style={styles.rowsContainer}>
            <Text>Purpose</Text>
            <Text style={styles.rowsTitle}>Video Consultation</Text>
          </View>
          <View style={styles.rowsContainer}>
            <Text>Selected Time Slots</Text>
            <Text style={styles.rowsTitle}>
              {selectDays} {selectTime}
              {timeSchedule}
            </Text>
          </View>

          <View style={styles.rowsContainer}>
            <Text>Consultation fee</Text>
            <Text style={styles.rowsTitle}>{'\u20B9'} 700</Text>
          </View>

          <View style={{paddingTop: 10}}>
            <Text style={{padding: 10, fontFamily:'Lato-Light'}}>
              This video is consultation for:
            </Text>
            <View style={styles.userContainer}>
              <Image
                 source={photo && photo ? {uri: photo} : PROFILE}
                
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 25,
                  marginLeft: 20,
                }}
              />
              <Text style={styles.name}>{paymentName}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.footerTitle}>Note:</Text>
            <Text style={styles.footerTitle}>
              1. Updates will be sent to your contact number.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
                paddingHorizontal: 10,
                fontFamily:'Lato-Light'
              }}>
              2. By contacting the video consultation, you agree to  MindBling 
              <Text style={{color: '#4BCFFA'}}>Terms and condition.</Text>You
              can also Pre-pay for this consultation by selecting Pay online
              option. You can read our payment
              <Text style={{color: '#4BCFFA'}}> FAQs.</Text>
            </Text>
          </View>
    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
    <Pressable onPress ={()=> setModalVisible(true)}

  
    style={styles.button}>
            <Text style={{color: 'white', fontSize: 20}}>Free</Text>
          </Pressable>
          {/* <Pressable onPress={_onPressButton} style={[styles.button,{backgroundColor:'#ff6a00'}]}>
            <Text style={{color: 'white', fontSize: 20}}>Pay</Text>
          </Pressable> */}
    </View>
          {modalComponent()}
        </ScrollView>
      </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  gradient: {
    height: 70,
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 10,
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
  icon: {
    height: 30,
    width: 30,
    tintColor: '#000',
    marginLeft: 10,
    padding: 10,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  avatar: {
    height: 85,
    width: 85,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,
    fontFamily:'Lato-Light',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  rowsContainer: {
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',

    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  rowsTitle: {
    fontSize: 18,
    fontFamily:'Lato-Light',
    paddingTop: 5,
  },
  userContainer: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 20,

    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  footerTitle: {
    fontSize: 15,
    color: 'gray',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 20,
  },
  button: {
    height: 50,
   width:150,
    backgroundColor: '#1F6ED4',
    marginHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 15,
    borderRadius: 10,
  },
  iconButton: {
    height: 30,
    width: 30,
    tintColor: '#ccc',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '99%',
    height: '40%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // alignSelf: 'center',
    elevation: 10,
  },

  // mainView: {
  //   height: 90,
  //   width: '95%',
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  //   marginTop: 5,
  //   // backgroundColor:'blue',
  //   // borderBottomColor: '#ddd',
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  // },
});


