import {Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import LoginModal from "../login/LoginModal";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TripsList from "../Trips/TripsList";
import ExcursionList from "../Excursion/ExcursionList"
console.warn = () => {};

export default function TripList() {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('userid').then((value) => {
            if (value !== "") {
                setIsModalVisible(false)
            } else {
                setIsModalVisible(true)
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            {selectedTrip === "" ? (
                <TripsList setSelectedTrip={setSelectedTrip}></TripsList>
            ) : (
                <ExcursionList tripname={selectedTrip} setSelectedTrip={setSelectedTrip}></ExcursionList>
            )}
            <LoginModal isVisible={isModalVisible} setIsVisible={setIsModalVisible}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
