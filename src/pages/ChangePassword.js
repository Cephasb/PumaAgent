import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, Alert, YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from '@react-native-community/async-storage';

export default class ChangePassword extends React.Component {

  static navigationOptions = {
    title: 'CHANGE PASSWORD',
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

        UserToken: '',
        IdHolder : '',
        isLoading: true,
        spinner: false,
        CurrentPassword: '',
        NewPassword: ''

      }

      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);

    }

    async componentDidMount() {
      const tokenGet = await AsyncStorage.getItem("UserToken");
      if (tokenGet) {
        this.setState({ UserToken: tokenGet });
        this.webCall();
      } else {
        this.setState({ UserToken: false });
      }
    }

    webCall=()=>{
      const { UserToken }  = this.state ;

     return fetch('https://puma.perltechnologies.com/mobquery.php',{
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
                isLoading: false,
                IdHolder : responseJson[0].AppUser_ID,
                CurrentPassword: responseJson[0].AppUser_Password,
                Firstname: responseJson[0].AppUser_Firstname
              }, function() {
                // In this block you can do something with new state.
              });
            })
            .catch((error) => {
              console.error(error);
            });

    }

    changePass = () =>{

      const { UserToken } = this.state;
      const { NewPassword }  = this.state ;
      const { ConfirmNewPassword } = this.state ;

      this.setState({spinner: true});

      if ( NewPassword =="" || NewPassword == null ){
        Alert.alert('Please Enter Your New Password');
        this.setState({spinner: false});
      }
      else if ( NewPassword.length < 8 ){
        Alert.alert('Password length should be at least 8 characters');
        this.setState({spinner: false});
      }
      else if ( ConfirmNewPassword =="" || ConfirmNewPassword == null ){
        Alert.alert('Please Confirm New Password');
        this.setState({spinner: false});
      }
      else if ( NewPassword != ConfirmNewPassword ){
        Alert.alert('Error! New Passwords do not match!');
        this.setState({spinner: false});
      }

      else{

     fetch('https://puma.perltechnologies.com/mobfirstchange.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({

         userid: UserToken,
         newpassword: NewPassword,

       })

     }).then((response) => response.json())
           .then(async (responseJson) => {

            if(responseJson === 'Change was successful')
             {
               await AsyncStorage.setItem("UserToken", UserToken)
               this.props.navigation.navigate('App')
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

    if (this.state.isLoading) {
      return (

       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <ActivityIndicator size="large" />

        </View>

      );

    }

    return (
      <ScrollView style={styles.container}>
      <Spinner
      visible={this.state.spinner}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
      />
      <View style={ styles.headerStyle }>
          <Icon  name='ios-construct' size={75} style={styles.iconStyle} />
          <Text style={styles.icontextStyle}> Password Security.</Text>
      </View>

        <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.formIns}> Hello {this.state.Firstname}. Change your password below: </Text>
        <TextInput style={styles.inputBox} onChangeText={CurrentPassword => this.setState({CurrentPassword})} value={this.state.CurrentPassword} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='Current Password' placeholderTextColor='#212121'/>
        <TextInput style={styles.inputBox} onChangeText={NewPassword => this.setState({NewPassword})} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='New Password' placeholderTextColor='#212121'/>
        <TextInput style={styles.inputBox} onChangeText={ConfirmNewPassword => this.setState({ConfirmNewPassword})} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='Confirm Password' placeholderTextColor='#212121'/>

        <TouchableOpacity style={styles.button} onPress={this.changePass}>
          <Text style={styles.buttonText}> CHANGE </Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    justifyContent: 'center',
    backgroundColor: "#CD2626",
    height:150,
  },
  inputBox: {
    alignSelf: 'center',
    width: 300,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#CD2626',
    borderRadius: 5,
    borderWidth: 1
  },
  button: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#CD2626',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  iconStyle: {
    color: 'white',
    textAlign:'center',
  },
  icontextStyle: {
    fontSize: 12,
    color: 'white',
    textAlign:'center',
    fontWeight:'bold'
  },
  formIns: {
    textAlign:'center',
    fontWeight:'bold',
    marginVertical: 20
  }
});
