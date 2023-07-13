import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {Text, View} from "../../components/Themed";
import {Modal, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";

export default function LoginModal({isVisible, setIsVisible}) {
    const [displayComponent, setDisplayComponent] = useState('');

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.container}>
                {displayComponent === 'signin' && <SignIn setIsVisible={setIsVisible} setDisplayComponent={setDisplayComponent}/>}
                {displayComponent === 'signup' && <SignUp setIsVisible={setIsVisible} setDisplayComponent={setDisplayComponent}/>}
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
        </Modal>
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
    modalContent: {
        height: '100%',
        width: '90%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
});
