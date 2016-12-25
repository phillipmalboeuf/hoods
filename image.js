import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { settings } from './settings.js';


export class HoodsImage extends Component {

	render() {
		return (
			<Image style={styles.image} resizeMode={this.props.resizeMode} source={this.props.source} />
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/4
	}
})