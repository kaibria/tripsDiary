import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, Text, SafeAreaView, FlatList} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import {db} from '../config/firebase'
import AddTrips from './AddTrips'
import {useFocusEffect} from "@react-navigation/native";
console.warn = () => {};

export default function TripsList({setSelectedTrip}: { setSelectedTrip: (tripname: string) => void }) {
    const [userid, setUserid] = useState<any>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showExcursion, setShowExcursion] = useState(false)
    const [trips, setTrips] = useState<any>([])

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

                        setTrips(tripsData);
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }, [])
    );


    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const handleTrip = (tripname: string) => {
        setSelectedTrip(tripname);
    };

    const renderItem = ({item}: { item: any }) => {
        // Definieren Sie den Stil abhängig vom Status des Ausflugs
        const itemContainerStyle = item.status ?
            [styles.itemContainer, {backgroundColor: 'green'}] :
            styles.itemContainer;

        return (
            <TouchableOpacity onPress={() => handleTrip(item.tripname)}>
                <View style={itemContainerStyle}>
                    <Text style={styles.itemTitle}>{item.tripname}</Text>
                    <Text style={styles.itemSubtitle}>{item.location}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.list} data={trips} renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}></FlatList>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    handleModal()
                }}
            >
                <Text style={styles.buttonText}>Trip hinzufügen</Text>
            </TouchableOpacity>
            <AddTrips
                modalVisible={isModalVisible}
                setModalVisible={setIsModalVisible}
                trips={trips}
                setTrips={setTrips}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    listContainer: {
        alignSelf: 'stretch',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    list: {
        flex: 1,
        alignSelf: 'stretch',
    },
    button: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#0070B4',
        padding: 10,
        borderRadius: 4,
        marginHorizontal: 20,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});