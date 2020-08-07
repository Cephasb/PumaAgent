import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, RefreshControl, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomerRewards extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
        isLoading: true,
        refreshing: false,
        }

      YellowBox.ignoreWarnings([
       'Warning: componentWillReceiveProps is deprecated',
       'Warning: Async Storage has been extracted from react-native'
     ]);

    }

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
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

      const { navigation } = this.props
      const CustomerID = navigation.getParam('customerid', 'NO-ID')

     fetch('https://puma.perltechnologies.com/mobcustreward.php',{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({

         id: CustomerID

       })

     }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                dataSource: responseJson
              }, function() {
                // In this block you can do something with new state.
                this.arrayholder = responseJson;
              });

              fetch('https://puma.perltechnologies.com/mobrewardsdetails.php',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                  id: CustomerID

                })

              }).then((response) => response.json())
                     .then((responseJson) => {
                       this.setState({
                         isLoading: false,
                         Firstname: responseJson[0].Customer_Firstname,
                         Lastname: responseJson[0].Customer_Lastname,
                         Phone: responseJson[0].Customer_Phone,
                         CardID: responseJson[0].Customer_CardID,
                         Points_Sum: responseJson[0].Points_Sum

                       }, function() {
                         // In this block you can do something with new state.
                       });
                     })
                     .catch((error) => {
                       console.error(error);
                     });

            })
            .catch((error) => {
              console.error(error);
            });

    }

    _onRefresh = () => {
      this.setState({refreshing: true});
      this.webCall();
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
        <Text style={{color:'#134E13',fontWeight:'bold', fontSize:24, textAlign:'center'}}> {this.state.CardID} Transactions </Text>
        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center', marginBottom:10}}> {this.state.Firstname+" "+this.state.Lastname} | {this.state.Phone}</Text>
        <View style={{flex:1, backgroundColor:'#7BCCB5'}}>
          <Text style={{fontWeight:'bold', fontSize:25, textAlign:'center', padding:10}}> TOTAL POINTS: {this.state.Points_Sum} </Text>
        </View>
        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}> {this.state.Station}</Text>
          <View style={{flex:1, flexDirection: 'row', backgroundColor:'#CD2626'}}>
            <Text style={styles.lefttextViewH}> Date </Text>
            <Text style={styles.propViewH}> Amount </Text>
            <Text style={styles.textViewH}> Points </Text>
            <Text style={styles.rightViewH}> Fuel </Text>
          </View>
          <FlatList

           data={ this.state.dataSource }

           ItemSeparatorComponent = {this.FlatListItemSeparator}

           renderItem={({item}) =>

               <View style={{flex:1, flexDirection: 'row'}}>
                 <Text style={styles.lefttextView}>{item.Purchase_Date} </Text>
                 <Text style={styles.propView}>GH₵{item.Purchase_Amount}</Text>
                 <Text style={styles.textView}>{item.Purchase_Points}</Text>
                 <Text style={styles.rightView}>{item.Purchase_Type}</Text>
               </View>

             }

           keyExtractor={(item, index) => index.toString()}

           />

           <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CustomerPurchase')}>
           <Text style={styles.buttonText}>PURCHASE FUEL</Text>
           </TouchableOpacity>

        </ScrollView>
      );
    }
   }

   const styles = StyleSheet.create({

   container :{
       flex:1,
       margin: 5,
       marginTop: (Platform.OS === 'ios') ? 20 : 0,
   },
   rightViewH: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       fontSize:16,
       fontWeight:'bold',
       color: '#fff'
   },
   textViewH: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       fontSize:16,
       fontWeight:'bold',
       color: '#fff'
   },
   propViewH: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       fontSize:16,
       fontWeight:'bold',
       color: '#fff'
   },
   lefttextViewH: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       fontSize:16,
       fontWeight:'bold',
       color: '#fff'
   },
   rightView: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       color: '#000'
   },
   textView: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       fontWeight:'bold',
       color: '#134E13'
   },
   propView: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       color: '#000'
   },
   lefttextView: {
       width:'25%',
       textAlignVertical:'center',
       padding:10,
       color: '#000'
   },
   button: {
     width: 300,
     backgroundColor: '#CD2626',
     borderRadius: 10,
     marginVertical: 20,
     paddingVertical:10,
     alignSelf: 'center'
   },
   buttonText: {
     fontSize: 20,
     fontWeight: '500',
     color: '#fff',
     textAlign: 'center'
   }

   });
