import {SafeAreaView} from "react-native";
import Map from "../Map/Map";
console.warn = () => {};

export default function MapTab(){
    return(<SafeAreaView>
        <Map/>
    </SafeAreaView>)
}