import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const ConversionResult = ({ isSwapped, isConverted, amount, crypto, currency, result }) => {
    const [flexDirection, setFlexDirection] = useState("row")


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
            <View style={[styles.resultContainer, {flexDirection: flexDirection}]}>
                {isSwapped
                    ? <Text style={{ fontSize: 18 }}>{amount} {currency}</Text>
                    : <Text style={{ fontSize: 18 }}>{amount} {crypto}</Text>
                }
                <Text style={{ fontSize: 18 }}>=</Text>
                <Text style={{ fontSize: 18 }}>{result}</Text>
                <Text style={{ fontSize: 18 }}>{isSwapped? crypto : currency}</Text>
            </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        marginTop: 20,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 300
    }
})

export default ConversionResult