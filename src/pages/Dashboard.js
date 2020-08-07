import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, RefreshControl, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';

class Dashboard extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
        isLoading: true,
        refreshing: false,
        date:'',
        dataSource:''
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
            height: 1,
            width: "100%",
            backgroundColor: "#CD2626",
          }}
        />
      );
    }

    async componentDidMount() {
      const tokenGet = await AsyncStorage.getItem("UserToken");
      if (tokenGet) {
        this.setState({ UserToken: tokenGet,isLoading:false });
        this.webCall();
      } else {
        this.setState({ UserToken: false,isLoading:false });
      }

      var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      that.setState({
        //Setting the value of the date time
        date:
          date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.webCall();
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
                 Station: responseJson[0].AppUser_Station
               }, function() {
                 // In this block you can do something with new state.
               });

               fetch('https://puma.perltechnologies.com/mobdashboard.php',{
                 method: 'POST',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({

                   id: this.state.UserToken

                 })

               }).then((response) => response.json())
                      .then((responseJson) => {
                        this.setState({
                          dataSource: responseJson
                        }, function() {
                          // In this block you can do something with new state.
                        });

                        fetch('https://puma.perltechnologies.com/mobdashtotal.php',{
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({

                            id: this.state.UserToken

                          })

                        }).then((response) => response.json())
                               .then((responseJson) => {

                                 if (responseJson[0].Amount_Sum == undefined || responseJson[0].Amount_Sum.length == 0 || responseJson[0].Amount_Sum==null ){
                                   this.setState({
                                     Amount_Sum: '0',
                                     isLoading: false,
                                   });

                                 }else{

                                 this.setState({
                                   Amount_Sum: responseJson[0].Amount_Sum
                                 }, function() {
                                   // In this block you can do something with new state.
                                 });
                               }
                               })
                               .catch((error) => {
                                 console.error(error);
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

        <Text style={{color:'#134E13',fontWeight:'bold', fontSize:20, textAlign:'center'}}> Last 5 Transactions </Text>
        <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center', margin:5}}> {this.state.Station}</Text>
        <Animatable.View animation="slideInRight">
          <View style={{flex:1, flexDirection: 'row', backgroundColor:'#134E13'}}>
            <Text style={styles.lefttextViewH}> Date </Text>
            <Text style={styles.propViewH}>  Voucher ID </Text>
            <Text style={styles.textViewH}> Vehicle Number </Text>
          </View>
          <FlatList

           data={ this.state.dataSource }

           ItemSeparatorComponent = {this.FlatListItemSeparator}

           renderItem={({item}) =>

               <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                 <Text style={styles.lefttextView}>{item.Date_Used} </Text>
                 <Text style={styles.propView}>{item.Voucher_Serial}</Text>
                 <Text style={styles.textView}>{item.Vehicle_ID}</Text>
               </View>

             }

           keyExtractor={(item, index) => index.toString()}

           />

           { this.state.dataSource == ''?

           <View style={styles.headerStyle}>
             <Text style={styles.icontextStyle}><Icon name='md-refresh' size={16} style={styles.iconStyle}/> No data. Pull to refresh</Text>
           </View>
           :
           <View
             style={{
               height: 1.5,
               width: "100%",
               backgroundColor: "#000",
               margin:10
             }}
           />
         }
           <View style={{flex:1, backgroundColor:'#DCDCDC', paddingVertical:10}}>
             <Text style={{fontWeight:'bold', fontSize:18, textAlign:'center'}}> Total Amount: GH₵{this.state.Amount_Sum} </Text>
             <Text style={{fontWeight:'bold', fontSize:14, textAlign:'center'}}>{this.state.date}</Text>
           </View>
           </Animatable.View>

           <Animatable.View animation="slideInLeft">
           <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
           <Text style={styles.buttonText}><Icon name="md-person-add" size={18}/> REGISTER CUSTOMER</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('AcceptVoucher')}>
           <Text style={styles.buttonText}><Icon name="md-card" size={18}/> ACCEPT VOUCHER </Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CustomerPurchase')}>
           <Text style={styles.buttonText}><Icon name="md-cash" size={18}/> PURCHASE FUEL</Text>
           </TouchableOpacity>

           </Animatable.View>

        </ScrollView>
      );
    }
   }

export default withNavigationFocus(Dashboard);

   const styles = StyleSheet.create({

   container :{
       flex:1,
       margin: 5,
       marginTop: (Platform.OS === 'ios') ? 20 : 0,
   },
   textViewH: {
       width:'35%',
       textAlign:'center',
       padding:10,
       fontSize: 16,
       color: '#fff'
   },
   propViewH: {
       width:'35%',
       textAlign:'center',
       padding:10,
       fontSize: 16,
       color: '#fff'
   },
   lefttextViewH: {
       width:'30%',
       textAlignVertical:'center',
       padding:10,
       fontSize: 16,
       color: '#fff'
   },
   textView: {
       width:'35%',
       textAlign:'center',
       padding:5,
       fontSize: 14,
       color: '#000'
   },
   propView: {
       width:'35%',
       textAlign:'center',
       padding:5,
       fontSize: 14,
       color: '#000'
   },
   lefttextView: {
       width:'30%',
       textAlignVertical:'center',
       padding:5,
       fontSize: 14,
       color: '#000'
   },
   button: {
     width: 300,
     backgroundColor: '#134E13',
     borderRadius: 10,
     marginTop: 10,
     paddingVertical:10,
     alignSelf: 'center'
   },
   buttonText: {
     fontSize: 18,
     color: '#fff',
     textAlign: 'center'
   },
   button2: {
     width: 300,
     backgroundColor: '#CD2626',
     borderRadius: 10,
     borderColor: '#ffffff',
     borderWidth: 2.5,
     marginTop: 10,
     paddingVertical:10,
     alignSelf: 'center'
   },
   buttonText2: {
     fontSize: 18,
     fontWeight: '500',
     color: 'white',
     textAlign: 'center'
   },
   headerStyle: {
     flex: 1,
     justifyContent: 'space-between',
     alignItems: 'center',
     marginVertical: 20
   },
   iconStyle: {
     color: '#2980b9',
     textAlign:'center',
   },
   icontextStyle: {
     fontSize: 14,
     textAlign:'center',
     fontWeight:'bold',
     color:'grey'
   },

   });
