import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { converter } from '../style/styles'

const ConvertButton = ({ callback,text }) => {
    return (
        <TouchableOpacity
            style={converter.button}
            onPress={callback}
        >
            <Text style={converter.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ConvertButton