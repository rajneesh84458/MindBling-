// import React in our code
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ImageBackground} from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  RefreshControl,
  Dimensions,
} from 'react-native';

import {Card} from 'react-native-paper';
import CustomHeader from '../../components/CustomHeader';
import {PROFILE, USER} from '../../constants/icons';
import {BACKGROUNDHOME} from '../../constants/images';
import {database} from '../../network/config/setup';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const MoreProfile = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const fetchData = () => {
    database()
      .ref('RegisteredTrainers/')
      .once('value', (datasnap) => {
        setLoading(false);
        setFilteredDataSource(Object.values(datasnap.val()));
        setMasterDataSource(Object.values(datasnap.val()));
      });
  };
  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate('profile', {item})}>
        <View style={styles.cardView}>
          <Image
            source={item.photo && item.photo ? {uri: item.photo} : PROFILE}
            style={styles.avatar}
          />

          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.text}>{item.displayName}</Text>
            <Text style={[styles.text, {fontFamily: 'Lato-Light'}]}>
              {item.email}
            </Text>

            {/* <Text style={[styles.text, {fontSize: 14}]}>
              Specialzation:{item.specializedItems}
            </Text> */}
            <View style={{width: width * 0.7}}>
              <Text
                style={{
                  fontFamily: 'Lato-Light',
                  paddingHorizontal: 2,
                  paddingTop: 5,
                }}>
                {item.specializedItems}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const onRefresh = () => {
    //Clear old data of the list
    setFilteredDataSource([]);
    setMasterDataSource([]);
    //Call the Service to get the latest data
    fetchData();
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.5,
          borderColor: '#ccc',
          margin: 10,
          borderRadius: 30,
          padding: 5,
          marginHorizontal: 20,
          backgroundColor: '#fff',
        }}>
        <TextInput
          placeholder="Search your consultant "
          underlineColorAndroid={'transparent'}
          keyboardType="default"
          underlineColorAndroid="transparent"
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          style={styles.textinput}
        />

        <Icon
          name={'search'}
          size={27}
          color="#ff6a00"
          style={{padding: 10, marginLeft: 10}}
        />
      </View>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size="large" color="#ff6a00" />
        </View>
      ) : (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return renderList(item);
          }}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 10,
  },
  searchStyle: {
    height: 40,
    paddingLeft: 15,
    marginVertical: 20,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 5,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginTop: 33,
    right: 80,
    tintColor: '#ccc',
  },
  mycard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 1,
    },
    elevation: 5,
  },
  cardView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    fontSize: 13,
    color: '#000',
    paddingVertical: 2,
  },

  icon: {
    height: 30,
    width: 30,
    tintColor: '#000',
  },
  iconButton: {
    height: 30,
    width: 30,

    tintColor: '#ccc',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textinput: {
    backgroundColor: '#fff',
    fontFamily: 'Lato-Light',
    flex: 1,
    marginLeft: 10,
  },
});

export default MoreProfile;
