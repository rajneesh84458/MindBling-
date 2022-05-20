







import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle, color, appStyle } from "../../../utility";
import { deviceHeight } from "../../../utility/styleHelper/appStyle";
import { smallDeviceHeight } from "../../../utility/constants";
import moment from 'moment'

import { Auth, database } from "../../../network/config/setup";
import { recieverMsg, senderMsg } from "../../../network/config/messeges";
import styles from "./styles";
import InputField from "../../../components/FieldInput";
import ChatBox from "../../../components/ChatBox";

const Chat = ({ route, navigation }) => {

  // const { params } = route;
  // const { name, img, imgText, guestUserId, currentUserId, } = params;

  const { guestid,Name,uid,trainerpic,trainerName } = route.params.item;
  const guestUserId =guestid;
  const name=Name;
  const currentUserId =uid;
  const img =trainerpic;
  const imgText ="Hello I am ";
  const [msgValue, setMsgValue] = useState("");
  const [messeges, setMesseges] = useState([]);

  

  useEffect(() => {
     
    try {
    
        database()
        .ref("messeges")
        .child(currentUserId)
        .child(guestUserId)
        .on("value", (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
              createdAt:child.val().messege.createdAt
            });
          });
          setMesseges(msgs.reverse());
          
        });
    } catch (error) {
      alert(error);
    }

  }, []);

  const handleSend = () => {
   
    setMsgValue("");
    if (msgValue) {
      senderMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {})
        .catch((err) => alert(err));
         
      // * guest user

      recieverMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {
             
        })
        .catch((err) => alert(err));

        // notification send
          
        
    }
  };





  const handleCamera = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log("User cancel image picker");
      } else if (response.error) {
        console.log(" image picker error", response.error);
      } else {
        // Base 64
        let source = "data:image/jpeg;base64," + response.data;

        senderMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));

        // * guest user

        recieverMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));
      }
    });
  };

  const handleOnChange = (text) => {
    setMsgValue(text);
  };

  //   * On image tap
  // const imgTap = (chatImg) => {
  //   navigation.navigate("ShowFullImg", { name, img: chatImg });
  // };
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
      >
       {/* <Text>{moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a')}</Text>  */}
        <TouchableWithoutFeedback
          style={[globalStyle.flex1]}
          onPress={Keyboard.dismiss}
        >
          <Fragment>
  
            <FlatList
             style={{backgroundColor:'#ccc'}}
              inverted
              data={messeges}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => 
              (
                 
                <ChatBox
                  msg={item.msg}
                  userId={Auth().currentUser.uid}
                  img={item.img}
                   createdAt={moment(item.createdAt).utcOffset('+05:30').format(' hh:mm a')}

               
                  // onImgTap={() => imgTap(item.img)}
                  
                />
        
              )}
            />

            {/* Send Message */}
            <View style={styles.sendMessageContainer}>
              <InputField
                placeholder="Type Here"
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />
              <View style={styles.sendBtnContainer}>
                <MaterialCommunityIcons
                  name="camera"
                  color={color.WHITE}
                  size={28}
                  onPress={() => handleCamera()}
                />

        
                <MaterialCommunityIcons
                  name="send-circle"
                  color={color.WHITE}
                  size={28}
                  onPress={() => handleSend()}
                />
                
                
              </View>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;


