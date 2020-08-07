import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import Logo from '../components/Logo';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import { withNavigationFocus } from 'react-navigation';

class CorporatePurchase extends React.Component {

  constructor(props) {

      super(props)

      this.state = {

            CustID: '',
            CustomerID:'',
            CustFirstname: '',
            Station:'',
            CustLastname:'',
            CustomerPoints:'',
            CustPhone:'',
            VehicleNumber:'',
            FuelType: '',
            Amount: '',
            UserToken:'',

      }

      YellowBox.ignoreWarnings([
       'Warning: componentWillReceiveProps is deprecated',
       'Warning: Async Storage has been extracted from react-native'
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

     fetch('https://puma.perltechnologies.com/mobquery.php',{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({

         email: this.state.UserToken

       })

     }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                Station: responseJson[0].AppUser_Station,
              }, function() {
                // In this block you can do something with new state.
              });
            })
            .catch((error) => {
              console.error(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.refresh();
        }
      }

    lookUp = () => {

      this.setState({spinner: true});
      const { CustID }  = this.state;

      if ( CustID =="" || CustID == null ){
        Alert.alert('Card ID required');
        this.setState({spinner: false});
      }

      else{

        fetch('https://pumacard.perltechnologies.com/moblookup.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            custid: CustID,

          })

        }).then((response) => response.json())

