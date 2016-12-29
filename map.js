import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { settings } from './settings.js';

import Mapbox from 'react-native-mapbox-gl';
import { MapView } from 'react-native-mapbox-gl';

import { HoodsText } from './text.js';

Mapbox.setAccessToken('pk.eyJ1IjoicGhpbGxpcG1hbGJvZXVmIiwiYSI6IndpQUx1SDAifQ.Ie3-MUxMAPbr7tr2IgFHHw')


export class HoodsMap extends Component {

	constructor() {
		super()

		fetch('http://127.0.0.1:8080/maps/585d88efd6454d2f21de701f', {headers: {'Accept': 'application/json'}})
		.then((response) => response.json())
		.then((json) => {
			this.setState(json)
		}).done()
	}

	render() {

		if (this.state != undefined) {
			return (
				<View>
					<HoodsText style={styles.title}>{this.state.title}</HoodsText>
					<MapView style={styles.map}
						ref={map => { this.map = map }}
						styleURL={this.state.style}
						initialCenterCoordinate={{
							latitude: this.state.center.latitude,
							longitude: this.state.center.longitude
						}}
						initialZoomLevel={this.state.zoom}
						annotationsPopUpEnabled={false}
						pitchEnabled={false}
						compassIsHidden={true}
						logoIsHidden={true} />
				</View>
			)
		} else {
			return (
				<View></View>
			)
		}
	}
}

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	title: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2,
		paddingLeft: settings.tight_gutter,
		backgroundColor: 'transparent'
	}
})




