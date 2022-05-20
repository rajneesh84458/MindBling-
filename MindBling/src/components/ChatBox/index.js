// import React,{useEffect,useState} from "react";
// import { View, Text, Image,TouchableOpacity } from "react-native";
// import { Card, CardItem } from "native-base";
// import { deviceWidth } from "../../utility/styleHelper/appStyle";
// // import { uuid } from "../../utility/constants";
// import styles from "./styles";
// import { color } from "../../utility";
// import AsyncStorage from "@react-native-community/async-storage";
// import { Auth } from "../../network/config/setup";


// const ChatBox = ({ userId, msg, img, onImgTap,guestUserId }) => {
//   const [currentId, setcurrentId] = useState(null)
//   let isCurrentUser = userId === currentId ? true : false;

//   console.log("userid====>",userId)
//   console.log("current id====>",Auth().currentUser.uid)

//   useEffect(() => {
// getLocalData()
//     return () => {
   
//     }
//   }, [])
//   const getLocalData = async () => {
//     await AsyncStorage.getItem('userLogin')
//       .then((value) => {
//         const user = JSON.parse(value);
//      console.log(user)
//     //  setUserid(user.userid)
//     //  setPaymentName(user.username)
//     // setPhoto(user.userPhoto)
//     // setToken(user.notifyToken)
//       setcurrentId(user.userid)
//         // alert(`${user.username} ${user.userid}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <Card
//       transparent
//       style={{
//         maxWidth: deviceWidth / 2 + 10,
//         alignSelf: isCurrentUser ? "flex-end" : "flex-start",
//       }}
//     >
//       <View
//         style={[
//           styles.chatContainer,
//           isCurrentUser && {
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 0,
//             backgroundColor: color.DARK_GRAY,
//           },
//         ]}
//       >
//         {img ? (
//           <CardItem cardBody>
//             <TouchableOpacity onPress={onImgTap}>
//               <Image
//                 source={{ uri: img }}
//                 resizeMode="cover"
//                 style={{ height: 200, width: deviceWidth / 2 }}
//               />
//             </TouchableOpacity>
//           </CardItem>
//         ) : (
//           <Text
//             style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]}
//           >
//             {msg}
//           </Text>
//         )}
//       </View>
//     </Card>
//   );
// };

// export default ChatBox;








import React,{useState,useEffect} from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../utility/styleHelper/appStyle";
// import { uuid } from "../../utility/constants";
import styles from "./styles";
import { color } from "../../utility";
import AsyncStorage from "@react-native-community/async-storage";
import { Auth } from "../../network/config/setup";


const ChatBox = ({ userId, msg, img, onImgTap}) => {
  // const [currentId, setcurrentId] = useState(null)
  let isCurrentUser = Auth().currentUser.uid ===Auth().currentUser.uid ? true : false;
      // console.log("userid==>",userId)

  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            backgroundColor: color.DARK_GRAY,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: deviceWidth / 2 }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]}
          >
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;
