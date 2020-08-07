import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, Image, View, YellowBox, KeyboardAvoidingView, Alert, StatusBar, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, CheckBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomerWallet extends React.Component {

  constructor(props) {

      super(props)

      this.state = {
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
        this.setState({ UserToken: tokenGet, isLoading: false });
      } else {
        this.setState({ UserToken: false });
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
        <KeyboardAvoidingView style={styles.container}>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoadCard')} style={styles.baloon1}>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center',marginTop:30 }}>Load </Text>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center' }}>Customer </Text>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center' }}>Card </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Rewards')} style={styles.baloon2}>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center',marginTop:30 }}>Check </Text>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center' }}>Customer </Text>
        <Text style={{color: '#ffffff', fontWeight:'bold', fontSize:20, textAlignVerticalAlign:'center' }}>History </Text>
        </TouchableOpacity>

        </View>

        <View
          style={{
            borderBottomColor: '#134E13',
            borderBottomWidth: 2,
            margin:20
          }}
        />

       </KeyboardAvoidingView>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lookup: {
    marginTop:20,
    alignItems:'center',
  },
  inputBox: {
    alignSelf: 'center',
    width: 300,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#228B22',
    borderWidth: 2
  },
  AmountBox: {
    alignSelf: 'center',
    width: 300,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 40,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderColor:'#CD2626',
    borderWidth: 2
  },
  baloon1: {
    backgroundColor: '#134E13',
    margin:20,
    alignItems:'center',
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  baloon2: {
    backgroundColor: '#CD2626',
    margin:20,
    alignItems:'center',
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  button: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#CD2626',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:10
  },
  buttonn: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#CD2626',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:10
  },
  button2: {
    alignSelf: 'center',
    width: 100,
    backgroundColor: '#228B22',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  preText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center'
  }
});
