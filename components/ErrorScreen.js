import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ConvertButton from './ConvertButton'
import React from 'react'
import { DevSettings } from 'react-native'
import { error } from '../style/styles'

const ErrorScreen = () => {
  return (
    <View style={error.Errorcontainer}>
        <MaterialCommunityIcons name='alert-decagram' size={100} color={"#004CFF"}/>
        <Text style={error.errorHeader}>Error</Text>
        <Text style={error.errorMsg}>Something went wrong, please try again</Text>
        <ConvertButton
            text={"Reload Application"}
            callback={() => DevSettings.reload()}
        />
    </View>
  )
}

export default ErrorScreen
