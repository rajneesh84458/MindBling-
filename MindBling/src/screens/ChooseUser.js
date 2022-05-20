import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SELECTUSER} from '../constants/icons';
const {width, height} = Dimensions.get('window');

export default function ChooseUser({navigation}) {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <ImageBackground style={{width, height}} source={SELECTUSER}>
        <Text style={styles.heading}>Who are you,</Text>

        <View
          style={{
            flex: 0.8,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            style={styles.button}
            onPress={() => navigation.navigate('login')}>
            <Text style={styles.buttonText}> User</Text>
          </TouchableWithoutFeedback>

          <Text
            style={[
              styles.buttonText,
              {fontStyle: 'italic', color: '#ff6a00', paddingVertical: 40},
            ]}>
            Or
          </Text>

          <TouchableWithoutFeedback
            style={styles.button}
            onPress={() => navigation.navigate('signin')}>
            <Text style={styles.buttonText}>Trainer</Text>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
    color: '#000',
    fontWeight: '200',
    paddingLeft: 20,
    letterSpacing: 1,
    top: 40,
    // fontFamily: "Roboto-Bold"
  },

  button: {
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  buttonText: {fontSize: 20, color: 'black', fontWeight: '500',paddingHorizontal:30,letterSpacing:2},
});

// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
// } from 'react-native';
// import {database} from '../network/config/setup';

// const data = [
//    'Less than a year',
//    '1 year',
//    '2 year',
//    '3 year',
//    '4 year',
//    '5 year',
//    '6 year',
//    '7 year',
//    '8 year',
//    '9 year',
//    '10 years',
//    '11 years',
//    '12 years',
//    '13 years',
//    '14 years',
//    '15 years',
//    ' Above than 15 years',
// ];
// export default class ChooseUser extends Component {
//   state = {
//     modalVisible: false,
//     dataSource: data,
//     explevel: '',
//   };
//   setModalVisible(visible) {
//     this.setState({
//       modalVisible: visible,
//     });
//   }

//   renderModal = (item) => {
//     this.setState({explevel: item});
//     console.log("explevel",this.state.explevel)
//     database().ref('experice/').push({
//       experience: item,
//     });
//     this.setState({modalVisible: false});
//   };

//   render() {
//     return (
//       <View style={{flex: 1, backgroundColor: 'white'}}>
//         <Text style={{padding:10}}>exp{this.state.explevel}</Text>
//         <View
//           style={{
//             height: 180,
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 30,
//           }}>
//           <TouchableOpacity
//             activeOpacity={1}
//             style={styles.button}
//             onPress={() => {
//               this.setModalVisible(true);
//             }}>
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontSize: 20,
//                 color: 'gray',
//               }}>
//               {this.state.explevel ? this.state.explevel : 'Add your experience '}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.centeredView}>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={this.state.modalVisible}
//             onBackdropPress={() => this.setState({modalVisible: false})}>
//             <TouchableOpacity
//               activeOpacity={1}
//               onPressOut={() => {
//                 this.setModalVisible(false);
//               }}
//               style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                     color: '#000',
//                     paddingVertical: 10,
//                     width: '100%',
//                   }}>
//                   Add your experience level
//                 </Text>

//                 <ScrollView
//                   showsVerticalScrollIndicator={false}
//                   style={{height: '100%', width: '100%'}}>
//                   <View style={{width: '100%'}}>
//                     {this.state.dataSource.map((item) => (
//                       <TouchableOpacity
//                         key={item}
//                         onPress={() => this.renderModal(item)}
//                         style={{
//                           flex: 1,
//                           borderBottomColor: 'black',
//                           borderBottomWidth: StyleSheet.hairlineWidth,
//                           marginHorizontal: 10,
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 16,
//                             color: 'gray',
//                             padding: 10,
//                             textAlign: 'center',
//                           }}>
//                           {item}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
                 
//                 </ScrollView>
//               </View>
//             </TouchableOpacity>
//           </Modal>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   modalView: {
//     position:"absolute",
//     bottom:2,
//     width:"100%",
//     height:'50%',
//     backgroundColor:"white"
//   },
//   button: {
//     flexDirection: 'row',
//     height: 50,
//     width: '80%',
//     borderRadius: 10,
//     alignSelf: 'center',
//     backgroundColor: '#f4f5f6',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     marginVertical: 25,
//   },
// });

// import React, {Component} from 'react';

// import {StyleSheet, View, Text, Button, Alert, TextInput} from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import moment from 'moment'

// var SampleArray = ['ONE', 'TWO'];

// export default class ChooseUser extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       Holder: '',
//       data:[],
//       selectedDayArray: [],
//       markedDates:[]

//     };
//   }

//   AddItemsToArray = () => {
//     //Adding Items To Array.

//      console.log("pushdata",this.state.data)

//     // Showing the comp Array on Screen Using Alert.
//     // Alert.alert(SampleArray.toString());
//   };

//   onDaySelect = day => {
//     const _selectedDay = moment(day.dateString).format('YYYY-MM-DD');
//     console.log('selectd day ====>', _selectedDay);

//     this.state.selectedDayArray.push(day);
//     this.setState({markedDates:this.state.selectedDayArray})
//   };
//   render() {
//     return (
//       <View style={styles.MainContainer}>
//         <TextInput
//           placeholder="Enter Value here"
//           onChangeText={(TextInputValue) =>
//             this.setState({Holder: TextInputValue})
//           }
//           style={{textAlign: 'center', marginBottom: 6, height: 45}}
//         />

// <Calendar
//                 markedDates={this.state._markedDates}
//                 markingType={'multi-dot'}
//                 onDayPress={this.onDaySelect}
//                 disabledDates={this.state.mydates}
//                 style={styles.calendar}
//               />

//         <Button
//           title="Click Here To Add Value To Array"
//           onPress={this.AddItemsToArray}
//         />

//         {/* <FlatList data ={SampleArray}
//            renderItem={(item)=>{
//              return (

//               <View></View>
//              )
//            }}
//         /> */}
//         {
//           this.state.selectedDayArray.map(item=>(
//             <Text>{item}</Text>
//           ))
//         }
//       </View>
//     );
//   }
// }

// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Alert,
// } from 'react-native';
// import {Calendar} from 'react-native-calendars';
// import moment from 'moment';
// import {database} from '../network/config/setup';

// const _format = 'YYYY-MM-DD';
// const _today = moment(new Date().dateString).format(_format);

// export default class Slots extends Component {
//   initialState = {
//     [_today]: {disabled: false},
//   };

//   state = {
//     _markedDates: {},
//     modalVisible: false,
//     selectedDayArray: [],
//     mydates: [],
//     SampleArray:[]
//   };

//   // onDaySelect = day => {
//   //   const _selectedDay = moment(day.dateString).format(_format);
//   //   console.log("selected day==>",_selectedDay)
//   //   this.setState({
//   //     selectedDay: _selectedDay,
//   //     modalVisible: true,
//   //   });
//   // };

//   onDaySelect=(day)=>{
//     const _selectedDay = moment(day.dateString).format(_format);
//     console.log("selectedday",_selectedDay)
//     if(this.state._markedDates[_selectedDay]){
//      this.setState({_markedDates})
//     }

//     else {
//        const newDates = this.state._markedDates;
//        newDates[_selectedDay] = {selected: true,  color: '#d6b161'}
//        this.setState({_markedDates: newDates,})
//        this.setState({SampleArray: {hey:_selectedDay}})
//        console.log("selected Array",this.state.SampleArray)
//       console.log("markeddates",this.state._markedDates)

//        //console.log("selected date",this.state.dataSource);
//     }
//   }
//   AddItemsToArray = () => {
//     this.state.SampleArray.push(this.state.selectedDay);
//     // const mydata = database().ref('blockdate/');
//     // mydata.push({
//     //   selected:this.state.selectedDay
//     // })
//     console.log('sample arrray', this.state.SampleArray);
//   };

//   saveDay = () => {
//     let selected = true;
//     const {_markedDates, selectedDay, mydates} = this.state;

//     if (_markedDates[selectedDay]) {
//       selected = !_markedDates[selectedDay].selected;
//     }

//     const clone = {..._markedDates};

//     clone[selectedDay] = {selected, selectedColor: 'red'};

//     this.setState({
//       modalVisible: false,
//       _markedDates: clone,
//     });
//     console.log('marked dates===>', this.state._markedDates);
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Calendar
//           theme={{
//             textSectionTitleColor: 'orange',
//             textDayHeaderFontWeight: '300',
//             textDayHeaderFontSize: 15,
//             monthTextColor: 'orange',
//             arrowColor: 'orange',
//             textMonthFontSize: 18,
//           }}
//           markedDates={this.state._markedDates}
//           markingType={'multi-dot'}
//           onDayPress={this.onDaySelect}
//           disabledDates={this.state.mydates}
//           style={styles.calendar}
//           hideExtraDays={true}
//           headerStyle={{
//             backgroundColor: 'gray',
//             borderWidth: 1,
//             borderRadius: 3,
//           }}
//         />

//         <View
//           style={{
//             height: 'auto',
//             width: '100%',
//             backgroundColor: '#ff5d5b',
//             justifyContent: 'center',
//           }}>
//           <Text style={{fontSize: 20, fontStyle: 'italic'}}>
//             Multiple Dates :
//           </Text>
//         </View>

//         <View style={styles.centeredView}>
//           <Modal
//             animationType="fade"
//             transparent={true}
//             visible={this.state.modalVisible}
//             onRequestClose={() => {
//               Alert.alert('Modal has been closed.');
//             }}>
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <TouchableOpacity
//                   style={{position: 'absolute', right: 10, top: 10}}
//                   onPress={() => {
//                     this.setState({modalVisible: !this.state.modalVisible});
//                   }}
//                 />

//                 <View
//                   style={{
//                     padding: 30,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.saveDay();
//                       this.AddItemsToArray();
//                     }}
//                     style={[
//                       styles.ButtonStyle,
//                       {
//                         backgroundColor: 'white',
//                         borderColor: 'black',
//                         borderWidth: 0.5,
//                         marginBottom: 10,
//                       },
//                     ]}>
//                     <Text style={{fontSize: 15}}>
//                       {this.state.selectedDay ? 'Block' : 'Unblock'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   calendar: {
//     margin: 2,
//   },

//   container: {
//     flex: 1,
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 70,
//   },
//   modalView: {
//     width: 300,

//     marginTop: 40,
//     backgroundColor: 'white',
//     borderRadius: 10,

//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },

//   ButtonStyle: {
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     marginBottom: 15,
//     borderRadius: 8,
//   },
// });

// // import React, { Component } from 'react';
// // import { View, Text } from 'react-native';
// // import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// // export default class ChooseUser extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       dates : {},
// //       sampleArray:[]
// //     };
// //   }

// //   selectDate =(day)=>{
// //     let selected = true;
// //     let selectedDate = day.dateString;

// //     const clone = {...this.state.dates};
// //      console.log("selected date ====>",selectedDate)
// //     if(this.state.dates[selectedDate]){
// //       const newDates = this.state.dates;
// //        this.setState({dates: newDates})

// //     } else {
// //       // this.setState({sampleArray:selectedDate})

// //        const newDates = this.state.dates;
// //        newDates[selectedDate] = {selected: true,  color: '#d6b161'}
// //        this.setState({dates: newDates,})

// //     clone[selectedDate] = {selected, selectedColor: 'red'};
// //     this.setState({dates: clone})
// //       console.log("dasdfasadf",this.state.dates)

// //     }
// //   }

// //   // AddItemsToArray=()=>{
// //   //   sampleArray.push()
// //   // }

// //   render() {
// //     // console.log('Kapil',this.selectDate);
// //     return (
// //       <View style={{flex:1,backgroundColor:'white'}}>
// //         <Calendar
// //          onDayPress={this.selectDate}
// //          markedDates={this.state.dates}
// //          markingType={'multi-dot'}
// //         //  selectedColor={'red'}
// //          color={'red'}

// //    />

// //    {this.state.sampleArray.map(item=>(
// //       <Text>Hi=={item}</Text>
// //    ))}

// //       </View>
// //     );
// //   }
// // }
