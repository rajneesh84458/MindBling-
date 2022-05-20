import React,{useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PhoneAuth from '../screens/UserStack/PhoneAuth';

import Tabs from './TabScreen';

import { Auth } from '../network/config/setup';
import GoogleLogin from '../screens/UserStack/GoogleLogin';



// function MyStack() {

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="splash">
       
//         <Stack.Screen
//           name="phoneAuth"
//           component={PhoneAuth}
//           options={{headerShown: false}}
//         />
       
 
       
       

//         <Stack.Screen
//           name="userupdate"
//           component={UserUpdate}
//           options={{title: 'My Account', headerBackTitleVisible: false}}
//         />

//         <Stack.Screen
//           name="userAccount"
//           component={UserAccount}
//         //  options={{title: 'Edit Profile', headerBackTitleVisible: false}}
//         />

//         <Stack.Screen
//           name="home"
//           component={Tabs}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="trainerVideo"
//           component={TrainerVideo}
//           // options={{headerShown: false}}
//         />

//         <Stack.Screen
//           name="chatRooms"
//            component={ChatRooms}
//           options={{title: 'Chat Rooms', headerBackTitleVisible: false}}
       

//         />
//         <Stack.Screen
//           name="Video"
//            component={VideoCall}
//           options={{title: 'Chat Rooms', headerBackTitleVisible: false}}
       

//         />
//         <Stack.Screen
//           name="ChatMessage"
//           component={ChatMessage}
//           options={({route}) => ({
//             title: route.params.item.trainerName,
//             headerBackTitleVisible: false,
//             headerTitleStyle: {
//               fontFamily: 'Lato-Light',
//             },
//             headerStyle: {
//               backgroundColor: '#fff',
//               elevation: 1,
//               shadowColor: '#ccc',
//             },
//           })}
//         />
        
//         
//         <Stack.Screen
//           name="searchquery"
//           component={SearchCategory}
//           options={{
//             title: 'Search your Problem',
//             headerTitleStyle:{
//             fontFamily:'Lato-Light'
//             },
//             headerBackTitleVisible: false,
//             headerStyle: {
//               elevation: 0,
            
//             },
//           }}
//         />
//         <Stack.Screen
//           name="profile"
//           component={ProfileScreen}
//           options={{
//             title: 'Profile',
//             headerTitleStyle:{
//               fontFamily:'Lato-Light'
//               },
//             headerStyle: {
//               elevation: 0,
//             },
//           }}
//         />
//         <Stack.Screen
//           name="videoScreen"
//           component={VideoScreen}
//           options={{
//             title: 'Videos',
//             headerBackTitleVisible: false,
//             headerTitleStyle:{
//               fontFamily:'Lato-Light'
//               },
//             headerStyle: {
//               elevation: 0,
//             },
//           }}
//         />
//         <Stack.Screen
//           name="gotoPay"
//           component={PaymentScreen}
//           options={{
//             headerTitleStyle:{
//               fontFamily:'Lato-Light'
//               },
//             title: 'Make Your Appointment',
//             headerStyle: {
//               elevation: 0,
//             },
//           }}
//         />

//         <Stack.Screen
//           name="timeslotsuser"
//           component={TimeSlotScreen}
//           options={{
//             headerTitleStyle:{
//               fontFamily:'Lato-Light'
//               },
//             title: 'Schedule',
//             headerStyle: {
//               elevation: 0,
//             },
//           }}
//           // options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="requestTrainer"
//           component={RequestAppointment}
//           options={{title: 'My Appointments', headerBackTitleVisible: false, headerTitleStyle:{
//             fontFamily:'Lato-Light'
//             },}}
//         />
//         <Stack.Screen
//           name="Notification"
//           component={NotificationScreen}
//           options={{title: 'Notifications', headerBackTitleVisible: false, headerTitleStyle:{
//             fontFamily:'Lato-Light'
//             },}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




const AuthStack = createStackNavigator();

function AuthStackScreen (){
  return (
        <AuthStack.Navigator>
        
        <AuthStack.Screen
          name="phoneAuth"
          component={PhoneAuth}
          options={{headerShown: false}}
        />
        {/* <AuthStack.Screen
          name="googleAuth"
          component={GoogleLogin}
          options={{headerShown: false}}
        /> */}
       

        </AuthStack.Navigator>
  )
}

// export default function Router(props) {
//   return (
//     <View style={{flex: 1}}>
//       <MyStack {...props} />
//     </View>
//   );
// }




export default function Router() {
  const [user, setUser] = useState('');

  useEffect(() => {
     
    const subscriber = Auth().onAuthStateChanged((userexit)=>{
          if(userexit){
           setUser(userexit)
          }
          else{
            setUser('')
          }
    });

  return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <NavigationContainer>
    
     
      {user ? <Tabs/> : <AuthStackScreen/>}
  
      </NavigationContainer>
   
  );
}