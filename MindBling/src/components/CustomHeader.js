

import React from 'react'
import { View, Image,TouchableOpacity ,StyleSheet} from 'react-native'
import { BACK } from '../constants/icons';

export default function CustomHeader({navigation,color}) {
    return (
       
           <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}>
            <Image
              source={BACK}
              style={styles.iconButton}
            />
          </TouchableOpacity>
     
    )
}

const styles = StyleSheet.create({
  
iconButton: {
      height: 30,
      width: 30,
      tintColor: '#ccc',
      margin: 10,
      
    },


  });