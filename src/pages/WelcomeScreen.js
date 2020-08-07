import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AltLogo from '../components/AltLogo';
import * as Animatable from 'react-native-animatable';

export default class WelcomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>

      <Animatable.View animation="slideInLeft"><AltLogo/></Animatable.View>

      <Animatable.View animation="slideInRight" style = {styles.welcomeTextCont}>
      <Text style={styles.welcomeText}>Welcome Message:</Text>
      </Animatable.View>

      <Animatable.View animation="slideInLeft" style={styles.button}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
      <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      </Animatable.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  welcomeTextCont: {
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center'
  },
  button: {
    marginTop: 100,
    width: 150,
    backgroundColor: '#CD2626',
    paddingVertical:10,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
 }
});
