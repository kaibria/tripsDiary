import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Platform, Pressable} from 'react-native';
import Geocoder from 'react-native-geocoding';
import firebase from "firebase/compat";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface TripsProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    trips: any[];
    setTrips: any;
}

const ProductModal = (props: TripsProps) => {
    const [newTripName, setNewTripName] = useState("");
    const [count, setCount] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const [location, setLocation] = useState<any>([]);
    const [show, setShow] = useState(false);
    const [userid, setUserid] = useState(null)

    const handleAdd = () => {
        if (newTripName !== "") {
            Geocoder.init("AIzaSyBh11L0APOKafweWqEMonCy1OqRYRA7sPg");
            Geocoder.from(newTripName)
                .then(json => {
                    const location = json.results[0].geometry.location;

                    const trip = {
                        tripname: newTripName,
                        longitude: location.lng,
                        latitude: location.lat,
                        status: false,
                        excursions: []
                    };

                    saveTripToFirebase(trip);

                    props.setModalVisible(false);
                    setErrorMessage("");
                    setNewTripName("");

                    try {
                        props.setTrips([...props.trips, trip]);
                    } catch (error) {
                        console.error(error);
                    }
                })
                .catch((error) => {
                    setErrorMessage("Place don't exists");
                    return;
                });
        } else {
            setErrorMessage("Bitte fülle das Feld aus");
        }
    };

    const saveTripToFirebase = (trip: any) => {

        AsyncStorage.getItem('userid').then((value: any) => {
            if (value !== null) {
                setUserid(value);

                firebase.database().ref(`users/${value}/trips`).push().set(trip)
                    .then(() => {
                        props.setModalVisible(false);
                        setErrorMessage("");
                        setNewTripName("");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {

            }
        });
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Trip Name"
                        value={newTripName}
                        onChangeText={setNewTripName}
                    />
                    <Text style={styles.error}>{errormessage}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAdd}
                    >
                        <Text style={styles.textStyle}>Add Trip</Text>
                    </TouchableOpacity>
                    <Pressable onPress={() => {
                        props.setModalVisible(false);
                        setErrorMessage("");
                        setNewTripName("")
                    }}><Text>Cancel</Text></Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: '90%',
        maxHeight: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10,
        marginBottom: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    error: {
        color: 'red'
    },
    picker: {
        marginBottom: 10,
    }
});

export default ProductModal;
