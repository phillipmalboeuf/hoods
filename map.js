import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

import Mapbox from 'react-native-mapbox-gl';
import { MapView, Annotation } from 'react-native-mapbox-gl';

import { settings } from './settings.js';
import { HoodsText } from './text.js';
import { HoodsSpot } from './spot.js';

const util = require('util')

Mapbox.setAccessToken('pk.eyJ1IjoicGhpbGxpcG1hbGJvZXVmIiwiYSI6IndpQUx1SDAifQ.Ie3-MUxMAPbr7tr2IgFHHw')


export class HoodsMap extends Component {

	

	constructor() {
		super()

		fetch('https://hoods.apps.deming.tech/maps/585d88efd6454d2f21de701f', {headers: {'Accept': 'application/json'}})
		.then((response) => response.json())
		.then((json) => {
			this.setState(json)
		}).done()

		this.state = {
			focusedSpot: null,
			pickedUpSpot: null
		}

		// this.state = {'center': {'longitude': -73.58, 'latitude': 45.532}, 'zoom': 13.0, 'tags': ['restaurants'], 'direction': 0.0, '_id': '585d88efd6454d2f21de701f', 'style': 'mapbox://styles/phillipmalboeuf/ciurepz8o00fr2io26rhn8nuw?test', 'title': "Phil's Map", 'spots': [{'description': 'A short insightful description of this spot', '_id': '585d88efd6454d2f21de702f', 'title': "L'entre-pots", 'coordinates': {'longitude': -73.582633, 'latitude': 45.538926}, 'category': 'coffee'}, {'description': 'A short insightful description of this spot', '_id': '585d88efd6454d2f21de703f', 'title': 'Home', 'coordinates': {'longitude': -73.579264, 'latitude': 45.539226}, 'category': 'home'}]}
	}

	componentWillMount () {
		this.loaded = false
	}

	render() {

		return (
			<View style={styles.map}>
				<HoodsText style={styles.title}>{this.state.title}</HoodsText>
				{this.state.center &&
				<MapView style={styles.map}
					ref={map => { this.map = map }}
					styleURL={this.state.style}
					initialCenterCoordinate={{
						latitude: this.state.center.latitude,
						longitude: this.state.center.longitude
					}}
					initialZoomLevel={this.state.zoom}
					annotationsPopUpEnabled={false}
					annotationsAreImmutable={true}
					pitchEnabled={false}
					compassIsHidden={true}
					debugActive={false}
					logoIsHidden={true}
					attributionButtonIsHidden={true}
					onFinishLoadingMap={this.finishLoading.bind(this)}
					onRegionDidChange={this.panning.bind(this)}
					// annotations={this.state.spots.map(spot => (
					// 	{
					// 		type: 'point',
					// 		id: spot._id,
					// 		title: spot.title,
					// 		coordinates: [spot.coordinates.latitude, spot.coordinates.longitude],
					// 		annotationImage: {source: {uri: 'https://cldup.com/7NLZklp8zS.png', height: 25, width: 25}}
					// 	}
					// ))}
					/>
				}

				{this.state.spots && this.state.spots.map(spot => (
				<HoodsSpot 
					_id={spot._id} key={spot._id}
					title={spot.title}
					description={spot.description}
					coordinates={spot.coordinates}
					x={spot.x}
					y={spot.y}
					category={spot.category}
					isFocused={spot._id == this.state.focusedSpot}
					isPickedUp={spot._id == this.state.pickedUpSpot}
					onPress={this.focusSpot.bind(this)}
					onPickUp={this.pickUp.bind(this)}
					onDropDown={this.dropDown.bind(this)}
					onClose={this.close.bind(this)} />
				))}
			</View>
		)
	}

	focusSpot(event, spot) {
		this.map.setCenterCoordinate(spot.coordinates.latitude, spot.coordinates.longitude)
		this.setState({ focusedSpot: spot._id })
	}

	pickUp(event, spot) {
		this.map.setCenterCoordinate(spot.coordinates.latitude, spot.coordinates.longitude)
		this.setState({ pickedUpSpot: spot._id })
	}

	dropDown(event, spot) {
		this.setState({ pickedUpSpot: null })
	}

	close(event, spot) {
		this.setState({ focusedSpot: null })
	}


	moveSpots() {
		if (this.loaded) {
			this.map.getBounds(bounds => {

				const spots = this.state.spots.map(spot => {
					spot.x = Math.round((spot.coordinates.longitude-bounds[1])/(bounds[3]-bounds[1])*Dimensions.get('window').width)
					spot.y = Math.round((spot.coordinates.latitude-bounds[0])/(bounds[2]-bounds[0])*Dimensions.get('window').height)
					
					return spot
				})

				this.setState({spots: spots})
			})
		}
			
	}


	finishLoading(event) {
		this.loaded = true
		this.moveSpots()
	}

	panning(event) {

		this.moveSpots()

		// console.warn(util.inspect(event))
		// if (this.state.pickedUpSpot) {
		// 	this.map.getCenterCoordinateZoomLevel(coordinates => {
				// const spots = this.state.spots.map(spot => {
				// 	if (this.state.pickedUpSpot == spot._id) {
				// 		spot.coordinates.latitude = coordinates.latitude
				// 		spot.coordinates.longitude = coordinates.longitude
				// 	}
				// 	return spot
				// })

		// 		this.setState({ spots: spots })
		// 	})
		// }
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
		zIndex: 1,
		width: Dimensions.get('window').width,
		padding: settings.gutter,
		textAlign: 'center'
	}
})




