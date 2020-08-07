import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, KeyboardAvoidingView, RefreshControl, TouchableOpacity, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class SuccessPoints2 extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
        isLoading: true,
        CustPoints: '',
        CustomerID:'',
        CustAmount:'',
        FuelType: '',
        CustDate:''
      }

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
         email: CardID
       })
     }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                CustomerID: responseJson[0].Customer_ID,
                CustPhone : responseJson[0].Customer_Phone,
                CustFirstname: responseJson[0].Customer_Firstname
              }, function() {
                // In this block you can do something with new state.
              });

              fetch('https://puma.perltechnologies.com/getpurchase.php',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  custid: this.state.CustomerID
                })
              }).then((response) => response.json())
                     .then((responseJson) => {
                       this.setState({
                         CustAmount : responseJson[0].Purchase_Amount,
                         CustDate : responseJson[0].Purchase_Date,
                         CustPoints : responseJson[0].Purchase_Points,
                         FuelType: responseJson[0].Purchase_Type,
                         isLoading: false,
                       }, function() {
                         // In this block you can do something with new state.
                       });
                     })
                     .catch((error) => {
                       console.error(error);
                       this.setState({isLoading: false});
                     });
            })
            .catch((error) => {
              console.error(error);
              this.setState({isLoading: false});
            });

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

        <Animatable.View animation="zoomInUp" style={{alignItems: 'center'}}><Text style={{textAlign: 'center', marginTop: 20, fontSize:30, fontWeight:'bold', color:'grey'}}>Success</Text></Animatable.View>

        <KeyboardAvoidingView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 10, fontSize:30, color:'red'}}>{this.state.CustFirstname+ " LTD"}</Text>

        <Text style={{textAlign: 'center', marginTop: 10, fontSize:20}}>has been rewarded </Text>

        <TextInput style={styles.inputBox} value={this.state.CustPoints} editable={false} clearButtonMode='always' underlineColorAndroid='grey' placeholder='Customer Points'/>

        <View style={styles.bluebutton}>
        <Image
          style={{width: 300, height: 60, margin:20}}
          source={require('../images/logo.jpg')}
        />
        <Text style={{color: '#ffffff',fontWeight:'bold'}}>PUMA CARDHOLDER</Text>
        </View>

        <View style={styles.signupTextCont}>

            <Text style={{marginTop: 5, fontSize:20}}>Purchase Amount: <Text style={{color:'red'}}>{this.state.CustAmount}</Text> </Text>
            <Text style={{marginTop: 5, fontSize:20}}>Purchase Date: <Text style={{color:'red'}}>{this.state.CustDate}</Text> </Text>
            <Text style={{marginTop: 5, fontSize:20}}>Fuel Type: <Text style={{color:'red'}}>{this.state.FuelType}</Text> </Text>

        </View>

        <View style={styles.signupTextCont}>

            <Text style={{marginTop: 5, color:'#CD2626', fontSize:20}}> NB: A copy has been sent to customer’s</Text>
            <Text style={{marginTop: 5, color:'#CD2626', fontSize:20}}>registered Mobile Number via SMS </Text>

        </View>

        <View style={styles.signupTextCont}></View>

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
    paddingHorizontal: 18,
    fontSize: 30,
    fontWeight: 'bold',
    color:'#134E13',
    textAlign: 'center',
    marginTop: 20,
    borderColor:'#000',
  },
  bluebutton: {
    backgroundColor: '#CD2626',
    marginTop:20,
    alignItems:'center',
    alignSelf: 'center',
    width: 300,
    height: 150,
    borderRadius: 10,
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
    paddingVertical: 10,
  },
  signupText: {
    fontSize: 20,
    fontWeight: '800'
  },
  signupButton: {
    color: '#3090C7',
    fontSize: 20,
    fontWeight: '800'
  }
});
