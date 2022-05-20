import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class OtpScreeen extends Component {
  state = {
    code:'123456',
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
    pin5: '',
    pin6: '',
  };

  
  render() {


var digits = this.state.code.split('');
var realDigits = digits.map(Number)
console.log(realDigits);
    const code = this.props.route.params.value;
    // console.log("code====>",code)
    const {pin1, pin2, pin3, pin4, pin5, pin6} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={style.heading}> Code is sent to 8945698525</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {/* <TextInput  
                style={style.input}
                   
                     ref={"pin1ref"}
                     maxLength={1}
                     placeholder='1'
                    value={pin1}
                    keyboardType='phone-pad'
                    onChangeText={(pin1)=>{
                        this.setState({pin1})
                        if(pin1 != ""){
                          this.refs.pin2ref.focus()
                        }
                    }}

                    />
                <TextInput  style={style.input}
                   
                     ref={"pin2ref"}
                     maxLength={1}
                     placeholder='2'
                     value={pin2}
                     keyboardType='phone-pad'
                     onChangeText={(pin2)=>{
                        this.setState({pin2})
                        if(pin2 != ""){
                          this.refs.pin3ref.focus()
                        }
                    }}
                    />
                <TextInput  style={style.input}
                   
                     ref={"pin3ref"}
                     maxLength={1}
                     placeholder='3'
                     value={pin3}
                     keyboardType='phone-pad'
                     onChangeText={(pin3)=>{
                        this.setState({pin3})
                        if(pin3 != ""){
                          this.refs.pin4ref.focus()
                        }
                    }}
                    />
                <TextInput  style={style.input}
                   
                     ref={"pin4ref"}
                     maxLength={1}
                     placeholder='4'
                     value={pin4}
                     keyboardType='phone-pad'
                     onChangeText={(pin4)=>{
                        this.setState({pin4})
                        if(pin4 != ""){
                            this.refs.pin5ref.focus()
                          }
                    }}
                    />

                 <TextInput  style={style.input}
                   
                   ref={"pin5ref"}
                   maxLength={1}
                   placeholder='5'
                   value={pin5}
                   keyboardType='phone-pad'
                   onChangeText={(pin5)=>{
                      this.setState({pin5})
                      if(pin5 != ""){
                        this.refs.pin6ref.focus()
                      }
                  }}
                  />

                <TextInput  style={style.input}
                   
                   ref={"pin6ref"}
                   maxLength={1}
                   placeholder='6'
                   value={pin6}
                   keyboardType='phone-pad'
                   onChangeText={(pin6)=>{
                      this.setState({pin6})
                      if(pin6 != ""){
                       alert('api call')
                      }
                  }}
                  /> */}

          <TextInput
            style={style.input}
            placeholder="Verification code"
            placeholderTextColor="#eee"
            value={this.props.route.params.value}
            keyboardType="numeric"
            onChangeText={this.props.route.params.changeText}
            maxLength={6}
          />
        </View>

        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 30}}>
          <Text style={{fontSize: 18, color: 'gray'}}>
            Didn't receive code?{' '}
            <Text style={{color: 'black'}}>Request again</Text>
          </Text>
          <Text style={{fontSize: 18, color: 'black'}}>Get via Call</Text>
        </View>

        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 50}}>
          <TouchableOpacity
            onPress={this.props.route.params.handleVerifyCode}
            style={style.button}>
            <Text style={{fontSize: 20}}>Verify and Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  input: {
    fontSize: 20,
    textAlign: 'center',
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
   letterSpacing:10,
  },
  heading: {
    textAlign: 'center',
    padding: 30,
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    //  letterSpacing:3,
  },
  button: {
    height: 50,
    width: 250,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
