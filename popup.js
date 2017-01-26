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

	render() {
		return (
			<Animated.View style={[styles.popup, 
				{
					opacity: this.state.fade,
					bottom: this.props.y+settings.spot_size,
					left: this.props.x-(Dimensions.get('window').width-settings.gutter-settings.spot_size)/2
				}]}>
				<HoodsText style={styles.text}>{this.props.title}</HoodsText>
				{this.props.body &&
					<HoodsText style={[styles.text, styles.text_small]}>{this.props.body}</HoodsText>
				}
				<HoodsButtonGroup style={styles.buttons}>
					{this.props.isPickedUp ? 
						<HoodsButton transparent onPress={this.props.onDropDown}><HoodsText small light>Drop Down</HoodsText></HoodsButton> :
						<HoodsButton transparent onPress={this.props.onPickUp}><HoodsText small light>Pick Up</HoodsText></HoodsButton>
					}
					<HoodsButton transparent onPress={this.props.onClose}><HoodsText small light>Close</HoodsText></HoodsButton>
				</HoodsButtonGroup>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	popup: {
		position: 'absolute',

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




