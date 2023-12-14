import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ConvertButton from './ConvertButton'
import React from 'react'
import { DevSettings } from 'react-native'
import { errorLM } from '../style/styles'
import { errorDM } from '../style/stylesDM'
import { useContext } from 'react'
import DarkModeContext from './DarkModeContext'

const ErrorScreen = () => {

  const { darkModeSet } = useContext(DarkModeContext);
  const error = darkModeSet ? errorDM : errorLM;

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
