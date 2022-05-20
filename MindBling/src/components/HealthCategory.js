

import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'

const HealthCategory = ({navigation,title,image}) => {
    return (
        <View style={styles.clone}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchable}
          onPress={() => alert('hii')}>
          <Image source={image} style={styles.img} />
          <Text style={{    fontFamily:'Lato-Light',fontSize:12}}>{title}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default HealthCategory

const styles = StyleSheet.create({
    clone: {
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
      },
      touchable: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
      },
      img: {
        height: 50,
        width: 50,
      },
})

