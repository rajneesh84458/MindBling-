import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  View,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {FIRST, SECOND, THIRD,FOURTH} from '../constants/images';
const slides = [
  {
    key: 'one',
    title: 'Take the High Jump \n...Become a Lifeguard',
    text:
      'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
    image: FIRST,
  },
  {
    key: 'two',
    title: `Float your career \n...become a Lifeguard`,
    text:
      'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
    image: SECOND,
  },
  {
    key: 'three',
    title: 'Belong Everywhere',
    text:
      'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
    image: FOURTH,
  },
];
const {width, height} = Dimensions.get('window');

export default function OnboardingScreen({navigation}) {
  const [showHomePage, setHomePage] = useState(false);

  const _renderItem = ({item}) => {
    return (
      <ImageBackground source={item.image} style={{width, height}}>
        <View style={{width, height, backgroundColor: 'rgba(38,56,89,0.3)'}}>
          <Text
            style={{
              paddingTop: 25,
              paddingBottom: 10,
              fontSize: 23,
              fontWeight: 'bold',
              color: '#fff',
              alignSelf: 'center',
            }}>
            {item.title}
          </Text>

          {/* <Text
            style={{
              textAlign: 'center',
              color: '#b5b5b5',
              fontSize: 15,
              paddingHorizontal: 30,
            }}>
            {item.text}
          </Text> */}
        </View>
      </ImageBackground>
    );
  };

   const _onDone = () => {
    setHomePage(true);
    const trainerLogin =  AsyncStorage.getItem('trainerLogin')

    if(trainerLogin){
      console.log("trainerLogin===>",trainerLogin)
      navigation.replace('home')
      
    }
    else{
      console.log("signin")
      navigation.replace('phoneAuth');
    }
    }
   
  const _onSkip = () => {
    setHomePage(true);
    navigation.replace('phoneAuth');
  };
  return (
    <>
    <StatusBar hidden/>
    <AppIntroSlider
      onDone={_onDone}
      showSkipButton={true}
      onSkip={_onSkip}
      renderItem={_renderItem}
      data={slides}
      activeDotStyle={{
        backgroundColor: '#21465b',
        width: 30,
      }}
    />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
