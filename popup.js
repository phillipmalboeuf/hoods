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
			this.state.fade, { toValue: 1, duration: 0 }
		).start()
	}

	render() {
		return (
			<Animated.View style={[styles.popup, {opacity: this.state.fade}]}>
				<HoodsText style={styles.text}>{this.props.title}</HoodsText>
				{this.props.body &&
					<HoodsText style={[styles.text, styles.text_small]}>{this.props.body}</HoodsText>
				}
				<HoodsButtonGroup style={styles.buttons}>
					{this.props.isPickedUp ? 
						<HoodsButton onPress={this.props.onDropDown}>Drop Down</HoodsButton> :
						<HoodsButton onPress={this.props.onPickUp}>Pick Up</HoodsButton>
					}
					<HoodsButton onPress={this.props.onClose}>Close</HoodsButton>
				</HoodsButtonGroup>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	popup: {
		position: 'absolute',
		top: -settings.popup_height/2,
		left: 0,
		zIndex: 3,

		height: settings.popup_height,
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




