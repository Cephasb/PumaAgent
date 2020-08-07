import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, ImageBackground, Alert, StatusBar, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Logo from '../components/AltLogo';
import AsyncStorage from '@react-native-community/async-storage';

export default class Verification extends React.Component {

 static navigationOptions = {
   title: 'VERIFICATION',
   headerStyle: {
     backgroundColor: '#CD2626',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold',
   }
 }

 constructor(props) {

     super(props)

     this.state = {
       UserID : '',
       UserOTP: '',
     }

     YellowBox.ignoreWarnings([
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native'
    ]);

   }

   componentDidMount() {
       this.webCall();
   }

   webCall=()=>{

     const { navigation } = this.props
     const UserToken = navigation.getParam('email', 'NO-ID')

    fetch('https://puma.perltechnologies.com/mobquery.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: UserToken

      })
    }).then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               UserID : responseJson[0].AppUser_UniqueID,
               UserFistname: responseJson[0].AppUser_Firstname,
               UserLastname: responseJson[0].AppUser_Lastname,
             }, function() {
               // In this block you can do something with new state.
             });
           })
           .catch((error) => {
             console.error(error);
           });

   }

 resetNow = () =>{

   const { UserOTP }  = this.state ;
   const { navigation } = this.props
   const UserToken = navigation.getParam('email', 'NO-ID')

   if ( UserOTP =="" || UserOTP == null ){
     Alert.alert('OTP required to proceed');
   }
   else{

  fetch('https://puma.perltechnologies.com/mobotp.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      OTP: UserOTP,

    })

  }).then((response) => response.json())
        .then((responseJson) => {

          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
              this.props.navigation.navigate('Reset', {email:UserToken})
          }
          else{
            Alert.alert(responseJson);
          }

        }).catch((error) => {
          console.error(error);
        });
      }
 }

  render() {

    const { navigation } = this.props
    const UserToken = navigation.getParam('email', 'NO-ID')

    return (
      <View style={styles.container}>
        <Animatable.View animation="zoomInUp">
        <Logo/>
        </Animatable.View>

        <Text>{"\n"}</Text>

        <Text style={styles.signupText}>Hello {this.state.UserFistname+" "+this.state.UserLastname}</Text>

        <Text>{"\n"}</Text>

        <Animatable.View animation="slideInLeft">
        <TextInput style={styles.inputBox} onChangeText={UserOTP => this.setState({UserOTP})} underlineColorAndroid='#134E13' placeholder='OTP Code (Reset)' />
        </Animatable.View>

        <Animatable.View animation="bounceIn" style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.resetNow}>
        <Text style={styles.buttonText}> Verify</Text>
        </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="slideInRight" style={styles.container}>
        <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText2}> {this.state.UserID}</Text>
        </TouchableOpacity>
        <Text style={{fontStyle: 'italic',fontSize:16}}>User ID</Text>
        </Animatable.View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    width: 150,
    backgroundColor: '#CD2626',
    borderRadius: 10,
    paddingVertical:10
  },
  button2: {
    width: 200,
    backgroundColor: '#CD2626',
    borderRadius: 10,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  },
  buttonText2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 40,
    flexDirection: 'row'
  },
  signupText: {
    fontSize: 20,
  },
  signupButton: {
    color: '#CD2626',
    fontSize: 20,
  }
});
