


import React from 'react';
import {Text, TouchableOpacity, StyleSheet,Dimensions, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width,height} = Dimensions.get('window')

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <Pressable style={styles.button} {...rest}>
         <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0.7}}
            locations={[0, 0.5]}
            colors={['#ee0979', '#ff6a00']}
            style={styles.linarGradient}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default FormButton;

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
        width: '60%',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom:10
      },
  buttonText: {
   fontSize: 18, color: 'white'
  },
});
