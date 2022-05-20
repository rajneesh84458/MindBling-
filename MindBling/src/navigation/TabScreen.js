import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS, FONTS} from '../constants/theme';
import {
  ADDITION,
  TABUSER,
  HOME,
  CONNECTION,
  VIDEO_GALLERY,
} from '../constants/icons';


import HomeScreen from '../screens/UserStack/HomeScreen';
import MyCourse from '../screens/MyCourse';
import Community from '../screens/Community';
import UserAccount from '../screens/UserStack/UserAccount';

import VideoCall from '../screens/UserStack/VideoCall';
import MoreProfile from '../screens/UserStack/MoreProfile';
import SearchCategory from '../SearchCategory';
import ProfileScreen from '../screens/UserStack/ProfileScreen';
import VideoScreen from '../screens/UserStack/VideoScreen';
import PaymentScreen from '../screens/UserStack/PaymentScreen';
import TimeSlotScreen from '../screens/UserStack/TimeSlotScreen';
import RequestAppointment from '../screens/UserStack/RequestAppointment';
import NotificationScreen from '../screens/UserStack/NotificationScreen';
import ChatMessage from '../screens/UserStack/chat/ChatMessage';
import VideoPlayScreen from '../screens/UserStack/VideoPlayScreen';


const Tab = createBottomTabNavigator();

// const TabBarCustomButton = ({children, onPress}) => {
//   return (
//     <TouchableOpacity
//       style={{
//         top: -20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...styles.shadow,
//       }}
//       onPress={onPress}>
//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={{
//           width: 70,
//           height: 70,
//           borderRadius: 35,
//         }}>
//         {children}
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };


const HomeStack = createStackNavigator();

function HomeStackScreen (){
  return (
    <HomeStack.Navigator initialRouteName="home">
      <HomeStack.Screen name ="home" component={HomeScreen}options={{headerShown: false}}/>
      <HomeStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <HomeStack.Screen
        name="requestTrainer"
        component={RequestAppointment}
        options={{
          title: 'My Appointments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
        }}
      />
      <HomeStack.Screen
        name="ChatMessage"
        component={ChatMessage}
        options={({route}) => ({
          title: route.params.item.trainerName,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 1,
            shadowColor: '#ccc',
          },
        })}
      />
         <HomeStack.Screen
        name="seeMore"
        component={MoreProfile}
        options={{
          title: 'back',
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <HomeStack.Screen
        name="searchquery"
        component={SearchCategory}
        options={{
          title: 'Search your Problem',
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
          },
        }}
      />

<HomeStack.Screen
        name="timeslotsuser"
        component={TimeSlotScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          title: 'Schedule',
          headerStyle: {
            elevation: 0,
          },
        }}
        // options={{headerShown: false}}
      />
       <HomeStack.Screen
        name="gotoPay"
        component={PaymentScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          title: 'Make Your Appointment',
          headerStyle: {
            elevation: 0,
          },
        }}
      />

    </HomeStack.Navigator>
  )
}

const Stack = createStackNavigator();





const UserStack = createStackNavigator();

   function UserStackScreen(){
   return (
   <UserStack.Navigator initialRouteName="useAccount">
   <UserStack.Screen
        name="userAccount"
        component={UserAccount}
        options={{headerShown: false}}
      />
            <UserStack.Screen
        name="requestTrainer"
        component={RequestAppointment}
        options={{
          title: 'My Appointments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
        }}
      />
      {/* <UserStack.Screen
        name="Chat"
        component={Chat}
     options={{title: 'Chat Rooms', headerBackTitleVisible: false}}
      /> */}
      {/* <UserStack.Screen
        name="ChatMessage"
        component={ChatMessage}
        options={({route}) => ({
          title: route.params.item.trainerName,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 1,
            shadowColor: '#ccc',
          },
        })}
      /> */}

      <UserStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
        }}
      />
   </UserStack.Navigator>
)
   }


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="userupdate"
        component={UserUpdate}
        // options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="userAccount"
        component={UserAccount}
      options={{headerShown: false}}
      />
      {/* <Stack.Screen
          name="trainerVideo"
          component={TrainerVideo}
          // options={{headerShown: false}}
        /> */}

      <Stack.Screen
        name="chatRooms"
        component={ChatRooms}
        options={{title: 'Chat Rooms', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Video"
        component={VideoCall}
        options={{title: 'Chat Rooms', headerBackTitleVisible: false}}
      />
      {/* <Stack.Screen
        name="ChatMessage"
        component={ChatMessage}
        options={({route}) => ({
          title: route.params.item.trainerName,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 1,
            shadowColor: '#ccc',
          },
        })}
      /> */}

   
     
      <Stack.Screen
        name="videoScreen"
        component={VideoScreen}
        options={{
          title: 'Videos',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            elevation: 0,
          },
        }}
      />
     

    </Stack.Navigator>
  );
}

const VideoStack = createStackNavigator();
function VideoStackScren() {
  return (
    <VideoStack.Navigator initialRouteName="VideoScreen">
      <VideoStack.Screen
        name="VideoScreen"
        component={MyCourse}
        options={{headerShown: false}}
      />
      <VideoStack.Screen
        name="VideoPlay"
        component={VideoPlayScreen}
        options={{
          title: 'back',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Lato-Light',
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 1,
            shadowColor: '#ccc',
          },
        }}
      />
    </VideoStack.Navigator>
  );
}



const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
  
       
          elevation: 0,
          backgroundColor: '#fff',
          borderTopColor: '#ccc',
          height: 60,
        
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={HOME}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Connections"
        component={Community}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={CONNECTION}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                }}>
                Community
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Video Gallery"
        component={VideoStackScren}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={VIDEO_GALLERY}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                }}>
                Video
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="userAccount"
        component={UserStackScreen}
        options={{
       
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={TABUSER}
                resizeMode="contain"
                style={{
                 
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                }}>
                User
              </Text>
            </View>
          ),
          
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Tabs;
