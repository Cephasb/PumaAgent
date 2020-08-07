import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, YellowBox, ImageBackground, Alert, StatusBar, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Logo from '../components/AltLogo';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

 static navigationOptions = {
   title: 'LOGIN',
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
       isLoading: false,
       refreshing: false,
       UserID: '',
       UserPassword: '',
       UserRole: 2,
       spinner: false
     }

   }

 signIn = () =>{

   this.setState({spinner: true});
   const { UserID }  = this.state ;
   const { UserPassword }  = this.state ;
   const { UserRole } = this.state ;

   if ( UserID =="" || UserID == null ){
     Alert.alert('Client ID or Email required');
     this.setState({spinner: false});
   }
   else if ( UserPassword =="" || UserPassword == null ){
     Alert.alert('Password required');
     this.setState({spinner: false});
   }
   else{

  fetch('https://puma.perltechnologies.com/moblogin.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      userid: UserID,

      password: UserPassword,

      role: UserRole,

    })

  }).then((response) => response.json())
        .then(async (responseJson) => {
          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
            await AsyncStorage.setItem("UserToken", UserID)
            this.props.navigation.navigate('App')
            this.setState({spinner: false});
          }
          else if(responseJson === 'Unconfirmed User')
           {
             await AsyncStorage.setItem("UserToken", UserID)
             this.props.navigation.navigate('ChangePassword')
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

 clearForm = () => {
   this.setState({
     UserID:'',
     UserPassword: '',
   })
 }

 _onRefresh = () => {
   this.setState({refreshing: true});
   this.clearForm();
   this.setState({refreshing: false});
 }

 render() {

   if (this.state.isLoading) {
     return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

         <ActivityIndicator size="large" />

       </View>

     );

   }

   return (
     <ScrollView style={styles.container}
     refreshControl={
       <RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh}
       />
     }
     >
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

        <Animatable.View animation="slideInRight">
        <TextInput style={styles.inputBox} value={this.state.UserID} onChangeText={UserID => this.setState({UserID})} underlineColorAndroid='#134E13' placeholder='User ID'/>
        </Animatable.View>
        <Animatable.View animation="slideInLeft">
        <PasswordInputText
            style={styles.passBox}
            underlineColorAndroid='#134E13'
            lineWidth={0}
            activeLineWidth={0}
            disabledLineWidth={0}
            value={this.state.UserPassword}
            onChangeText={ (UserPassword) => this.setState({ UserPassword }) }
        />
        </Animatable.View>

        <Animatable.View animation="bounceIn" style={styles.button}>
        <TouchableOpacity  onPress={this.signIn}>
        <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="slideInRight" style={styles.forgotContainer}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Forgot')}>
        <Text style={styles.forgotBox}>FORGOT PASSWORD?</Text>
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
    backgroundColor: '#fff',
  },
  inputContainer: {
    alignItems: 'center'
  },
  forgotContainer: {
    alignItems: 'flex-start'
  },
  forgotBox: {
    width: 300,
    height: 50,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: 16,
  },
  passBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: 16,
  },
  button: {
    width: 300,
    backgroundColor: '#CD2626',
    marginTop: 100,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 40,
    flexDirection: 'row'
  },
  signupText: {
    fontSize: 20,
    fontWeight: '500'
  },
  signupButton: {
    color: '#CD2626',
    fontSize: 20,
  }
});
