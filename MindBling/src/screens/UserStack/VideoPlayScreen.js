// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   RefreshControl,ImageBackground,Alert
// } from 'react-native';

// import Snackbar from 'react-native-snackbar';
// import {TextInput} from 'react-native-paper';

// import {Auth, database, storage} from '../../network/config/setup';
// import Icon from 'react-native-vector-icons/Entypo';

// import ImagePicker from 'react-native-image-picker';
// import Video from 'react-native-video';

// const {width, height} = Dimensions.get('window');

// import {GALLERY, VIDEO} from '../../constants/icons';

// import FormButton from '../../components/FormButton';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
// import { COACH4 } from '../../constants/images';
// import {useIsFocused,isPaused} from '@react-navigation/native'
// const VideoPlayScreen = ({route}) => {
// //   const [getVideo,setgetVideo] = useState(route.params.item)
//   const {video,videoThumbnail,description,videoTitle}= route.params.item
//   console.log("helkehlehkehkhekhkrhkerh",video)
// //   const [description, setDescription] = useState('');
//   const videoPlayer = useRef(null);
//   const [videoSource, setVideoSource] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [fetchVideo, setFetchVideo] = useState([]);
//   const [filteredFetchVideo, setFilteredFetchVideo] = useState([]);
//   const [duration, setDuration] = useState(0);
//   const [isPaused, setPaused] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [title, setTitle] = useState('');
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
//   const [loadVideo, setUploadVideo] = useState(false);

//   const screenIsFocused  = useIsFocused();

//   const onSeek = (seek) => {
//     videoPlayer?.current.seek(seek);
//   };

//   const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

//   const onPaused = (newState) => {
//     setPaused(!isPaused);
//     setPlayerState(newState);
//   };

//   const onReplay = () => {
//     videoPlayer?.current.seek(0);
//     setCurrentTime(0);
//     if (Platform.OS === 'android') {
//       setPlayerState(PLAYER_STATES.PAUSED);
//       setPaused(true);
//     } else {
//       setPlayerState(PLAYER_STATES.PLAYING);
//       setPaused(false);
//     }
//   };

//   const onProgress = (data) => {
//     if (!isLoading) {
//       setCurrentTime(data.currentTime);
//     }
//   };

//   const onLoad = (data) => {
//     setDuration(Math.round(data.duration));
//     setIsLoading(false);
//   };

//   const onLoadStart = () => setIsLoading(true);

//   const onEnd = () => {
//     setPlayerState(PLAYER_STATES.ENDED);
//     setCurrentTime(duration);
//   };

