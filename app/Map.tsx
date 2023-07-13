import {SafeAreaView, View, Text} from "react-native";

import * as Location from 'expo-location';
import MapView, {Polyline} from "react-native-maps";
import { Marker, Heatmap } from 'react-native-maps';
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Map() {

    const [trips, setTrips] = useState([{title: "Thurgau",longitude: 9, latitude: 47.5, visited: false},{title: "Raugau",longitude: 8.7, latitude: 47.5, visited: true}])

    const [excursion, setExcursion] = useState([{title: "Yo Ho",longitude: 8.75, latitude: 47.4},{title: "Gilgamesh",longitude: 8.73, latitude: 47.5}])

    const [zoom, setZoom] = useState(false)

    const [mapRegion, setmapRegion] = useState({
        latitude: 47.5,
        longitude: 8.7,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    function zoomChange(e){

        if (e.latitudeDelta * e.longitudeDelta <= 1.08){
            setZoom(true);
        }
        else{
            setZoom(false)
        }

    }

    return(
        <SafeAreaView>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            onRegionChange={(e) => zoomChange(e)}>

                {zoom ?
                        <View>
                            {excursion.map((ex) =>
                            <Marker coordinate={ex} title={ex.title} pinColor={"yellow"}/>
                        )}
                        </View> :
                        <View>

                            {trips.map((trip) => trip.visited ?
                                <Marker coordinate={trip} title={trip.title} pinColor={"blue"}/>
                                : <Marker coordinate={trip} title={trip.title}/>)}
                        </View>
                    }
            </MapView>
        </SafeAreaView>
    )
}