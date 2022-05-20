import React, { Component } from 'react';
import { Text, View,TextInput, StyleSheet,TouchableOpacity,Alert } from 'react-native'

export default class VerifyNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
       confirmationUser:null,
        verifyNumber:'',
        verifyCode:this.props.route.params.key
    };
  }

  
// async componentDidMount(){
//   const confirmation = this.state.verifyCode
  
//   this.setState({ })
// }


   confirmCode=async(code)=> {
     
    try {
     const result= await confirmationUser.confirm(code);
     console.log('result',result);
     this.props.navigation.navigate('home');
    } catch (error) {
      console.log('Invalid code.');
    }
  }


  

  render() {
    //  console.log("key",this.props.route.params.key)
      let code = this.props.route.params.key
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <Text style={style.heading}> Code is sent to 8945698525</Text>
          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

          
                
                  <TextInput
                   autoFocus
                    style={style.textInput}
                    placeholder='Verification code'
                    placeholderTextColor='#eee'
                    value={this.state.verifyNumber}
                    keyboardType='numeric'
                    
                    onChangeText={( verifyNumber)=>this.setState({ verifyNumber: verifyNumber})}
                    maxLength={6}
                    />



                </View>


                <View style={{justifyContent:'center',alignItems:'center',padding:50}}>
                <TouchableOpacity
               
                onPress={()=>this.confirmCode(code)}
                style={style.button}
               >
                    <Text style={{fontSize:20}}>Verify and Create Account</Text>
                </TouchableOpacity>
                </View>
        
      </View>
    );
  }
}


const style = StyleSheet.create({
    input:{
    
        fontSize:20,
        textAlign:'center',
        height:50,
        width:50,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5
    },
    heading:
     { 
         textAlign:'center',
         padding:30,
         fontSize:20,
         color:'gray',
         fontWeight:'bold',
       
         
        },
        button : {
            height:50,
            width:250,
            backgroundColor:'orange',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
        },
        textInput: {
            marginTop: 20,
            width: '90%',
            height: 40,
            borderColor: '#555',
            borderWidth: 2,
            borderRadius: 5,
            paddingLeft: 10,
            color: 'gray',
            fontSize: 16
          },
});