import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { settings } from './settings.js';

import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';
import { HoodsButton } from './button.js';
import { HoodsMap } from './map.js';


export class HoodsApp extends Component {

	render() {
		return (
			<View>
				<HoodsMap />

				<View style={{padding: settings.gutter}}>
					<HoodsText>Find the hidden gems of your neighborhood and share your collection with your friends.</HoodsText>
					<HoodsButton>Button</HoodsButton>
				</View>
			</View>
		)
	}
}


