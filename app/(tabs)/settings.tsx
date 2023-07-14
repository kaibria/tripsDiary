import {Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TripsList from '../Trips/TripsList'
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import React, {useEffect, useState} from "react";
import SignIn from "../login/SignIn";
import LoginModal from "../login/LoginModal";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from '@expo/vector-icons';

export default function Settings() {
    const [trips, setTrips] = useState([])
    const [logout, setLogout] = useState(false)
    const [isvisible, setIsvisible] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState()
    const [userid, setUserid] = useState<string | null>("")

    useEffect(() => {

        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userid');
                setUserid(userId)
                if (userId !== "") {
                    setLogout(false);
                }
                if (userId !== null) {
                    const snapshot = await firebase.database().ref(`users/${userId}/trips`).once('value');

                    const tripsData: any = [];
                    snapshot.forEach((childSnapshot) => {
                        var trip = childSnapshot.val();
                        trip.key = childSnapshot.key;
                        tripsData.push(trip);
                    });

                    setTrips(tripsData.filter((trip: any) => {
                        return trip.status == false
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    function handleTrip(){

        const selectedTripObj = trips.find((trip: any) => trip.tripname === selectedTrip)
        if (selectedTripObj) {

            firebase.database().ref(`users/${JSON.stringify(userid)}/trips/${selectedTripObj.key}`).update({
                status: true
            }).then(() => {
                console.log("Status updated successfully.");
            }).catch((error) => {
                console.error(error);
            });
        } else {
            console.log("No trip selected.");
        }
    }


    return (
        <>

                <LoginModal isVisible={isvisible} setIsVisible={setIsvisible}></LoginModal>

                <View style={styles.container}>
                    <Text>Wähle einen Trip aus um ihn zu beenden</Text>
                    <SelectDropdown
                        defaultButtonText={"Wähle deine Reise"}
                        data={trips.map((trip:any)=> trip.tripname)}
                        onSelect={(selectedItem, index) =>setSelectedTrip(selectedItem)}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={{backgroundColor: "transparent"}}
                        dropdownStyle={{borderRadius: 18}}
                        rowStyle={{borderRadius: 18}}
                        rowTextStyle={{color: "#1E90FF"}}
                    />
                    <Pressable style={styles.button} onPress={() => handleTrip()}><Text>Beenden</Text></Pressable>

                    <Pressable onPress={() => {
                        AsyncStorage.setItem('userid', "");
                        setLogout(true);
                    }}><Text>Logout</Text></Pressable>
                </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10,
        marginBottom: 10
    },
});
