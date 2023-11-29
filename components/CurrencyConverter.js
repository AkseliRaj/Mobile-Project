import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'
import DropdownList from './DropdownList'
import ConvertButton from './ConvertButton'
import ConversionResult from './ConversionResult'
import { getCoins, getFiatCurrencies, getCoinDetails } from '../api/Functions'

const CurrencyConverter = ({ route }) => {
    const [cryptoInput, setCryptoInput] = useState("BTC")
    const [currencyInput, setCurrencyInput] = useState("USD")
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)
    const [isConverted, setIsConverted] = useState(false)
    const [isSwapped, setIsSwapped] = useState(false)
    const [cryptos, setCryptos] = useState([])
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        setAmount(1)
        createCurrencyItems()
        createCryptoItems()
    }, [])

    useEffect(() => {
        if (route?.params) {
            const coin = route?.params
            setCryptoInput(coin.symbol)
            setCryptos([...cryptos, {
                title: coin.symbol,
                image: coin.iconUrl,
                uuid: coin.uuid
            }])
        }
    }, [route?.params])


    const findUuidByTitle = (array, nameToFind) => {
        const foundObject = array.find(obj => obj.title === nameToFind)
        return foundObject ? foundObject.uuid : null
    }

    const convertCurrency = async () => {
        const cryptoId = findUuidByTitle(cryptos, cryptoInput)
        const currencyId = findUuidByTitle(currencies, currencyInput)

        const convertingParameters = isSwapped
            ? `${currencyId}?referenceCurrencyUuid=${cryptoId}`
            : `${cryptoId}?referenceCurrencyUuid=${currencyId}`

        const response = await getCoinDetails(convertingParameters)

        const calculus = amount * Number(response.price)
        setResult(calculus.toFixed(6))
        setIsConverted(true)
    }

    const createCurrencyItems = async () => {
        const currencyData = await getFiatCurrencies()

        const filteredData = currencyData.map(currency => ({
            uuid: currency.uuid,
            symbol: currency.symbol,
            iconUrl: currency.iconUrl,
        }));

        const currencyObjects = filteredData.map(currency => ({
            title: currency.symbol,
            image: currency.iconUrl,
            uuid: currency.uuid,
        }))
        setCurrencies(currencyObjects)

    }

    const createCryptoItems = async () => {
        const cryptoData = await getCoins()

        const filteredData = cryptoData.map(crypto => ({
            uuid: crypto.uuid,
            symbol: crypto.symbol,
            iconUrl: crypto.iconUrl,
        }))

        const cryptoObjects = filteredData.map(crypto => ({
            title: crypto.symbol,
            image: crypto.iconUrl,
            uuid: crypto.uuid,
        }))
        setCryptos(cryptoObjects)
    }

    const swapTextInput = () => {
        setIsSwapped(!isSwapped)
    }

    return (
        <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
            <Text style={styles.header}>Currency converter</Text>
            <Text style={styles.subHeader}>Convert {isSwapped ? currencyInput : cryptoInput} to {isSwapped ? cryptoInput : currencyInput}</Text>
            <View style={styles.converterContainer}>
                <DropdownList
                    currencyItems={isSwapped ? currencies : cryptos}
                    setCurrency={isSwapped ? setCurrencyInput : setCryptoInput}
                    placeholderValue={amount}
                    setAmount={setAmount}
                    currentItem={isSwapped ? currencyInput : cryptoInput}
                    setIsConverted={setIsConverted}
                />
                <TouchableOpacity
                    style={styles.swapButton}
                    onPress={swapTextInput}>
                    <Ionicons name="md-swap-vertical" size={24} color="black" />
                </TouchableOpacity>
                <DropdownList
                    currencyItems={isSwapped ? cryptos : currencies}
                    setCurrency={isSwapped ? setCryptoInput : setCurrencyInput}
                    placeholderValue={result}
                    currentItem={isSwapped ? cryptoInput : currencyInput}
                    setIsConverted={setIsConverted}
                />
                <ConversionResult
                    isSwapped={isSwapped}
                    isConverted={isConverted}
                    amount={amount}
                    crypto={cryptoInput}
                    currency={currencyInput}
                    result={result}
                />
                <ConvertButton
                    callback={convertCurrency}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    header: {
        fontSize: 25,
        paddingTop: 20,
        fontWeight: "bold"
    },
    subHeader: {
        marginTop: 10,
        fontSize: 15
    },
    converterContainer: {
        marginTop: 20,
        width: "100%",
        height: 400,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 20
    },
    cryptoInput: {
        borderColor: "black",
        borderColor: "#7393B3",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        height: 45,
        marginVertical: 30,
        paddingHorizontal: 20
    },
    list: {
        borderColor: "#7393B3",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        width: 300,
        marginBottom: 20
    },
    swapButton: {
        margin: 15
    }
})
export default CurrencyConverter