//   const handleRemoveVideo = (item) => {
//     Alert.alert(
//       'Logout',
//       'Are you sure want to delete this video',
//       [
//         {
//           text: 'Yes',
//           onPress: ()=>removeVideo(item),
//         },
//         {
//           text: 'No',
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const renderToolbar = () => (
//     <View>
//       <Text style={styles.toolbar}> toolbar </Text>
//     </View>
//   );

//   const renderData = (item) => {
//     if (Platform.OS === 'ios') {
//       return (
//         <View>
//           <Video
//             controls={true}
//             resizeMode={'cover'}
//             source={video && video ? {uri:video} : GALLERY}
//             style={styles.backgroundVideo}
//             // fullscreen={true}
//           />

//           <View>
//             <Text
//               style={{padding: 10, fontSize: 12, fontFamily: 'Roboto-Light',color:'#000'}}>
//               {description}
//             </Text>
//           </View>
//         </View>
//       );
//     } else {
//       return (
//         <View>
//           <ImageBackground
//         style={styles.backgroundVideo}

//         source={videoThumbnail && videoThumbnail ? {uri: videoThumbnail} : GALLERY}
//       >
//             <View style={{flex:1}}>
//             <Video
//               onEnd={onEnd}
//               onLoad={onLoad}
//               onLoadStart={onLoadStart}
//               // posterResizeMode={'cover'}
//               onProgress={onProgress}
//               paused={isPaused || (!screenIsFocused)}
//               ref={(ref) => (videoPlayer.current = ref)}
//               resizeMode={'cover'}
//               source={video && video ? {uri: video} : VIDEO}
//               style={styles.backgroundVideo}
//               // controls
//               // fullscreen={true}
//             />
//             <MediaControls
//               // isFullScreen={true}
//               duration={duration}
//                isLoading={isLoading}
//               progress={currentTime}
//               onPaused={onPaused}
//               // onReplay={onReplay}
//               onSeek={onSeek}
//               onSeeking={onSeeking}
//               mainColor={'black'}
//               playerState={playerState}
//               // toolbar={renderToolbar()}
//               sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
//               style={styles.mediaControls}
//             />
//           </View>
//           </ImageBackground>

//             {/* <Icon name="trash" size={22} color="red" style={{alignSelf:'flex-end',padding:5}}  onPress={() => handleRemoveVideo(item)} /> */}
//           <View>
//             <Text
//               style={{
//                 padding: 10,
//                 fontSize: 18,

//                fontFamily: 'Lato-Light',
//               }}>
//               {videoTitle}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 12,
//                fontFamily: 'Lato-Light',
//                 color: '#000',
//                 paddingLeft: 10,
//                 marginBottom:10,
//               }}>
//               {description}
//             </Text>
//           </View>
//         </View>
//       );
//     }
//   };

//   const removeVideo = (item) => {
//     database()
//       .ref('MyCourses/', item.key)
//       .remove()
//       .then(() => {
//         Snackbar.show({
//           text: 'Removed Successfully',
//           duration: Snackbar.LENGTH_SHORT,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <View style={{flex: 1}}>

//       {loadVideo ? (
//         <ActivityIndicator size="large" animating={loadVideo} />
//       ) : (
//         <View style={{flex:0.8}}>

//         {renderData()}

//           </View>
//       )}

//     </View>
//   );
// };

// export default VideoPlayScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//   },

//   btnTextHolder: {
//     borderWidth: 0.5,
//     borderColor: 'transparent',
//     backgroundColor: '#f4f5f6',
//     marginHorizontal: 10,

//     // color: '#ccc',
//   },

//   Btn: {
//     padding: 10,
//     // backgroundColor: '#005792',
//     borderRadius: 10,
//   },
//   backgroundVideo: {
//     height: 230,
//     width: '100%',
//   },
//   mediaControls: {
//     height: '28%',

//     alignSelf: 'center',
//   },
//   emptyListStyle: {

//     paddingTop: 40,
//     fontSize: 13,
//     textAlign: 'center',
//     color: '#ccc',
//   },
// });

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
ScrollView,
Platform
} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused, isPaused} from '@react-navigation/native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {VIDEO, GALLERY} from '../../constants/icons';

const VideoPlayScreen = ({route}) => {
  const {
    video,
    videoThumbnail,
    Videodescription,
    videoTitle,
  } = route.params.item;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const screenIsFocused = useIsFocused();
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  const onSeek = (seek) => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!isPaused);
    setPlayerState(playerState);
  };

  // const onReplay = () => {
  //   setPlayerState(PLAYER_STATES.PLAYING);
  //   videoPlayer.current.seek(0);
  // };

     const onReplay = () => {
       videoPlayer.current.seek(0);
       setCurrentTime(0);
       if (Platform.OS === 'android') {
         setPlayerState(PLAYER_STATES.PAUSED);
         setPaused(true);
       } else {
        setPlayerState(PLAYER_STATES.PLAYING);
        setPaused(false);
       }
     }



  const onProgress = (data) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
    // setPaused(true);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'contain') setScreenType('cover');
    else setScreenType('contain');
  };

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <ScrollView contentContainerStyle={{ flex:1,backgroundColor: '#000'}}>
      <View style={styles.mediaPlayer}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={isPaused || !screenIsFocused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source ={require('../../../assets/sample.mp4')}
          // source={video && video ? {uri: video} : VIDEO}
          style={styles.mediaPlayer}
          volume={10}
          playInBackground={false}
        />

        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#000"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
        />
      </View>

      <View style={styles.videoFooter}>
        <Text
          style={styles.videoFooterText}>
          {videoTitle}
        </Text>
        <Text
          style={[styles.videoFooterText,{fontSize:12,letterSpacing:1.5}]}>
          {Videodescription}
        </Text>
      </View>
    </ScrollView>
  );
};

export default VideoPlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  mediaPlayer: {
    
    position: 'absolute',
    top: 0,
    left: 0,
    bottom:0,
  //  marginVertical:50,
    right: 0,
  
    backgroundColor: '#000',
    justifyContent: 'center',
  },
 
  videoFooter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 10,
    right: 0,
    justifyContent: 'flex-end',
    paddingTop: 20,
  },
  videoFooterText:{
    fontSize: 15,
    color: '#fff',
    paddingLeft: 10,
    fontFamily: 'Lato-Light',
    paddingTop: 10,
  }
});
