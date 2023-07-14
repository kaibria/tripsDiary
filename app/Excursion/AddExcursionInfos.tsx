import {
    Image,
    Pressable,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard, TouchableWithoutFeedback
} from "react-native";
import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import SelectDropdown from 'react-native-select-dropdown'


export default function AddExcursionInfos( {imageUri, setWriteImageInfos}: {imageUri: string, setWriteImageInfos: (val: boolean) => void} ) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState({longitude: 1, latitude: 1})
    const [currentDate, setCurrentDate] = useState<Date | null>()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [trips, setTrips] = useState([])
    const [userid, setUserid] = useState<string>("")
    const [choosenTrip, setChoosenTrip] = useState([])
    const [excursion, setExcursion] = useState({excursionname:"",descritpion:"",location:{longitude:1,latitude:1}, date: currentDate})

    function save(){
        setExcursion({excursionname: title,descritpion: description, location: location,date: currentDate})
    }

    function cancel(){
        setWriteImageInfos(false)
    }

    function getLocation(){
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let geoLocation = await Location.getCurrentPositionAsync({});
            setLocation(geoLocation.coords);

        })();
    }

    function setTripsFromDb(){
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userid');
                if (userId !== null) {
                    setUserid(userId);
                    const snapshot = await firebase.database().ref(`users/4tqlrVk73CMYZPOnD3XNUftQBk33/trips`).once('value');

                    const tripsData:any = [];
                    snapshot.forEach((childSnapshot) => {
                        var trip = childSnapshot.val();
                        trip.key = childSnapshot.key;
                        tripsData.push(trip);
                    });

                    setTrips(tripsData.filter((trip:any) => {return trip.status== false}));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }

    function getTripFromTripName(e:any){
        setChoosenTrip(trips.filter((trip:any) => {return trip.tripname === e}))
    }

    useEffect(() => {
        setCurrentDate(new Date());

        getLocation();

        setTripsFromDb();

        console.log("tripper",trips);


    }, []);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={{uri: imageUri}} style={styles.image}/>


            <View style={styles.fields}>
                <Text>{currentDate?.toDateString()}</Text>
            <TextInput onChangeText={(e) => setTitle(e)} placeholder={"Titel"} style={styles.input}></TextInput>
            <TextInput onChangeText={(e) => setDescription(e)} placeholder={"Beschreibung (Optional)"} multiline={true} style={[styles.input, {height: "30%"}]}></TextInput>

                <SelectDropdown
                    defaultButtonText={"Wähle deine Reise"}
                    data={trips.map((trip:any)=> trip.tripname)}
                    onSelect={(selectedItem, index) =>getTripFromTripName(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    buttonStyle={{backgroundColor: "transparent"}}
                    dropdownStyle={{borderRadius: 18}}
                    rowStyle={{borderRadius: 18}}
                    rowTextStyle={{color: "#1E90FF"}}
                />

            <TouchableOpacity style={styles.button} onPress={save}>
                <Text>Safe</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> cancel()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    content: {

    },
    scrollContentContainer: {
        flexGrow: 1,
    },
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    fields: {
        paddingTop: 40
    },
    input: {
        height: 40,
        maxWidth: 200,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    image: {
        height: '40%',
        width: '110%',
        left: -1
    },
    button: {
        textAlign: "center",
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10,
        marginBottom: 10
    },

    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: "#1E90FF",
    },
});