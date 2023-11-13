import { Image, Text, View } from "react-native";
import logo from '../assets/LogoText.png'
import styles from '../style/styles'

export default function Loading() {
    return (
    <View style={styles.container}>
        <Image 
            style={styles.logo}
            source={logo}
        />
        <Text>Loading...</Text>
    </View>
    )
}