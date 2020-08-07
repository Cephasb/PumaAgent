import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, RefreshControl, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import Logo from '../components/AltLogo';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import { withNavigationFocus } from 'react-navigation';

class Signup extends React.Component {

  constructor() {

      super()

      this.state = {
        isLoading: false,
        refreshing: false,
        UserFirstname: '',
        UserLastname:'',
        UserCardID:'',
        UserPhone:'',
        Gender:'',
        VehicleNumber:'',
        spinner: false,
      }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this._onRefresh();
        }
      }

    signUp = () => {

      this.setState({spinner: true});
      const { UserFirstname }  = this.state;
      const { UserLastname } = this.state;
      const { UserRole } = this.state;
      const { UserCardID } = this.state;
      const { UserPhone } = this.state;
      const { Gender } = this.state;
      const { VehicleNumber } = this.state;

      if ( UserFirstname =="" || UserFirstname == null ){
        Alert.alert('Firstname required');
        this.setState({spinner: false});
      }

      else if ( UserLastname =="" || UserLastname == null ){
        Alert.alert('Lastname required');
        this.setState({spinner: false});
      }

      else if ( UserPhone =="" || UserPhone == null ){
        Alert.alert('Valid Phone Number required');
        this.setState({spinner: false});
      }

      else if ( UserCardID =="" || UserCardID == null ){
        Alert.alert('Card ID required');
        this.setState({spinner: false});
      }

      else if ( Gender =="" || Gender == null ){
        Alert.alert('Gender required');
        this.setState({spinner: false});
      }

      else if ( VehicleNumber =="" || VehicleNumber == null ){
        Alert.alert('Vehicle Number required');
        this.setState({spinner: false});
      }

      else{

        fetch('https://puma.perltechnologies.com/mobsignup.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            UserFirstname: UserFirstname,
            UserLastname: UserLastname,
            UserCardID: UserCardID,
            Gender: Gender,
            VehicleNumber: VehicleNumber,
            Phone: UserPhone

          })

        }).then((response) => response.json())
              .then(async (responseJson) => {
                // If server response message same as Data Matched
               if(responseJson === 'success')
                {
                  this.setState({spinner: false});
                  Alert.alert('Customer Successfully Registered!');
                  this.props.navigation.navigate('SuccessReg',{cardid:UserCardID});

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
      UserFirstname: '',
      UserLastname:'',
      UserCardID:'',
      Gender:'',
      VehicleNumber:'',
      UserPhone:'',
      spinner: false,
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.clearForm();
    this.setState({refreshing: false});
  }

  render() {

    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Other',
    }];

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
        <Animatable.View animation="zoomInUp" style={{alignItems: 'center'}}><Logo/></Animatable.View>

        <KeyboardAvoidingView style={styles.container}>
        <TextInput style={styles.inputBox} value={this.state.UserFirstname} onChangeText={UserFirstname => this.setState({UserFirstname})} clearButtonMode='always' underlineColorAndroid='#134E13' placeholder='First Name'/>
        <TextInput style={styles.inputBox} value={this.state.UserLastname} onChangeText={UserLastname => this.setState({UserLastname})} underlineColorAndroid='#134E13' placeholder='Last Name'/>
        <TextInput style={styles.inputBox} value={this.state.UserPhone} keyboardType='numeric' onChangeText={UserPhone => this.setState({UserPhone})} underlineColorAndroid='#134E13' placeholder='Phone Number'/>
        <TextInput style={styles.inputBox} value={this.state.UserCardID} onChangeText={UserCardID => this.setState({UserCardID})} underlineColorAndroid='#134E13' placeholder='Card ID'/>
        <Dropdown dropdownOffset={{top:10}} value={this.state.Gender} inputContainerStyle={{ borderBottomColor: '#134E13', borderBottomWidth:1 }} rippleCentered={true} containerStyle={styles.inputBox} label='Gender' data={genderData} onChangeText={Gender => this.setState({Gender})}/>
        <TextInput style={styles.inputBox} value={this.state.VehicleNumber} onChangeText={VehicleNumber => this.setState({VehicleNumber})} underlineColorAndroid='#134E13' placeholder='Vehicle Number'/>

        <View style={styles.signupTextCont}></View>

        <TouchableOpacity style={styles.button} onPress={this.signUp}>
        <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}

export default withNavigationFocus(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  inputBox: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#CD2626',
    marginVertical: 10,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
});
