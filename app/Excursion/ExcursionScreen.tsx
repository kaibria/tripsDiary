import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, Text, SafeAreaView, FlatList, Image} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import {db} from '../config/firebase'
console.warn = () => {};


export default function ExcursionScreen({excursion, setShowDetails}: { excursion: any, setShowDetails: (excursion: any) => void }) {
    function getBack() {
        setShowDetails("")
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{uri: excursion.img}} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>{excursion.excursionname}</Text>
            <Text style={styles.date}>{excursion.date}</Text>
            <Text style={styles.description}>{excursion.descritpion}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={getBack}
            >
                <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '70%',
        height: '87%',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 140,
        marginBottom: 10,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20
    },
    date: {
        fontSize: 20,
        color: '#666',
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 10
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
