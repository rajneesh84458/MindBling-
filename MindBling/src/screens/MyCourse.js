import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,ImageBackground,Alert, Image
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import {TextInput} from 'react-native-paper';

import {Auth, database, storage} from '../network/config/setup';
import Icon from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

import {GALLERY, VIDEO} from '../constants/icons';

import FormButton from '../components/FormButton';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import { COACH4 } from '../constants/images';
import {useIsFocused,isPaused} from '@react-navigation/native'

const VideoList =[
  {id:1, title :"First Video",thumbnail:'https://images.unsplash.com/photo-1616231589912-4761c2543914?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},
  {id:2, title :"Second Video",thumbnail:'https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},
  {id:3, title :"Third Video",thumbnail:'https://images.unsplash.com/photo-1616149562385-1d84e79478bb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},
  {id:4, title :"Fourth Video",thumbnail:'https://images.unsplash.com/photo-1616243364687-acc4981aad38?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTd8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},
  {id:5, title :"Fifth Video",thumbnail:'https://images.unsplash.com/photo-1611095966422-50a79dd5313b?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMzB8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},
  {id:6, title :"Six Video",thumbnail:'https://images.unsplash.com/photo-1588414643063-eb575f4287ed?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTN8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', videoUrl:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'},

]
const VideoScreen = ({navigation}) => {
  const [description, setDescription] = useState('');
  const videoPlayer = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchVideo, setFetchVideo] = useState([]);
  const [filteredFetchVideo, setFilteredFetchVideo] = useState([]);
  const [duration, setDuration] = useState(0);
  const [isPaused, setPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [data, setdata] = useState(VideoList)
  const [loadVideo, setUploadVideo] = useState(false);
    
  const screenIsFocused  = useIsFocused();

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const onPaused = (newState) => {
    setPaused(!isPaused);
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

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    var ref = await database().ref('RegisteredTrainers/');
  
    ref.once('value', (snapshot) => {
      let data = snapshot.val();
       
      if (data) {
        let items = Object.values(data);
        setFetchVideo(items);
            setFilteredFetchVideo(items);

            setLoading(false);

        // console.log('shdfhkshf', user);
      } else {
        return null;
      }
    });

  };

  


  const renderItemList = ({item})=> {
      return ( 
           <View style={{flex:1,flexDirection:'row',marginTop:20,paddingHorizontal:20, justifyContent: 'space-between',}}>
             <View style={{flexDirection:'row',}}>
              <Image  source ={{uri:item.videoThumbnail}}style ={styles.thumbnailStyle}/>
                 <Text style={{paddingLeft:20,fontFamily:'Lato-Bold',paddingTop:20}}>{item.videoTitle}</Text>            
                
    
             </View>
    
           
               <Icon
                    name="play"
                    size={27}
                    color="#000"
                    style={{padding: 10, marginTop: 20}}
                    onPress ={()=>navigation.navigate('VideoPlay',{item})}
                  />
             {/* </TouchableOpacity> */}
           
           </View>
    
    
      )
    }
  const onRefresh = () => {
    //Clear old data of the list
    setFilteredFetchVideo([]);
    setFetchVideo([]);
    //Call the Service to get the latest data
    fetchData();
  };

  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => fetchData(item)}>
        You have no video at this moment
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 20, fontFamily: 'Lato-Light', padding: 20}}>
        Your Videos
      </Text>

      {loadVideo ? (
        <ActivityIndicator size="large" animating={loadVideo} />
      ) : (
        <View style={{flex:0.8}}>

      
        <FlatList
          
          keyExtractor={(item) => item.index}
           data={fetchVideo}
          //  data={data}
          renderItem={renderItemList}
          ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={loadVideo}
              onRefresh={onRefresh}
            />
          }
        />
          </View>
      )}

      {/* {uploading ? <ActivityIndicator size="large" color="#ff6a00" /> : null}

      <ActivityIndicator size="large" animating={loading} /> */}

      {/* <View style={{ justifyContent: 'center', alignItems: 'center',position: 'absolute', left: 0, right: 0, bottom: 50}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('makeVideo')}
          // onPress={selectVideo}
          style={styles.Btn}>
          <Text style={{color: '#000', fontSize: 55, textAlign: 'center'}}>
            +
          </Text>
          <Text style={{fontSize: 15, fontFamily: 'Lato-Light'}}>
            Upload your video now
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default VideoScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#fff',
     paddingTop:Platform.OS =='android'? 20 :0
  },

  btnTextHolder: {
    borderWidth: 0.5,
    borderColor: 'transparent',
    backgroundColor: '#f4f5f6',
    marginHorizontal: 10,

    // color: '#ccc',
  },

  Btn: {
    padding: 10,
    // backgroundColor: '#005792',
    borderRadius: 10,
  },
  backgroundVideo: {
    height: 230,
    width: '100%',
  },
  mediaControls: {
    height: '18%',

    alignSelf: 'center',
  },
  emptyListStyle: {
   
    paddingTop: 40,
    fontSize: 13,
    textAlign: 'center',
    color: '#ccc',
  },
    thumbnailStyle:{
        width:170,
        height:100,
        resizeMode:'cover'
      },
});




