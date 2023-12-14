import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { converter } from '../style/styles'
import { converterDM } from '../style/stylesDM'

const ConversionResult = ({ isSwapped, isConverted, amount, crypto, currency, result }) => {
    const [flexDirection, setFlexDirection] = useState("row")

    const data = converterDM
    
    // Changing the direction of flex from row to column if the amount of digits are over 20
    
    useEffect(() => {

        const amountOfDigits = Math.abs(result).toString() + Math.abs(amount).toString()
        setFlexDirection(
            amountOfDigits.length > 20
                ? "column"
                : "row"
        )
    }, [result])
    
    return (
        <>{isConverted &&
            <View style={[data.resultContainer, {flexDirection: flexDirection}]}>
                {isSwapped
                    ? <Text style={data.resultText}>{amount} {currency}</Text>
                    : <Text style={data.resultText}>{amount} {crypto}</Text>
                }
                <Text style={data.resultText}>=</Text>
                <Text style={data.resultText}>{result}</Text>
                <Text style={data.resultText}>{isSwapped? crypto : currency}</Text>
            </View>
        }
        </>
    )
}

export default ConversionResult