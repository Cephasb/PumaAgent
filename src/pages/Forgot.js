import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, YellowBox, ImageBackground, Alert, StatusBar, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Logo from '../components/AltLogo';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class Forgot extends React.Component {

 static navigationOptions = {
   title: 'FORGOT PASSWORD',
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
       UserEmail: '',
       spinner: false
     }

     YellowBox.ignoreWarnings([
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native'
    ]);

   }

 verEmail = () =>{

this.setState({spinner: true});
const { UserEmail }  = this.state ;

   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

   if ( UserEmail =="" || UserEmail == null || reg.test(UserEmail) === false ){
     Alert.alert('Valid Email required');
     this.setState({spinner: false});
   }
   else{

  fetch('https://puma.perltechnologies.com/mobforgot.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      Email: UserEmail,

    })

  }).then((response) => response.json())
        .then((responseJson) => {

          // If server response message same as Data Matched
         if(responseJson === 'success')
          {

              this.props.navigation.navigate('Verification', {email:UserEmail})
              this.setState({spinner: false});
          }
          else{
            Alert.alert(responseJson);
            this.setState({spinner: false});
          }

        }).catch((error) => {
          console.error(error);
          this.setState({spinner: false});
        });
      }
 }

  render() {

    return (
      <ScrollView style={styles.container}>
      <Spinner
      visible={this.state.spinner}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Animatable.View animation="zoomInUp" style={styles.container}>
        <Logo/>
        </Animatable.View>

        <Text>{"\n"}</Text>

        <Text style={styles.signupText}>Enter your email below for a Reset Code</Text>

        <Text>{"\n"}</Text>

        <Animatable.View animation="slideInLeft" style={styles.inputContainer}>
        <TextInput style={styles.inputBox} onChangeText={UserEmail => this.setState({UserEmail})} underlineColorAndroid='#134E13' placeholder='E-mail Address' />
        </Animatable.View>

        <Animatable.View animation="bounceIn" style={styles.button}>
        <TouchableOpacity onPress={this.verEmail}>
        <Text style={styles.buttonText}> RESET</Text>
        </TouchableOpacity>
        </Animatable.View>
        </View>

    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#fff',
  },
  inputContainer: {
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: 16,
  },
  button: {
    width: 300,
    backgroundColor: '#CD2626',
    marginTop:50,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
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
    fontWeight: '800'
  },
  signupButton: {
    color: '#CD2626',
    fontSize: 20,
    fontWeight: '800'
  }
});
