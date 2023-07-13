import {Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import LoginModal from "../login/LoginModal";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [userid, setUserid] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('userid').then((value) => {
            if (value !== null) {
                setUserid(value);
                setIsModalVisible(false)
            } else {
                setIsModalVisible(true)
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <EditScreenInfo path="app/(tabs)/index.tsx"/>
            <Pressable onPress={()=> setIsModalVisible(true)}><Text>Login</Text></Pressable>
            <LoginModal isVisible={isModalVisible} setIsVisible={setIsModalVisible}/>
        </View>
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
});
