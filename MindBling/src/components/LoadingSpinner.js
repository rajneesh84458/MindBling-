import React, {useState} from 'react';
import {StyleSheet, Text, View,ActivityIndicator} from 'react-native';

const LoadingSpinner = () => {
  const [loading, setloading] = useState(false);
  return (
  
      <View style={styles.modalMain}>
        <ActivityIndicator size="large" color="#000" />
     
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    modalMain: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
