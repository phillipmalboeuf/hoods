import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import { settings } from './settings.js';


export class HoodsText extends Component {

	render() {
		return (
			<Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: settings.body_size,
		fontFamily: settings.body_family,
		backgroundColor: 'transparent'
	}
})