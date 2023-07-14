import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, Text, SafeAreaView, FlatList, Image, Button} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import {db} from '../config/firebase'
import ExcursionScreen from "./ExcursionScreen";
console.warn = () => {};

export default function ExcursionList({tripname, setSelectedTrip}: { tripname: any, setSelectedTrip: (tripname: string) => void }) {
    const [userid, setUserid] = useState<any>("");
    const [excursions, setExcursions] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const [selectedExcursion, setSelectedExcursions] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userid');
                if (userId !== null) {
                    setUserid(userId);
                    const snapshot = await firebase.database().ref(`users/${userId}/trips`).once('value');

                    snapshot.forEach((childSnapshot) => {
                        var trip = childSnapshot.val();
                        if (trip.tripname === tripname) {
                            const excursionsArray: any = Object.keys(trip.excursions).map((key) => {
                                return {...trip.excursions[key], id: key};
                            });
                            setExcursions(excursionsArray);
                        }
                    });
                }
            } catch (error) {
                if (excursions.length === 0) {
                    setError("No excursions found")
                }
            }
        };
        fetchData();
    }, []);


    function getBack() {
        setSelectedTrip("")
    }

    function handleExcursion(item: any) {
        setSelectedExcursions(item)
        setShowDetail(true)
    }

    const renderItem = ({item}: { item: any }) => (
        <TouchableOpacity onPress={() => handleExcursion(item)}>
            <View style={styles.itemContainer}>
                <Image
                    source={{uri: item.img}}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.excursionname}</Text>
                    <Text style={styles.itemSubtitle}>{item.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {showDetail ? (
                <ExcursionScreen excursion={selectedExcursion} setShowDetails={setShowDetail}></ExcursionScreen>
            ) : (
                <SafeAreaView style={styles.container}>
                    {error && excursions == null ? <Text style={styles.error}>{error}</Text> : null}
                    <FlatList
                        style={styles.list}
                        data={excursions}
                        ListEmptyComponent={<Text>No excursions found</Text>}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />


                    <TouchableOpacity
                        style={styles.button}
                        onPress={getBack}
                    >
                        <Text style={styles.buttonText}>←</Text>
                    </TouchableOpacity>

                </SafeAreaView>

            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    textContainer: {
        marginLeft: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
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
    error: {
        textAlign: 'center',





    }
});