import { Image, Text, View } from "react-native";
import logo from '../assets/OnlyLogo.png'
import styles from '../style/styles'

export default function Home() {
    return (
        <View style={styles.containerLogo}>
            <Image
                style={styles.homeLogo}
                source={logo}
            />
            <Text>Welcome to Cryptex</Text>
            <Text>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
            <Text>Make planning for your next investment convenient with the intuitive currency converter.</Text>
            <Text>Your trading journey starts here.</Text>
            <Text>Stocks, with the biggest price:</Text>
        </View>
    )
}

