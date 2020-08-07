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

class AcceptVoucher extends React.Component {

  constructor(props) {

      super(props)

      this.state = {

            CustID: '',
            VoucherID:'',
            CustFirstname: '',
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
      } else {
        this.setState({ UserToken: false });
      }
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
        Alert.alert('Voucher ID required');
        this.setState({spinner: false});
      }

      else{

        fetch('https://puma.perltechnologies.com/moblookupVoucher.php', {
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
              VoucherID: 'none',
              spinner: false
            });

          }else if(responseJson[0].Voucher_Status == 1 ){
            this.setState({
              VoucherID: 'used',
              spinner: false
            });

          }else{
          this.setState({
            VoucherID: responseJson[0].Voucher_Serial,
            Amount: responseJson[0].Voucher_Amount,
            FuelType: '',
            VehicleNumber: '',
            spinner: false
          }, function() {
            // In this block you can do something with new state.
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
      const { VoucherID }  = this.state;
      const { UserToken } = this.state;
      const { Amount } = this.state;
      const { FuelType } = this.state;
      const { VehicleNumber } = this.state;

      if ( FuelType =="" || FuelType == null ){
        Alert.alert('Fuel Type is required');
        this.setState({spinner: false});
      }

      if ( VehicleNumber =="" || VehicleNumber == null ){
        Alert.alert('Vehicle Number is required');
        this.setState({spinner: false});
      }

      else{

        fetch('https://puma.perltechnologies.com/mobpurchaseVoucher.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fueltype: FuelType,
            amount: Amount,
            voucherid: VoucherID,
            vehiclenumber: VehicleNumber,
            usertoken: UserToken
          })
        }).then((response) => response.json())
              .then(async (responseJson) => {
                // If server response message same as Data Matched
               if(responseJson === 'success')
                {
                  this.setState({spinner: false});
                  this.props.navigation.navigate('SuccessVoucher',{cardid:VoucherID});
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
                this.setState({CustID:'',VoucherID: ''});
          }

          renderInfo() {

            let fuelTypeData = [{
              value: 'Diesel',
            }, {
              value: 'Super',
            }];

            if (this.state.VoucherID != 'none' && this.state.VoucherID != 'used' && this.state.VoucherID != '') {
              return (
                <View>
                <TextInput style={styles.inputBoxPoints} editable={false} value={'GH₵'+this.state.Amount.toString()} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Current Point' placeholderTextColor='#FFF'/>
                <Dropdown
                dropdownOffset={{top:10}}
                value={this.state.FuelType}
                rippleCentered={true}
                containerStyle={styles.AmountBox}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                label='FUEL TYPE '
                baseColor='#212121'
                data={fuelTypeData}
                onChangeText={FuelType => this.setState({FuelType})}
                />
                <TextInput style={styles.AmountBox} onChangeText={VehicleNumber => this.setState({VehicleNumber})} clearButtonMode='always' underlineColorAndroid='transparent' value={this.state.VehicleNumber} placeholder='VEHICLE NUMBER' placeholderTextColor='#212121'/>
                <TouchableOpacity style={styles.button} onPress={this.purchase}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                </View>
              );
            }else if (this.state.VoucherID == 'none' && this.state.VoucherID != ''){
              return(
                <View style={styles.buttonn}>
                  <Text style={styles.buttonText}>Not found! Voucher Does Not Exist</Text>
                </View>
              );
            }else if (this.state.VoucherID == 'used' && this.state.VoucherID != ''){
              return(
                <View style={styles.buttonn}>
                  <Text style={styles.buttonText}>Error! Voucher Already Used </Text>
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
        <TextInput onChangeText={CustID => this.setState({CustID})} value={this.state.CustID} underlineColorAndroid='transparent' placeholder='Enter VOUCHER ID ' placeholderTextColor='#212121'/>
        <TouchableOpacity style={styles.button2} onPress={this.lookUp}>
          <Text style={styles.buttonText}>Look Up</Text>
        </TouchableOpacity>
        </View>
        { this.state.VoucherID == '' && this.state.VoucherID !='none'?
          <Text style={{color:'red',textAlign:'center'}}> No Voucher ID entered </Text>
          :
            this.renderInfo()
        }
       </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}

export default withNavigationFocus(AcceptVoucher);

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
    width: 250,
    height: 80,
    backgroundColor: '#CD2626',
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 40,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical: 10,
    borderColor:'#CD2626',
    borderWidth: 2,
    color:"#fff"
  },
  AmountBox: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#134E13',
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
