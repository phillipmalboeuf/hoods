

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { HoodsApp } from './app.js'


export default class Hoods extends Component {
  render() {
    return (
      <HoodsApp />
    );
  }
}


AppRegistry.registerComponent('hoods', () => Hoods);
