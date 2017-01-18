import React, { Component } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsButton } from './button.js';
import { HoodsButtonGroup } from './button_group.js';


export class HoodsPopup extends Component {


	constructor() {
		super()
		this.state = {
			fade: new Animated.Value(0)
		}
	}

	componentDidMount() {
		Animated.timing(
			this.state.fade, { toValue: 1, duration: settings.fast }
		).start()
	}

	openDirections() {

	}

	render() {
		return (
			<Animated.View style={[styles.popup, {opacity: this.state.fade}]}>
				<HoodsText style={styles.text}>{this.props.title}</HoodsText>
				{this.props.body &&
					<HoodsText style={[styles.text, styles.text_small]}>{this.props.body}</HoodsText>
				}
				<HoodsButtonGroup style={styles.buttons}>
					<HoodsButton onPress={this.openDirections.bind(this)}>Directions</HoodsButton>
					<HoodsButton onPress={this.props.onPickUp}>Pick Up</HoodsButton>
				</HoodsButtonGroup>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	popup: {
		position: 'absolute',
		bottom: 32,
		left: -(Dimensions.get('window').width-settings.gutter-settings.spot_size)/2,
		zIndex: 3,
		
		width: Dimensions.get('window').width-settings.gutter,
		padding: settings.tight_gutter,

		borderRadius: settings.border_radius,
		backgroundColor: settings.black
	},
	text: {
		color: settings.white
	},
	text_small: {
		fontSize: settings.small_size
	}
})




