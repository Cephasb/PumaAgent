import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, RefreshControl, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import Logo from '../components/Logo';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class SuccessReg extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
        isLoading: true,
        CustPhone:''
      }

      YellowBox.ignoreWarnings([
       'Warning: componentWillReceiveProps is deprecated',
       'Warning: Async Storage has been extracted from react-native'
     ]);

    }

    async componentDidMount() {
        this.webCall();
    }

    webCall=()=>{

      const { navigation } = this.props
      const CardID = navigation.getParam('cardid', 'NO-ID')

     fetch('https://puma.perltechnologies.com/mobquery2.php',{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({

         email: CardID,

       })

     }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                CustPhone : responseJson[0].Customer_Phone,

              }, function() {
                // In this block you can do something with new state.
              });
            })
            .catch((error) => {
              console.error(error);
              this.setState({ isLoading:false });

            });

           }

  render() {

    const { navigation } = this.props
    const CardID = navigation.getParam('cardid', 'NO-ID')

    if (this.state.isLoading) {
      return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <ActivityIndicator size="large" />

        </View>

      );

    }

    return (
      <ScrollView style={styles.container}>

        <Animatable.View animation="zoomInUp" style={{alignItems: 'center'}}><Text style={{textAlign: 'center', marginTop: 50, fontSize:30, fontWeight:'bold', color:'grey'}}>Success</Text></Animatable.View>

        <KeyboardAvoidingView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 10, fontSize:30, color:'red'}}>{this.state.CustPhone}</Text>

        <Text style={{textAlign: 'center', marginTop: 10, fontSize:20}}>has been registered successfully</Text>

        <TextInput style={styles.inputBox} value={'CARD ID: '+CardID} editable={false} underlineColorAndroid='#000'/>

        <View style={styles.signupTextCont}>

            <Text style={{marginTop: 5, color:'#CD2626', fontWeight: '800', fontSize:20}}> NB: A copy has been sent to customer’s</Text>
            <Text style={{marginTop: 5, color:'#CD2626', fontWeight: '800', fontSize:20}}>registered Mobile Number via SMS </Text>

        </View>

        <View style={styles.signupTextCont}>

        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}> OKAY </Text>
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
  inputBox: {
    alignSelf: 'center',
    width: 300,
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color:'#134E13',
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    alignSelf: 'center',
    width: 100,
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
  signupTextCont: {
    flexGrow: 1,
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
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
