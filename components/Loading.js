import { Image, Text, View } from "react-native";
import logo from '../assets/LogoText.png'
import { loadingLM } from '../style/styles'
import { loadingDM } from '../style/stylesDM'

export default function Loading() {

    const loading = loadingDM
    
    return (
        <View style={loading.container}>
            <Image
                style={loading.logo}
                source={logo}
            />
            <Text style={loading.text}>Loading...</Text>
        </View>
    )
}