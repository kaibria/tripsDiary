import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import SignIn from './login/SignIn'
import SignUp from './login/SignUp'
import React, {useState} from "react";

export default function ModalScreen() {
    const [displayComponent, setDisplayComponent] = useState('');

    return (
        <View style={styles.container}>
            {displayComponent === 'signin' && <SignIn/>}
            {displayComponent === 'signup' && <SignUp/>}
            {displayComponent === '' && (
                <View style={styles.buttonView}>
                    <Text style={styles.title}>Welcome To Trip Diary</Text>
                    <Text style={styles.text}>Please Login or Register</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => setDisplayComponent('signin')}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton} onPress={() => setDisplayComponent('signup')}>
                        <Text style={styles.registerButtonText}>Registration</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    text: {
        fontSize: 20,
        paddingBottom: 30
    },
    loginButton: {
        width: '90%',
        height: 40,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    registerButton: {
        width: '90%',
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        borderColor: '#1E90FF',
        borderWidth: 1,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    registerButtonText: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200
    },
});
