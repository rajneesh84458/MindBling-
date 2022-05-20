
import React,{useState,useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity,FlatList,Image,Dimensions } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';

import {

  PROFILE,

} from './constants/icons';
import {Card} from 'react-native-paper';
import { database } from './network/config/setup';
const KEYS_TO_FILTERS = ['expertise','videoCategory'];
const {width, height} = Dimensions.get('window');

const SearchCategory = ({navigation}) => {
  const [dataSource, setdataSource] = useState([])
  const [show, setshow] = useState(false)
  const [ searchTerm, setsearchTerm] = useState('')


useEffect(()=>{
  fetchData()
},[])

 const  fetchData = async () => {
      const mydata = await database().ref('RegisteredTrainers/');
      mydata.once('value', (snapshot) => {
        let data = snapshot.val();
        if (data) {
          let items = Object.values(data);
          setdataSource(items)
      
         
          console.log(dataSource);
        } else {
          return null;
        }
      });
    };
    const    searchUpdated =(term)=> {
           setshow(term)
           setsearchTerm(term)
      
         }

        const  renderList = ({item}) => {
              return (
                <Card
                  style={styles.mycard}
                  onPress={() =>
                    navigation.navigate('profile', {
                      item,
                      name: item.displayName,
                      photo: item.photo,
                    })
                  }>
                  <View style={styles.cardView}>
                   
                      <Image
                        style={styles.img}
                        //source={{uri: item.photo ? item.photo : null}}
                        source={item.photo && item.photo ? {uri: item.photo} : PROFILE}
                      />
                    
          
                    <View style={{marginLeft: 10, flex: 1, padding: 5}}>
                      <Text style={styles.text}>{item.displayName}</Text>
                      
                      <Text
                          style={{
                            fontFamily: 'Lato-Light',
                            paddingHorizontal: 2,
                            paddingTop: 5,
                          }}>
                          {item.specializedItems}
                        </Text>
                      <View style={{width: width * 0.7}}>
                        {/* <Text style={{fontWeight:'bold',paddingHorizontal:2,paddingTop:5,fontFamily:'Quicksand-Bold'}}>{item.specializedItems}</Text> */}
                      </View>
                    </View>
                    <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 10}}>
                      4.5 stars
                    </Text>
                  </View>
                </Card>
              );
            };
      
  const filteredUsers = dataSource.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
  return (
    <View style={styles.container}>
        <SearchInput
          onChangeText={(term) => {searchUpdated(term) }}
          style={styles.searchStyle}
          placeholder="Eg. Health, Career, Sports"
        />
       


<FlatList
          
          data ={show ? filteredUsers :null}
          renderItem={(item, index) => {
            //console.log("indexing data===>", item.index)
             return renderList(item);
          }}
          keyExtractor={(item, index) => item.uid.toString()}
        />
   
      </View>
  )
}

export default SearchCategory

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start'
    },
    emailItem: {
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.3)',
      padding: 10
    },
    emailSubject: {
      color: 'rgba(0,0,0,0.5)'
    },
    searchStyle: {
          height: 50,
          paddingLeft: 15,
          marginVertical: 20,
          borderRadius: 15,
          fontFamily:'Lato-Light',
          fontSize: 20,
          marginHorizontal: 30,
          backgroundColor: '#f4f5f6',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 2,
          },
          elevation: 2,
        },
        mycard: {
          flex:1,
          margin: 10,
          height: 100,
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
        userImg: {
          height: 70,
          width: 70,
          borderRadius: 50,
          marginHorizontal: 20,
          marginVertical: 10,
        },
        img: {
          height: 50,
          width: 50,
        },
  });
