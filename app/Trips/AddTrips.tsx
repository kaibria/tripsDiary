import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Platform} from 'react-native';


interface TripsProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    trips: any[];
    setTrips: any;
}

const ProductModal = (props: TripsProps) => {
    const [newTripName, setNewTripName] = useState("");
    const [count, setCount] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);

    const handleAdd = () => {
        if (newTripName !== "") {
            const trip = {
                tripname: newTripName,
                location: "",
                status: false,
            };

            props.setModalVisible(false);

            try{
                props.setTrips([...props.trips, trip]);
            }catch (error){
                console.error(error);
            }
        } else {
            setErrorMessage("Bitte fühle alle Felder aus")
        }
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || selectedDate;
        setShow(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Produktname"
                        value={newProductName}
                        onChangeText={setNewProductName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Anzahl"
                        value={count}
                        onChangeText={setCount}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode={'date'}
                        display="default"
                        onChange={onChange}
                        style={styles.picker}
                    />
                    <Text style={styles.error}>{errormessage}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAdd}
                    >
                        <Text style={styles.textStyle}>Produkt hinzufügen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: '90%',
        maxHeight: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    error: {
        color: 'red'
    },
    picker: {
        marginBottom: 10,
    }
});

export default ProductModal;
