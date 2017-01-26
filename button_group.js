import React, { Component } from 'react';
import { View,  StyleSheet } from 'react-native';

import { settings } from './settings.js';


export const HoodsButtonGroup = props => {
	return <View style={[styles.button_group, props.style]}>{props.children}</View>
}

const styles = StyleSheet.create({
	button_group: {
		flex: 1,
		flexDirection: 'row',
		marginTop: settings.gutter/4
	}
})