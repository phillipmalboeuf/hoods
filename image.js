import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { settings } from './settings.js';


export const HoodsImage = (props) => {

	return (
		<Image style={[styles.image, props.style]}
			resizeMode={props.resizeMode}
			source={props.source} />
	)
}

const styles = StyleSheet.create({
	image: {
	}
})