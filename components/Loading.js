import { Image, Text, View } from "react-native";
import logo from '../assets/LogoText.png'
import { stylesLM } from '../style/styles'
import { stylesDM } from '../style/stylesDM'

export default function Loading() {

    const styles = stylesDM
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}