import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ConversionResult = ({ isSwapped, isConverted, amount, crypto, currency, result }) => {


    return (
        <>{isConverted &&
            <View style={styles.resultContainer}>
                {isSwapped
                    ? <Text style={{ fontSize: 18 }}>{amount} {currency}</Text>
                    : <Text style={{ fontSize: 18 }}>{amount} {crypto}</Text>
                }
                <Text style={{ fontSize: 18 }}>=</Text>
                <Text style={{ fontSize: 20 }}>{result}</Text>
                <Text style={{ fontSize: 18 }}>{isSwapped? crypto : currency}</Text>
            </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 300
    }
})

export default ConversionResult