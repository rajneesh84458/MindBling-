

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
 import messaging from '@react-native-firebase/messaging';

import dynamicLinks from '@react-native-firebase/dynamic-links';

const firebaseConfig = {
  apiKey: "AIzaSyBMG-2WR8glKatacCnETlh3BgdRO0IVhKY",
  authDomain: "lifecoachapp-dba3b.firebaseapp.com",
  projectId: "lifecoachapp-dba3b",
  storageBucket: "lifecoachapp-dba3b.appspot.com",
  messagingSenderId: "69515373797",
  appId: "1:69515373797:web:72322ebc945514b5d4380c",
  measurementId: "G-HCFTG3M9TL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  Auth,
  database,
  storage,
   messaging,
  dynamicLinks,
 


};

//https://github.com/liplylie/ReactNativeChatImageAudio/blob/master/src/components/chat.js