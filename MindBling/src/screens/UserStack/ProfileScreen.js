import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
 
  Platform,
  Share,

  SafeAreaView,ImageBackground
} from 'react-native';
import {SHARE, LIKE,  VIDEO, PROFILE} from '../../constants/icons';
import useStatusBar from '../../constants/useStatusBar';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

import { FIRST_THUMBNAIL, FOURTH } from '../../constants/images';
const {width, height} = Dimensions.get('window');
const ProfileScreen = ({route, navigation}) => {
  useStatusBar('dark-content');

  const [getData, SetGetData] = useState(route.params.item);
  const videoPlayer = useRef(null);
  const [color, setColor] = useState(true);
  const [countActive, setCountActive] = useState(false);
  const [count, setCount] = useState(100);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const myCustomShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey,    would like you join flincs \n https://lifeguruapp.page.link/test`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const likeCounter = () => {
    setCountActive(!countActive);
    setCount(countActive ? count - 1 : count + 1);
  };
  const ifLiked = () => {
    setColor(!color);

    if (countActive) {
      // incrementCount();
    }
    likeCounter();
  };

  const likeShareChat = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={ifLiked}>
            <Image
              source={LIKE}
              style={[
                styles.iconButton,
                {tintColor: color ? 'grey' : '#D65F00'},
              ]}
            />
            <Text style={styles.likeshareContainer}> Like </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => myCustomShare()}>
          <Image source={SHARE} style={styles.iconButton} />
          <Text style={styles.likeshareContainer}> Share </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatMessage', { 
              userid:getData.uid, 
              title: getData.displayName,
              avatar: route.params.item.photo
            }
            )}>
          <Image source={COMMENT} style={styles.iconButton} />
          <Text style={styles.likeshareContainer}> Chat</Text>
        </TouchableOpacity> */}
      </View>
    );
  };
// console.log("getTrainer==>",getData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={
              route.params.item.photo && route.params.item.photo
                ? {uri: route.params.item.photo}
                : PROFILE
            }
            style={styles.avatar}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>{getData.displayName}</Text>
            {/* <Text
              style={[styles.textInfo, {fontSize: 14, fontWeight: 'normal'}]}>
              {getData.specializedItems}
            </Text> */}

            <Text style={[styles.textInfo, {fontSize: 14, fontFamily:'Lato-Light'}]}>
              Exp:{getData.experience}
            </Text>
            {/* <Text style={[styles.textInfo, {fontSize: 14, fontFamily:'Lato-Light'}]}>
              Exp:{getData.uid}
            </Text> */}
          </View>
        </View>
        <ImageBackground
        style={styles.backgroundVideo}
  
        source={FIRST_THUMBNAIL}
        
      >
        <View style={styles.backgroundVideo}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            // posterResizeMode={'none'}
            onProgress={onProgress}
            paused={paused}
            ref={(ref) => (videoPlayer.current = ref)}
             resizeMode={'cover'}
            source={ route.params.item.video && route.params.item.video ? {uri:route.params.item.video} : VIDEO}
             style={styles.backgroundVideo}
             fullscreen={true}
             playInBackground={false}
          
            
          />
          <MediaControls
            isFullScreen={true}
            duration={duration}
            isLoading={isLoading}
            progress={currentTime}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            mainColor={'red'}
            playerState={playerState}
            sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
          />
        </View>
        </ImageBackground>
        <View style={{flex: 1}}>{likeShareChat()}</View>

        <View
          style={{
            // flexDirection: 'row',
            height: 80,
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('timeslotsuser', {
                title: route.params.item.displayName,
                titleDes: route.params.item.description,
                profilePic: route.params.item.photo,
                consultation: route.params.item.specializedItems,
                notifyMessage:route.params.item.notifyToken,
                data: getData,
                guestid:getData.uid
              })
            }
            style={styles.button}>
            <Text style={styles.buttonText}>Make your Consultation</Text>
          </TouchableOpacity>
        </View>
 
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('videoScreen', {
                title: route.params.item.displayName,
                titleDes: route.params.item.description,
                profilePic: route.params.item.photo,
                consultation: route.params.item.specializedItems,
                data: getData,
              })
            }
            style={[styles.button,{marginLeft:15}]}>
            <Text style={styles.buttonText}>See Videos</Text>
          </TouchableOpacity>
         */}
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  iconButton: {
    height: 17,
    width: 17,
    margin: 10,
    marginTop: 10,
  },
  imgContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingHorizontal: 12,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
    overflow: 'hidden',
    marginTop: 20,
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 20,
    fontFamily:'Lato-Roboto',
    paddingTop: 5,
  },
  likeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    borderRadius: 15,
    height: 50,
    width: width - 30,
    backgroundColor: '#1F6ED4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  
 
  
  
  nameStyle: {fontSize: 15, paddingTop: 10, paddingLeft: 10},
  likeShareChat: {
    fontSize: 10,
    textAlign: 'center',
  },

  backgroundVideo: {
    height: 250,
     width: '100%',
   
    
      // height: '80%',
     
    
  },
 
});

export default ProfileScreen;



