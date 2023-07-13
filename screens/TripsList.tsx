import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, Text, SafeAreaView, FlatList} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import {db} from '../app/config/firebase'

export default function TabOneScreen() {
    const [userid, setUserid] = useState<any>("");
    const [trips, setTrips] = useState<any>([
        {
            tripname: "test",
            location: "testlocation"
        },
        {
            tripname: "test",
            location: "testlocation"
        },
        {
            tripname: "test",
            location: "testlocation"
        },
        {
            tripname: "test",
            location: "testlocation"
        },
        {
            tripname: "test",
            location: "testlocation"
        },
    ])

    useEffect(() => {
       /* AsyncStorage.getItem('userid').then((value) => {
            setUserid(value);
        });

        if (userid != null) {
            db.collection('users').doc(userid).get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("Benutzerdaten: ", doc.data());
                        setTrips(doc.data())
                    } else {
                        console.log("Keine Daten vorhanden!");
                    }
                })
                .catch((error) => {
                    console.error("Fehler beim Abrufen der Benutzerdaten: ", error);
                });
        }

        */
    }, []);

    const renderItem = ({item}: { item: any }) => (

        <View style={styles.field}>
            <Text>{item.tripname}</Text>
            <Text>{item.location}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.list} data={trips} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 40
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    textTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    textSubTitle: {
        flex: 1,
        fontSize: 16,
        color: '#666',
    },
    list: {
        flex: 1
    }
});
