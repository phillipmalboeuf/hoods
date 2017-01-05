import React, { Component } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsImage } from './image.js';



export class HoodsPopup extends Component {

	state: any;

	constructor() {
		super()
		this.state = {
			fade: new Animated.Value(0)
		}
	}

	componentDidMount() {
		Animated.timing(
			this.state.fade,
			{
				toValue: 1,
				duration: settings.fast
			}
		).start()
	}

	render() {
		return (
			<Animated.View style={[styles.popup, {opacity: this.state.fade}]}>
				<HoodsText style={styles.popup_text}>{this.props.title}</HoodsText>
				{this.props.body &&
					<HoodsText style={[styles.popup_text, styles.small_popup_text]}>{this.props.body}</HoodsText>
				}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	popup: {
		width: Dimensions.get('window').width-settings.gutter,
		padding: settings.tight_gutter,
		position: 'absolute',
		bottom: 32,
		left: -(Dimensions.get('window').width-settings.gutter-settings.spot_size)/2,
		zIndex: 3,
		borderRadius: settings.border_radius,
		backgroundColor: settings.black
	},
	popup_text: {
		color: settings.white,
		padding: 0
	},
	small_popup_text: {
		fontSize: settings.small_size
	}
})




