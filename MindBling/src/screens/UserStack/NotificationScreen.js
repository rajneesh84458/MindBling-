import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {messaging} from '../../network/config/setup';

const NotificationScreen = () => {
  const [multicast_id, setMulticast_id] = useState('');
  const [success, setSuccess] = useState('');
  const [results, setResults] = useState('');

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  
  // const getLocalData = async () => {
  //   await AsyncStorage.getItem('userLogin')
  //     .then((value) => {
  //       const user = JSON.parse(value);
  //        console.log(user)
  //       // setDisplayName(user.username);
  //       // setPhotoURL(user.userPhoto);
  //       // alert(`${user.username} ${user.userid}`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    // getLocalData()
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log('token====>', fcmToken);
          // user has a device token
        } else {
          // user doesn't have a device token yet
        }
      });
    // checkNotification()
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //   console.log("message ",JSON.stringify(remoteMessage))
    });

    return unsubscribe;
  }, []);

  const sendnotifications = async () => {
    console.log('xdfcghvjbkn');
    var YOUR_SERVER_KEY =
      'AAAAepVhb4U:APA91bFSLv5k67jaow6kZIgSaymqCRzCdM7AIe2BUkkP2lqkQR4y1Z2Ftpb7Vp-IMrOPjjvTOI_SXuDKz7l9ifFSPn_kYwkfaAmxjhht8DlBsr2IXu_EXt0gMFMoNZ9vnqAhARHIAYkO';
      // receiver token
    var Token =
    "eTFIt1MFTrqfGGHMYCb8-k:APA91bFXlCPnG-1k7ngYB-ttvOg31NQLBczHoy91P8nseCDi7TOgIh7Rdv1qW5yHUBZ6WmvHf_V5xaPnC3Vc-abGn0vh4FBMsHx710lknCCWFTVmXcnzzA7Ju17D9577PxHSdUNHoNOh";
    var FCM_PUSH_URL = 'https://fcm.googleapis.com/fcm/send';

    var msg = 'You have one appointment';
    var title = 'Hello John';

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
         console.log("result",responseJson)
        setMulticast_id(responseJson.multicast_id)
        setResults(responseJson.results[0].message_id)
        setSuccess(responseJson.results[0].message_id)

        console.log('messageid', responseJson.results[0].message_id);

        console.log('dfghj', multicast_id, success, results);
        console.log('rzdxtfcygvhbj', responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notification</Text>
      <TouchableOpacity
        onPress={sendnotifications}
        style={{backgroundColor: 'red', padding: 20}}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