        .then((responseJson) => {

          if (responseJson == undefined || responseJson.length == 0 ){
            this.setState({
              CustomerID: 'none',
              spinner: false
            });

          }else{
          this.setState({
            CustomerID: responseJson[0].Card_CustID,
            CustUsername: responseJson[0].Card_Username,
            VehicleNumber: responseJson[0].Card_VehicleNumber,
            CustPhone: responseJson[0].Card_UserPhone,
            FuelType: '',
            Amount: '',
          }, function() {
            // In this block you can do something with new state.
          });

          fetch('https://pumacard.perltechnologies.com/mobpoints.php',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              custid: CustID,

            })

          }).then((response) => response.json())
                 .then((responseJson) => {

                   if (responseJson == undefined || responseJson.length == 0 ){
                     this.setState({
                       CustomerPoints: '0',
                       spinner: false
                     });

                     }else{

                   this.setState({
                     CustomerPoints: responseJson[0].Points_Sum,
                     spinner: false
                   }, function() {
                     // In this block you can do something with new state.
                   });
                 }
                 })
                 .catch((error) => {
                   console.error(error);
                 });

        }
        })
        .catch((error) => {
                console.error(error);
                this.setState({spinner: false});
              });
          }
        }

    purchase = () => {

      this.setState({spinner: true});
      const { CustID }  = this.state;
      const { Amount }  = this.state;
      const { UserToken } = this.state;
      const { Station } = this.state;
      const { CarType } = this.state;
      const { FuelType } = this.state;
      const { Odometer } = this.state;

      if ( Amount =="" || Amount == null ){
        Alert.alert('Amount is required');
        this.setState({spinner: false});
      }

      if ( FuelType =="" || FuelType == null ){
        Alert.alert('Fuel Type is required');
        this.setState({spinner: false});
      }

      if ( Odometer =="" || Odometer == null ){
        Alert.alert('Current Odometer is required');
        this.setState({spinner: false});
      }

      if ( CarType =="" || CarType == null ){
        Alert.alert('Please select a car to continue');
        this.setState({spinner: false});
      }

      else{

        fetch('https://pumacard.perltechnologies.com/mobpurchase.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Amount,
            fueltype: FuelType,
            cardid: CustID,
            usertoken: UserToken,
            station: Station
          })
        }).then((response) => response.json())
              .then(async (responseJson) => {
                // If server response message same as Data Matched
               if(responseJson === 'success')
                {
                  this.setState({spinner: false});
                  this.props.navigation.navigate('SuccessPoints',{cardid:CustID});
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

          refresh = () => {
                this.setState({CustID:'',CustomerID: ''});
                this.webCall();
          }

          renderInfo() {

            let fuelTypeData = [{
              value: 'Diesel',
            }, {
              value: 'Super',
            }];

            let carTypeData = [{
              value: 'Car 1',
            }, {
              value: 'Car 2',
            }, {
              value: 'Car 3',
            }, {
              value: 'Car 4',
            }];

            if (this.state.CustomerID != 'none' && this.state.CustomerID != '') {
              return (
                <View>
                <TextInput style={styles.inputBox} editable={false} value={"COMPANY NAME:"+" "+this.state.CustUsername} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Full Name' placeholderTextColor='#212121'/>
                <TextInput style={styles.inputBoxPoints} editable={false} value={"CURRENT POINTS:"+" "+this.state.CustomerPoints.toString()} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Current Point' placeholderTextColor='#FFF'/>
                <TextInput style={styles.inputBox} editable={false} value={"PHONE:"+" "+this.state.CustPhone} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Customer Phone' placeholderTextColor='#212121'/>
                <Dropdown
                dropdownOffset={{top:15}}
                value={this.state.CarType}
                rippleCentered={true}
                containerStyle={styles.AmountBox}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                label='SELECT CAR'
                baseColor='#212121'
                data={carTypeData}
                onChangeText={CarType => this.setState({CarType})}
                />
                <TextInput style={styles.AmountBox} onChangeText={Odometer => this.setState({Odometer})} clearButtonMode='always' keyboardType='numeric' underlineColorAndroid='transparent' value={this.state.Odometer} placeholder='ENTER CURRENT ODOMETER' placeholderTextColor='#212121'/>
                <Dropdown
                dropdownOffset={{top:15}}
                value={this.state.FuelType}
                rippleCentered={true}
                containerStyle={styles.AmountBox}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                label='FUEL TYPE '
                baseColor='#212121'
                data={fuelTypeData}
                onChangeText={FuelType => this.setState({FuelType})}
                />
                <TextInput style={styles.AmountBox} onChangeText={Amount => this.setState({Amount})} clearButtonMode='always' keyboardType='numeric' underlineColorAndroid='transparent' value={this.state.Amount} placeholder='ENTER AMOUNT PURCHASED' placeholderTextColor='#212121'/>
                <TouchableOpacity style={styles.button} onPress={this.purchase}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                </View>
              );
            }else if (this.state.CustomerID == 'none' && this.state.CustomerID != ''){
              return(
                <View style={styles.buttonn}>
                  <Text style={styles.buttonText}>Not found</Text>
                </View>
              );
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

        <KeyboardAvoidingView style={styles.container}>

        <View style={styles.lookup}>
        <TextInput onChangeText={CustID => this.setState({CustID})} value={this.state.CustID} underlineColorAndroid='transparent' placeholder='Enter CARD ID ' placeholderTextColor='#212121'/>
        <TouchableOpacity style={styles.button2} onPress={this.lookUp}>
          <Text style={styles.buttonText}>Look Up</Text>
        </TouchableOpacity>
        </View>
        { this.state.CustomerID == '' && this.state.CustomerID !='none'?
          <Text style={{color:'red',textAlign:'center'}}> No Card ID entered </Text>
          :
            this.renderInfo()
        }
       </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}

export default withNavigationFocus(CorporatePurchase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lookup: {
    flexDirection: 'row',
    margin:50,
    alignItems:'center',
    alignSelf: 'center',
    width: 250,
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
    borderColor:'#134E13',
    borderRadius: 20,
    borderWidth: 2,
  },
  inputBox: {
    alignSelf: 'center',
    width: 300,
    height: 40,
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#212121',
    borderWidth: 1,
    color:'#000'
  },
  inputBoxPoints: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginVertical: 10,
    borderColor:'#134E13',
    borderWidth: 1,
    color:"#fff"
  },
  AmountBox: {
    alignSelf: 'center',
    width: 300,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#CD2626',
    borderWidth: 2
  },
  button: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#CD2626',
    marginVertical: 10,
    paddingVertical:10
  },
  buttonn: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#CD2626',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical:10
  },
  button2: {
    alignSelf: 'center',
    width: 100,
    backgroundColor: '#134E13',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});
