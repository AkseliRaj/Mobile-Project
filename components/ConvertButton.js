import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { converter } from "../style/styles"

const ConvertButton = ({ callback,text }) => {
    return (
        <TouchableOpacity
            style={converter.button}
            onPress={callback}
        >
            <Text style={converter.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}


export default ConvertButton