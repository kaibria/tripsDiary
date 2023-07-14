import {SafeAreaView, View, Text} from "react-native";

import * as Location from 'expo-location';
import MapView, {Polyline} from "react-native-maps";
import { Marker, Heatmap } from 'react-native-maps';
import React, {useCallback, useEffect, useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import {useFocusEffect} from "@react-navigation/native";
console.warn = () => {};

export default function Map() {
    interface Excursion {
        excursionname: string;
        location: {
            latitude: number;
            longitude: number;
        };
    }

    //const [trips, setTrips] = useState([])
    const [zoom, setZoom] = useState(false)
    const [userid, setUserid] = useState<string>("")
    const [trips, setTrips] = useState<any[]>([]);
    const [anzeigen, setAnzeigen] = useState(false)
    const [excursions, setExcursions] = useState<Excursion[]>([]);

    const [shouldUpdateMap, setShouldUpdateMap] = useState("")



    const [mapRegion, setmapRegion] = useState({
        latitude: 47.5,
        longitude: 8.7,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    function zoomChange(e:any){
        if (e.latitudeDelta * e.longitudeDelta <= 1.08){
            setZoom(true);
        }
        else{
            setZoom(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const userId = await AsyncStorage.getItem('userid');
                    if (userId !== null) {
                        setUserid(userId);
                        const snapshot = await firebase.database().ref(`users/${userId}/trips`).once('value');

                        const tripsData:any = [];
                        snapshot.forEach((childSnapshot) => {
                            var trip = childSnapshot.val();
                            trip.key = childSnapshot.key;
                            tripsData.push(trip);
                        });

                        console.log("tripper 2.0 ", tripsData)
                        setTrips([...tripsData]);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, [])
    );

    useEffect(() => {
        const interval = setInterval(() => {
        AsyncStorage.getItem("updateMap").then((e:any)=>setShouldUpdateMap(e))
    }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);



    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const userId = await AsyncStorage.getItem('userid');
                    if (userId !== null) {
                        setUserid(userId);
                        const snapshot = await firebase.database().ref(`users/${userId}/trips`).once('value');

                        snapshot.forEach((childSnapshot) => {
                            var trip = childSnapshot.val();
                            const excursionsArray: any = Object.keys(trip.excursions).map((key) => {
                                return {...trip.excursions[key], id: key};
                            });
                            setExcursions(excursionsArray);
                        });
                    }
                } catch (error) {
                    if (excursions.length === 0) {
                    }
                }
            };
            fetchData();
        }, [])
    );


        return(
            <SafeAreaView>
                {trips.length>0 && excursions.length > 0 &&
                    <MapView
                        style={{ alignSelf: 'stretch', height: '100%' }}
                        region={mapRegion}
                        onRegionChange={(e) => zoomChange(e)}>

                        {zoom ?
                            <View>
                                {excursions.map((ex) =>
                                    <Marker coordinate={{latitude: ex.location.latitude,longitude: ex.location.longitude}} title={ex.excursionname} pinColor={"yellow"}/>
                                )}
                            </View> :
                            <View>

                                {trips.map((trip) => trip.status ?
                                    <Marker coordinate={trip} title={trip.tripname} pinColor={"blue"}/>
                                    : <Marker coordinate={trip} title={trip.tripname}/>)}
                            </View>
                        }
                    </MapView>
                }
            </SafeAreaView>
        );
}