import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, RefreshControl, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';

class Rewards extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
        isLoading: true,
        refreshing: false,
        search: '',
        }
      this.arrayholder = [];

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
            backgroundColor: "#3b5998",
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

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.webCall();
        }
      }

    webCall=()=>{

     fetch('https://puma.perltechnologies.com/rewards.php',{
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
                isLoading: false,
                dataSource: responseJson
              }, function() {
                // In this block you can do something with new state.
                this.arrayholder = responseJson;
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

    search = text => {
       console.log(text);
     };

     clear = () => {
       this.search.clear();
     };

     SearchFilterFunction(text) {
       //passing the inserted text in textinput
       const newData = this.arrayholder.filter(function(item) {
         //applying filter for the inserted text in search bar
         const itemData = item.Customer_CardID ? item.Customer_CardID.toUpperCase() : ''.toUpperCase();
         const textData = text.toUpperCase();
         return itemData.indexOf(textData) > -1;
       });
       this.setState({
         //setting the filtered newData on datasource
         //After setting the data it will automatically re-render the view
         dataSource: newData,
         search:text,
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

        <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Enter CARD ID"
          value={this.state.search}
          containerStyle={{backgroundColor:'#ffffff'}}
          inputContainerStyle={{borderWidth:2, borderColor:'#3b5998'}}
          />
          <FlatList

           data={ this.state.dataSource }

           ItemSeparatorComponent = {this.FlatListItemSeparator}

           renderItem={({item}) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerRewards', { customerid:item.Customer_ID })}>
               <View style={{flex:1, flexDirection: 'row'}}>
                 <Text style={styles.lefttextView}>{item.Customer_CardID} </Text>
                 <Text style={styles.propView}>{item.Customer_Firstname+" "+item.Customer_Lastname}</Text>
                 <Text style={styles.textView}>{item.Points_Sum}</Text>
               </View>
               </TouchableOpacity>

             }

           keyExtractor={(item, index) => index.toString()}

           />

        </ScrollView>
      );
    }
   }

export default withNavigationFocus(Rewards);

   const styles = StyleSheet.create({

   container :{
       flex:1,
       margin: 5,
       marginTop: (Platform.OS === 'ios') ? 20 : 0,
   },
   textView: {
       width:'30%',
       textAlignVertical:'center',
       padding:10,
       color: '#000'
   },
   propView: {
       width:'50%',
       textAlignVertical:'center',
       padding:10,
       color: '#000'
   },
   lefttextView: {
       width:'20%',
       textAlignVertical:'center',
       padding:10,
       color: 'brown'
   }

   });
