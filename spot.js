import React, { Component } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

import { Annotation } from 'react-native-mapbox-gl';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';
import { HoodsButton } from './button.js';
import { HoodsPopup } from './popup.js';

const util = require('util')

export class HoodsSpot extends Component {


	constructor(props) {
		super(props)
		this.state = {
			pressed: false
		}
	}

	componentDidUpdate() {
		
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
					body={this.props.description}
					onPickUp={this.pickUp.bind(this)}
					onDropDown={this.dropDown.bind(this)} />
				}

				<HoodsButton style={styles.button} onPress={this.pressSpot.bind(this)}>
					<HoodsImage style={styles.icon} resizeMode='contain'
						source={{uri: `http://localhost:8080/files/${this.props.category}.png`}} />
				</HoodsButton>
			</Annotation>
		)
	}

	pressSpot(event) {
		this.props.onPress(event, this.props)
	}

	pickUp(event) {
		console.warn('pick up')
		this.props.onPickUp(event, this.props)
	}

	dropDown(event) {
		console.warn('drop down')
		this.props.onDropDown(event, this.props)
	}
}

const styles = StyleSheet.create({
	spot: {
		width: settings.spot_size,
		height: settings.spot_size
	},
	button: {
		backgroundColor: 'transparent'
	},
	icon: {
		width: settings.spot_size,
		height: settings.spot_size
	}
})




