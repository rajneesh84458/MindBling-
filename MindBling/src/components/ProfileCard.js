import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList,Dimensions} from 'react-native';

import {USER} from '../constants/icons';
import {Card} from 'react-native-paper';
import {Auth} from '../network/config/setup';
const {width,height} = Dimensions.get('window')
const username = Auth().currentUser
  ? Auth().currentUser.displayName
  : 'unknown user';
const profilePic = Auth().currentUser
  ? Auth().currentUser.photoURL
  : 'unknown user';

export default function ProfileCard(props) {
  // console.log("Postcard==>",props.details)
  const [data, setData] = useState(props.details);

  const navigation = props.navigation;


  const renderList = ({item}) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() =>
          navigation.navigate('profile', {
            item,
            name: username,
            photo: profilePic,
          })
        }>
        <View style={styles.cardView}>
          {item.photo === '' ? (
            <Image source={USER} style={styles.img} />
          ) : (
            <Image
              style={styles.img}
              //source={{uri: item.photo ? item.photo : null}}
              source={item.photo && item.photo ? {uri: item.photo} : USER}
            />
          )}

          <View style={{marginLeft: 10, flex: 1, padding: 5}}>
            <Text style={styles.text}>{item.displayName}</Text>
            <Text style={styles.text}>{item.email}</Text>
             <View style={{width:width*0.7}}>
             <Text style={{fontWeight:'bold',paddingHorizontal:2,paddingTop:5,fontFamily:'Quicksand-Bold'}}>{item.specializedItems}</Text>
             </View>
        
           
          </View>
          <Text style={{color: 'blue', fontWeight: 'bold',fontSize:10}}>4.5 stars</Text>
        </View>
      </Card>
    );
  };
  return (
        <FlatList
       horizontal
        data={data}
        renderItem={(item, index) => {
          //console.log("indexing data===>", item.index)
          if (item.index < 3) return renderList(item);
        }}
        keyExtractor={(item, index) => index.toString()}
      />
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  mycard: {
    width:300,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    // shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
  },

  footerText: {fontSize: 18, color: '#e5e5e5'},
  footer: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },

  img: {width: 60, height: 60, borderRadius: 30},
});
