import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';

import { settings } from './settings.js';
import { HoodsText } from './text.js';


export class HoodsButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pressed: false
		}
	}

	render () {
		return <TouchableWithoutFeedback
			onPress={this.props.onPress} 
			onPressIn={()=>{this.setState({pressed: true})}} 
			onPressOut={()=>{this.setState({pressed: false})}}>
				<Animated.View style={[styles.button, this.state.pressed ? styles.button_pressed:{}, this.props.style]}>
					<HoodsText style={styles.text}>{this.props.children}</HoodsText>
				</Animated.View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	button: {
		padding: settings.gutter/4,
		paddingTop: settings.gutter/10,
		paddingBottom: settings.gutter/10,
		backgroundColor: settings.black
	},
	button_pressed: {
		transform: [{
			translateY: 1
		}]
	},
	text: {
		color: settings.white,
		fontSize: settings.small_size,
		textAlign: 'center'
	}
})