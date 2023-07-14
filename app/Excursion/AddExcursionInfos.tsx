import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard, TouchableWithoutFeedback, Pressable
} from "react-native";
import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat";
import SelectDropdown from 'react-native-select-dropdown'


export default function AddExcursionInfos( {imageUri, setWriteImageInfos}: {imageUri: string, setWriteImageInfos: (val: boolean) => void} ) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState({longitude: 200, latitude: 0})
    const [currentDate, setCurrentDate] = useState<Date | null>()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [trips, setTrips] = useState([])
    const [userid, setUserid] = useState<string>("")
    const [choosenTrip, setChoosenTrip] = useState([])

    function save(){
        if (title!=="" && choosenTrip[0] !== null && choosenTrip[0].tripname !== null && location.longitude !== 200){
        let excursion = {excursionname: title,descritpion: description, location: location,date: currentDate?.toDateString(), img: imageUri}

        // Holen Sie die Benutzer-ID wie zuvor
        AsyncStorage.getItem('userid').then((userId: string | null) => {
            if (userId) {
                // Finden Sie den spezifischen Trip unter den Trips des Benutzers
                const tripRef = firebase.database().ref(`users/${userId}/trips`).orderByChild('tripname').equalTo(choosenTrip[0].tripname);

                tripRef.once('value', (snapshot:any) => {
                    const data = snapshot.val();

                    // Wenn die Reise existiert
                    if (data) {
                        // Holen Sie sich den Schlüssel (ID) der Reise
                        const tripId = Object.keys(data)[0];

                        // Hinzufügen der Ausflüge zur Reise
                        firebase.database().ref(`users/${userId}/trips/${tripId}/excursions`).push(excursion);

                        let date = new Date();

                        AsyncStorage.setItem('updateMap', date.getSeconds().toString() + date.getMinutes().toString() + date.getHours().toString() + date.getDay().toString()).then();
                    }
                });
            }
        });
        cancel();
        }
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
            setLocation({longitude: geoLocation.coords.longitude,latitude: geoLocation.coords.latitude});
            console.log(geoLocation.coords);

        })();
    }

    function setTripsFromDb(){
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
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    buttonStyle={{backgroundColor: "transparent"}}
                    dropdownStyle={{borderRadius: 18}}
                    rowStyle={{borderRadius: 18}}
                    rowTextStyle={{color: "#1E90FF"}}
                />

                {location.longitude !== 200?
                    <TouchableOpacity style={styles.button} onPress={save} >
                        <Text>Save</Text>
                    </TouchableOpacity> :
                    <Pressable style={styles.button} disabled={true}>
                        <Text>Wait...</Text>
                    </Pressable>
                }


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