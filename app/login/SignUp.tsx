import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, Text} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen( {setIsVisible, setDisplayComponent} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [error, setError] = useState("");

    const auth = getAuth();

    function signUp() {
        if (email === "" || password == "") {
            setError("Please enter email and password.");
            return;
        }else if(password !== secondPassword){
            setError("Passwords don't match");
            return;
        }else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    AsyncStorage.setItem('userid', user.uid);

                    setIsVisible(false)
                })
                .catch((error) => {
                    setError(error.code);
                    if (error.code === 'auth/invalid-email') {
                        setError("The email address is invalid")
                    } else if (error.code === 'auth/weak-password') {
                        setError("Please enter a stronger password")
                    } else if (error.code === 'auth/email-already-in-use') {
                        setError("Email address already in use")
                    }
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Registration</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                onChangeText={setSecondPassword}
                value={secondPassword}
                placeholder="Repeat Password"
                secureTextEntry
            />
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: "10%"}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#f0f0f0'}} />
                <View>
                    <Text style={{width: 50, textAlign: 'center', fontWeight: "bold", color:"black"}}>Oder</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#f0f0f0'}} />
            </View>

            <View style={styles.registration}>
                <Text>Besitzt du bereits ein Konto?</Text>
                <TouchableOpacity style={styles.registrationButton} onPress={()=> setDisplayComponent("signin")}>
                    <Text style={styles.registrationButtonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 40
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    registration:{
        paddingTop: "5%"
    },
    registrationButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    registrationButtonText: {
        color: "#1E90FF",

    },
    title: {
        fontSize: 30
    },
    subtitle: {
        fontSize: 20
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
