import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import { settings } from './settings.js';


export const HoodsText = (props)=> {

	return (
		<Text style={[styles.text,
			props.small ? styles.text_small : {},
			props.light ? styles.text_light : {},
			props.style]}>{props.children}</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		color: settings.black,
		fontSize: settings.body_size,
		fontFamily: settings.body_family,
		backgroundColor: 'transparent'
	},
	text_small: {
		fontSize: settings.small_size
	},
	text_light: {
		color: settings.white
	}
})