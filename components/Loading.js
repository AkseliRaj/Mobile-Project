import { Image, Text, View } from "react-native";
import logo from '../assets/LogoText.png'
import logoDM from '../assets/LogoTextNegative.png'
import { loadingLM } from '../style/styles'
import { loadingDM } from '../style/stylesDM'
import { useContext } from "react";
import DarkModeContext from "./DarkModeContext";

export default function Loading() {
    const { darkModeSet } = useContext(DarkModeContext);

    const loading = darkModeSet ? loadingDM : loadingLM;
    
    return (
        <View style={loading.container}>
            <Image
                style={loadingLM.logo}
                source={darkModeSet ? logoDM : logo}
            />
            <Text style={loading.text}>Loading...</Text>
        </View>
    )
}