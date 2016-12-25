import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { settings } from './settings.js';

import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';
import { HoodsMap } from './map.js';


export class HoodsApp extends Component {

	render() {
		return (
			<View>
				<HoodsMap />
				<HoodsText>Find the hidden gems of your neighborhood and share your collection with your friends.</HoodsText>
			</View>
		)
	}
}



