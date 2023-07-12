import {SafeAreaView} from "react-native";

import * as Location from 'expo-location';
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Map() {

    const [trips, setTrips] = useState([{longitude: 9, latitude: 47.5, visited: false},{longitude: 8.7, latitude: 47.5, visited: true}])

    const [mapRegion, setmapRegion] = useState({
        latitude: 47.5,
        longitude: 8.7,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return(
        <SafeAreaView>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}>
                {/*trips.map((trip) => trip.visited ? <Marker coordinate={trip} title='Marker' > <FontAwesome name="rebel" size={38} color="#25292e"/></Marker> : <Marker coordinate={trip} title='Marker' > <FontAwesome name="question" size={38} color="#25292e"/></Marker>)*/}

            </MapView>
        </SafeAreaView>
    )
}