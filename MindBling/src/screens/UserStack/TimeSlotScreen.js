

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import {Auth, database} from '../../network/config/setup';

const {width, height} = Dimensions.get('window');

const _format = 'ddd-DD-MMM';
export default function TimeSlotScreen({navigation, route}) {
  const [data, setData] = useState([route.params.data]);
  const [selectDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');




  const renderTimeSlot = (item) => {
    return (
      <View style={{height:400,}}>
        <Calendar
       
          markedDates={customMarkedDates}
          onDayPress={(day) => onDayPress(day)}
           disabledByDefault={true}
          style={styles.calendar}
        />
        <View
          style={{
            // height: 'auto',
            padding: 10,
            width: width,
            borderWidth: 0.5,
            borderColor: '#3399FF',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ecf7fc',
          }}>
          <Text>Today's available time slot</Text>
          <Text style={{color: '#1F6ED4', fontSize: 20}}>
              {item.timeSchedule.length} slots
          </Text>
        </View>
      </View>
    );
  };

  const onDayPress = (day) => {
    const _selectedDay = moment(day.dateString).format(_format);
    var found = getIndex(_selectedDay, selectDays);
    
    if (found === -1) {
      console.log('hello', _selectedDay);
      setSelectedDays(_selectedDay);
    }

    else if(arrayOfDates !==d){
      alert('sdfsfs')
    }
  };

  const getIndex = (value, arr) => {
    for (var i = 0; i > arr.length; --i) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  };

  const arrayOfDates = data.map((item, i) => item.selectedDay);

  var customMarkedDates = {};
  arrayOfDates.map((day, i) => {
    console.log(
      'day==>',
      day.map((item) => item),
    );

    var my = day;
    my.map((item) => {
      customMarkedDates[item] = {
        selected: true,
        marked: true,
        selectedColor: '#1F6ED4',
      };
    });
  });

  const onPressTime = (item) => {
    setSelectedTime(item);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingVertical:20}}>

      
      <FlatList
        keyExtractor={(index) => index.toString()}
        data={data}
        renderItem={({item}) => renderTimeSlot(item)}
        // contentContainerStyle={{height: 300,marginTop:20}}
      />

      <ScrollView
        horizontal={true}
        contentContainerStyle={{height: 40,marginVertical:20}}
        showsHorizontalScrollIndicator={false}>
        {route.params.data.timeSchedule.map((item, index) => {
          return (
            <TouchableOpacity key={index}
              onPress={() => onPressTime(item)}
              style={{
                justifyContent: 'center',
                marginHorizontal: 10,
                backgroundColor: selectedTime === item ? '#1F6ED4' : '#fff',
                borderColor: '#1F6ED4',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  padding: 10,
                  color: selectedTime === item ? '#fff' : '#000',
                  fontFamily: 'Quicksand-SemiBold',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Text
        style={{
          padding: 10,
          fontSize: 16,
          textAlign: 'center',
          fontFamily:'Lato-Light'
        }}>
        {selectDays} {selectedTime}
      </Text>
      <TouchableOpacity
        style={{
          marginHorizontal: 30,
          // marginTop:20,
          marginBottom:20,
          padding: 10,
          backgroundColor: '#1F6ED4',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() =>
          navigation.navigate('gotoPay', {
            selectedtime: {selectDays: selectDays, selectTime: selectedTime},
            name: route.params.title,
            pic: route.params.profilePic,
            des: route.params.titleDes,
            consultation: route.params.consultation,
            sendmessage:route.params.notifyMessage,
            guestid:route.params.guestid
          })
        }>
        <Text
          style={{fontSize: 20, color: '#fff', fontFamily: 'Quicksand-Bold'}}>
          Book Appointment
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex:1,
    backgroundColor: 'white',
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  calendar: {
    margin: 10,
    borderRadius: 10,
  },
});


