import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Mapbox from 'react-native-mapbox-gl';
import { MapView, Annotation } from 'react-native-mapbox-gl';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsSpot } from './spot.js';

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
						logoIsHidden={true}>

						{this.state.spots.map(spot => (
							<HoodsSpot 
								_id={spot._id} key={spot._id}
								title={spot.title}
								description={spot.description}
								coordinates={spot.coordinates}
								category={spot.category}
								isFocused={spot._id == this.state.focusedSpot}
								onPress={this.centerSpot.bind(this)} />
						))}

					</MapView>
				</View>
			)
		} else {
			return (
				<View></View>
			)
		}
	}

	centerSpot(event, spot) {
		this.map.setCenterCoordinate(spot.coordinates.latitude, spot.coordinates.longitude)
		this.setState({
			focusedSpot: spot._id
		})
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
		width: Dimensions.get('window').width,
		textAlign: 'center',
		paddingLeft: settings.tight_gutter,
		paddingRight: settings.tight_gutter,
		backgroundColor: 'transparent'
	}
})




