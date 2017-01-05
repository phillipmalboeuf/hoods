import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Annotation } from 'react-native-mapbox-gl';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';
import { HoodsPopup } from './popup.js';



export class HoodsSpot extends Component {

	constructor() {
		super()
	}

	render() {
		return (
			<Annotation id={this.props._id} style={styles.spot}
				coordinate={{
					latitude: this.props.coordinates.latitude,
					longitude: this.props.coordinates.longitude
				}}>
				{this.props.isFocused &&
				<HoodsPopup
					title={this.props.title}
					body={this.props.description} />
				}
				<TouchableOpacity activeOpacity={1} onPress={this.pressSpot.bind(this)}>
					<HoodsImage style={styles.icon} resizeMode='contain'
						source={{uri: `http://localhost:8080/files/${this.props.category}.png`}} />
				</TouchableOpacity>
			</Annotation>
		)
	}

	pressSpot(event) {
		this.props.onPress(event, this.props)
	}
}

const styles = StyleSheet.create({
	spot: {
		width: settings.spot_size,
		height: settings.spot_size
	},
	icon: {
		width: settings.spot_size,
		height: settings.spot_size
	}
})




