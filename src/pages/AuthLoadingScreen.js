import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoadingScreen extends React.Component {

  constructor() {
    super()
    this.loadApp()
  }

  loadApp = async () => {
      const userToken =  await AsyncStorage.getItem('UserToken')
      this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#CD2626"
        barStyle="light-content"
      />
        <ActivityIndicator/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    /**alignItems: 'center',**/
    justifyContent: 'center',
  },
});
