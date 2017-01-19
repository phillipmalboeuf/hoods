import React, { Component } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

import { Annotation } from 'react-native-mapbox-gl';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';
import { HoodsButton } from './button.js';
import { HoodsPopup } from './popup.js';


export class HoodsSpot extends Component {


	constructor(props) {
		super(props)
		this.state = {
			pressed: false
		}
	}

	render() {

		return (
			<Annotation id={this.props._id}
				style={[styles.spot,
					this.props.isFocused ? styles.spot_focused : {}
				]}
				coordinate={{
					latitude: this.props.coordinates.latitude,
					longitude: this.props.coordinates.longitude
				}}>

				{this.props.isFocused &&
				<HoodsPopup
					title={this.props.title}
					body={this.props.description}
					isPickedUp={this.props.isPickedUp}
					onPickUp={this.pickUp.bind(this)}
					onDropDown={this.dropDown.bind(this)}
					onClose={this.close.bind(this)} />
				}

				<HoodsButton 
					style={[styles.button, 
						this.props.isFocused ? styles.button_focused : {},
						this.props.isPickedUp ? styles.button_picked_up : {}
					]}
					onPress={this.pressSpot.bind(this)}>
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
		this.props.onPickUp(event, this.props)
	}

	close(event) {
		this.props.onClose(event)
	}

	dropDown(event) {
		this.props.onDropDown(event, this.props)
	}
}

const styles = StyleSheet.create({
	spot: {
		position: 'absolute',
		width: settings.spot_size,
		height: settings.spot_size,
	},
	spot_focused: {
		zIndex: 1,
		width: Dimensions.get('window').width-settings.gutter,
		height: settings.popup_height+settings.spot_size
	},
	button: {
		position: 'absolute',
		padding: 0,
		backgroundColor: 'transparent'
	},
	button_focused: {
		bottom: settings.popup_height-(settings.spot_size*1.666),
		left: (Dimensions.get('window').width-settings.gutter)/2-settings.spot_size/2
	},
	button_picked_up: {
		opacity: 0.666
	},
	icon: {
		width: settings.spot_size,
		height: settings.spot_size
	}
})




