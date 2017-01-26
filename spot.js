import React, { Component } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

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
			<View id={this.props._id}
				style={[styles.spot,
					this.props.isFocused ? styles.spot_focused : {}
				]}>

				{this.props.isFocused &&
				<HoodsPopup
					x={this.props.x}
					y={this.props.y}
					title={this.props.title}
					body={this.props.description}
					isPickedUp={this.props.isPickedUp}
					onPickUp={this.pickUp.bind(this)}
					onDropDown={this.dropDown.bind(this)}
					onClose={this.close.bind(this)} />
				}


				<HoodsButton
					transparent
					style={[styles.button, 
						this.props.isFocused ? styles.button_focused : {},
						this.props.isMoving ? styles.button_hide : {},
						this.props.isPickedUp ? styles.button_picked_up : {},
						{
							bottom: this.props.y+(settings.spot_size/4),
							left: this.props.x-(settings.spot_size/2)
						}
					]}
					onPress={this.pressSpot.bind(this)}>
					<HoodsImage style={styles.icon} resizeMode='contain'
						source={{uri: `https://hoods.apps.deming.tech/files/${this.props.category}.png`}} />
				</HoodsButton>
			</View>
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
		// opacity: 1
	},
	spot_focused: {

	},
	button: {
		position: 'absolute',
		width: settings.spot_size,
		height: settings.spot_size,
		padding: 0
	},
	button_focused: {
		
	},
	button_hide: {
		opacity: 0
	},
	button_picked_up: {
		opacity: 0.666
	},
	icon: {
		width: settings.spot_size,
		height: settings.spot_size
	}
})




