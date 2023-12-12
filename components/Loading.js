import { Image, Text, View } from "react-native";
import logo from '../assets/LogoText.png'
import { loading } from '../style/styles'

export default function Loading() {
    return (
        <View style={loading.container}>
            <Image
                style={loading.logo}
                source={logo}
            />
            <Text>Loading...</Text>
        </View>
    )
}