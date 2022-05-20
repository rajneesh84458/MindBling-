



import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,Modal,TouchableOpacity ,Image,Dimensions} from 'react-native'
import FormButton from '../../components/FormButton'
import { SUCCESSFULL_FIRST } from '../../constants/images'

import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
const {width, height} = Dimensions.get('window');
const VideoScreen = ({route}) => {

const [getData, SetGetData] = useState(route.params.data);
const videoPlayer = useRef(null);
const [color, setColor] = useState(true);
const [countActive, setCountActive] = useState(false);
const [count, setCount] = useState(100);
const [duration, setDuration] = useState(0);
const [paused, setPaused] = useState(true);

const [currentTime, setCurrentTime] = useState(0);
const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
const [isLoading, setIsLoading] = useState(true);
const [modalVisible, setModalVisible] = useState(false)

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

console.log("hello",getData)


  const modalComponent = () => {
    const {displayName} = getData
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
          <TouchableOpacity
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
             
              </TouchableOpacity>
            <View style={styles.modalView}>
              
               <Text>{displayName}</Text>
            
             <Image source ={SUCCESSFULL_FIRST} style={{width:400,height:400}}/>
             <Text style={{fontSize:17, fontFamily: 'Quicksand-Regular',textAlign:'right'}} >Your Consultation is Successfull</Text>
            
            </View>
             
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <FormButton 
        onPress ={()=>setModalVisible(true)}
        buttonTitle ="About Consultant "
         style ={styles.button}/>
        
      </View>
     
{/* <View>
<Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            posterResizeMode={'cover'}
            onProgress={onProgress}
            paused={paused}
            ref={(ref) => (videoPlayer.current = ref)}
            resizeMode={'cover'}
            source={require('../../../assets/sample.mp4')}
            style={styles.backgroundVideo}
            // fullscreen={true}
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
            mainColor={'#ff6a00'}
            playerState={playerState}
            sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
          />
        </View> */}
      
      
      
      
      <Text style={{flex:1,padding:10,fontSize:20,fontFamily:'Quicksand-SemiBold'}}>Upcoming Videos...</Text>
      {modalComponent()}
    </View>
  )
}



export default VideoScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  button: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
     marginBottom:10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '99%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent:'center',
    // alignSelf: 'center',
    elevation: 10,
  },

  mainView: {
    height: 90,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  videoContainer: {
    width: width,
    height: height * 0.28,

    // borderRadius: 10,
    // shadowColor: '#000',
    shadowOpacity: 0.1,
    // shadowRadius: 10,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    elevation: 1,
  },
  backgroundVideo: {
    height: 250,
    width: '100%',
  },
  mediaControls: {
    // height: '100%',
     flex: 1,
    alignSelf: 'center',
  },
})
