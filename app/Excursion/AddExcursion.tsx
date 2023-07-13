import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {useEffect, useState} from "react";
import {Camera, CameraType} from 'expo-camera';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AddExcursion(){
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(true);
    const [camera, setCamera] = useState<Camera | null>();
    const [image, setImage] = useState<string>();
    const [type, setType] = useState(CameraType.back);
    const [imageSource, setImageSource] = useState("")

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(undefined)
            setImage(data.uri);
            console.log(data)
        }
    }

    if (!hasCameraPermission) {
        return <Text>No access to camera</Text>;
    }

    function takeAnother() {
        setImage(null);
    }

    return(
        <View>
            {image?
                <View>
                    <Image source={{uri: image}} style={styles.image}/>
                    <View style={styles.circleButtonContainer}>
                        <TouchableOpacity style={styles.circleButton} onPress={takeAnother}>
                            <FontAwesome name="rebel" size={38} color="#25292e" />
                        </TouchableOpacity>
                    </View>
                </View>:
                <Camera style={styles.camera} type={type}
                        ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>
                                <FontAwesome name="empire" size={38} color="#25292e" /></Text>
                        </TouchableOpacity>
                        <View style={styles.circleButtonContainer}>
                            <TouchableOpacity style={styles.circleButton} onPress={takePicture}>
                                <FontAwesome name="rebel" size={38} color="#25292e" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    camera: {
        height: '100%'
    },
    buttonContainer: {

        backgroundColor: 'transparent',
    },
    button: {
        position: "absolute",
        alignSelf: 'flex-end',
        alignItems: 'center',
        top: 630,
        left: '65%',
        backgroundColor: "white",
        borderRadius: 18,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    circleButtonContainer: {
        position: "absolute",
        width: 84,
        height: 84,
        borderWidth: 4,
        borderColor: '#ffd33d',
        borderRadius: 42,
        top: 589,
        left: '40%'
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#fff',
    },
    face: {
        position : "absolute",
        left: "40%",
        top: 300,
        fontWeight: "bold"
    },
    image: {
        height: '100%',
        width: '100%'
    },
});