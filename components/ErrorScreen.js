import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ConvertButton from './ConvertButton'
import React from 'react'
import { DevSettings } from 'react-native'

const ErrorScreen = () => {
  return (
    <View style={styles.Errorcontainer}>
        <MaterialCommunityIcons name='alert-decagram' size={100} color={"#004CFF"}/>
        <Text style={styles.errorHeader}>Error</Text>
        <Text style={styles.errorMsg}>Something went wrong, please try again</Text>
        <ConvertButton
            text={"Reload Application"}
            callback={() => DevSettings.reload()}
        />
    </View>
  )
}

export default ErrorScreen

const styles = StyleSheet.create({
    Errorcontainer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    errorHeader: {
        fontSize: 30,
        fontWeight: "bold"
    },
    errorMsg: {
        fontSize: 16,
        width: 230,
        textAlign: "center"
    }
})