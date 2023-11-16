import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ConvertButton = ({ callback }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={callback}
        >
            <Text style={styles.text}>Refresh converter</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "#004CFF",
        padding: 10,
        width: 150,
        borderRadius: 15,
        alignItems: "center"
    },
    text: {
        color: "#FFFFFF",
        fontSize: 15
    }
})

export default ConvertButton