import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends React.Component {
  render() {
    return (
      <View>
      <Image
        style={{width: 400, height: 80, margin:20}}
        source={require('../images/altlogo.jpg')}
      />
      </View>
    );
  }
}
