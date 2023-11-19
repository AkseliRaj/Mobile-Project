import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants'
import DropdownList from './DropdownList'
import ConvertButton from './ConvertButton'
import ConversionResult from './ConversionResult'

const API_KEY = "coinrankinga78ffc470da1eaa3a13416d29252860514b44d60ef10b10e"
const BASE_URL = "https://api.coinranking.com/v2"


const CurrencyConverter = () => {
    const [cryptoInput, setCryptoInput] = useState("BTC")
    const [currencyInput, setCurrencyInput] = useState("USD")
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)
    const [isConverted, setIsConverted] = useState(false)
    const [isSwapped, setIsSwapped] = useState(false)
    const [cryptos, setCryptos] = useState([])
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        createCurrencyItems()
        createCryptoItems()
    }, [])

    const findUuidByTitle = (array, nameToFind) => {
        const foundObject = array.find(obj => obj.title === nameToFind)
        return foundObject ? foundObject.uuid : null
    }

    const convertCurrency = async () => {
        
        try {
            const currencyId = findUuidByTitle(currencies, currencyInput)
            const cryptoId = findUuidByTitle(cryptos, cryptoInput)

            const convertingParameters = isSwapped
                ? `${currencyId}?referenceCurrencyUuid=${cryptoId}`
                : `${cryptoId}?referenceCurrencyUuid=${currencyId}`

            const response = await axios.get(`${BASE_URL}/coin/${convertingParameters}`, {
                headers: {
                    'Accept': 'text/plain',
                    'X-CoinAPI-Key': API_KEY,
                },
            })

            const rate = response.data.data.coin.price
            const calculus = amount * Number(rate)
            console.log(typeof(calculus))
            setResult(calculus.toFixed(6))
            setIsConverted(true)
        } catch (error) {
            console.log(error)
        }
    }

    const createCurrencyItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/reference-currencies`, {
                headers: {
                    'Accept': 'text/plain',
                    'x-access-token': API_KEY,
                },
            })

            const currencyData = response.data.data.currencies

            const filteredData = currencyData.map(currency => ({
                uuid: currency.uuid,
                symbol: currency.symbol,
                iconUrl: currency.iconUrl,
            }));

            const currencyObjects = filteredData.map(currency => ({
                title: currency.symbol,
                image: currency.iconUrl,
                uuid: currency.uuid,
            }));

            setCurrencies(currencyObjects)
        } catch (error) {
            console.log(error)
        }
    };

    const createCryptoItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/coins?limit=20`, {
                headers: {
                    'Accept': 'text/plain',
                    'x-access-token': API_KEY,
                },
            })

            const cryptoData = response.data.data.coins;

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
        } catch (error) {
            console.log(error)
        }
    };

    const swapTextInput = () => {
        setIsSwapped(!isSwapped)
    }

    return (
        <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
            <Text style={styles.header}>Currency Converter</Text>
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