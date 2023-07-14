import {SafeAreaView} from "react-native";
import AddExcursion from "../Excursion/AddExcursion";
console.warn = () => {};

export default function addExcursion(){
    return(
        <SafeAreaView>
        <AddExcursion/>
    </SafeAreaView>)
}