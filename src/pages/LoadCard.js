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

class LoadCard extends React.Component {

  constructor() {

      super()

      this.state = {
        isLoading: false,
        refreshing: false,
        UserFirstname: '',
        UserLastname:'',
        UserCardID:'',
        UserPhone:'',
        Amount:'',
        ConfirmAmount:'',
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

    loadCard = () => {

      this.setState({spinner: true});
      const { UserCardID } = this.state;
      const { Amount } = this.state;
      const { ConfirmAmount } = this.state;

        if ( UserCardID =="" || UserCardID == null ){
        Alert.alert('Card ID required');
        this.setState({spinner: false});
      }

      else if ( Amount =="" || Amount == null ){
        Alert.alert('Amount required');
        this.setState({spinner: false});
      }

      else if ( Amount != ConfirmAmount ){
        Alert.alert('Amounts do not match');
        this.setState({spinner: false});
      }

      else{

        fetch('https://puma.perltechnologies.com/mobload.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            UserCardID: UserCardID,
            Amount: Amount,

          })

        }).then((response) => response.json())
              .then(async (responseJson) => {
                // If server response message same as Data Matched
               if(responseJson === 'success')
                {
                  this.setState({spinner: false});
                  Alert.alert('Customer Card Successfully Load!');
                  this.props.navigation.navigate('SuccessLoad',{cardid:UserCardID});

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
      Amount:'',
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

        <KeyboardAvoidingView style={styles.container}>
        <View style={{margin:20}}/>

        <TextInput style={styles.inputBox} editable={false} value={"CARD ID: "+this.state.UserCardID} underlineColorAndroid='#134E13' placeholder='Card ID'/>
        <TextInput style={styles.inputBox} editable={false} value={"NAME: "+this.state.UserFirstname+" "+this.state.UserFirstname} underlineColorAndroid='#134E13' placeholder='Name'/>
        <TextInput style={styles.inputBox} editable={false} value={"PHONE: "+this.state.UserPhone} underlineColorAndroid='#134E13' placeholder='Phone Number'/>
        <TextInput style={styles.inputBox} value={this.state.Amount} onChangeText={Amount => this.setState({Amount})} underlineColorAndroid='#CD2626' placeholder='Enter Amount'/>
        <TextInput style={styles.inputBox} value={this.state.ConfirmAmount} onChangeText={ConfirmAmount => this.setState({ConfirmAmount})} underlineColorAndroid='#CD2626' placeholder='Confirm Amount'/>

        <View style={styles.signupTextCont}/>

        <TouchableOpacity style={styles.button} onPress={this.loadCard}>
        <Text style={styles.buttonText}>Load</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}

export default withNavigationFocus(LoadCard);

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
