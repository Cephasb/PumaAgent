import React, { Component } from 'react';
import {StyleSheet, ScrollView, RefreshControl, Text, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, YellowBox, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default class ShowUsername extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      UserToken: '',
      isLoading: true,
      Firstname: '',
      Lastname:'',
      UserPhoto:'',

    }

    YellowBox.ignoreWarnings([
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: Async Storage has been extracted from react-native'
   ]);

  }

  async componentDidMount() {
    const tokenGet = await AsyncStorage.getItem("UserToken");
    if (tokenGet) {
      this.setState({ UserToken: tokenGet, isLoading: false, });
      this.webCall();
    } else {
      this.setState({ UserToken: false, isLoading: false, });
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
              Firstname: responseJson[0].AppUser_Firstname,
              Lastname: responseJson[0].AppUser_Lastname,
              UserPhoto: responseJson[0].AppUser_Photo,
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.error(error);
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
      <View style={styles.container}>
        <Image style={styles.avatar}  source={{uri: 'https://puma.perltechnologies.com/'+this.state.UserPhoto}} defaultSource={require('../images/avatar.gif')}/>
        <Text style={styles.welcomeText}> {this.state.Firstname+" "+this.state.Lastname} </Text>
        <Text style={styles.welcomeText}> <Icon  name='ios-settings' size={20} /></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#CD2626'
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'flex-start'
  },
  welcomeText: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '500',
    color: '#ffffff',
  }
});
