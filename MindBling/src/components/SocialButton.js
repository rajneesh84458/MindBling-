import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {GOOGLE} from '../constants/icons';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <Pressable style={[styles.button, {backgroundColor: bgColor}]} {...rest}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        //locations={[0, 0.5]}
        colors={['#0087cb', '#0000A1']}
        style={[styles.button, {flexDirection: 'row'}]}>
        <Image source={GOOGLE} style={{height: 20, width: 20}} />

        <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>
          SignIn with Google
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  linarGradient: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  button: {
    height: 50,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
