import { Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import DropdownList from './DropdownList'
import ConvertButton from './ConvertButton'
import ConversionResult from './ConversionResult'
import { getCoins, getFiatCurrencies, getCoinDetails } from '../api/Functions'
import ErrorScreen from "./ErrorScreen"

import { converter } from '../style/styles'
import { converterDM } from '../style/stylesDM'

import { useContext } from 'react'
import DarkModeContext from './DarkModeContext'

const Converter = ({ route }) => {
    const [cryptoInput, setCryptoInput] = useState("BTC")
    const [currencyInput, setCurrencyInput] = useState("USD")
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)
    const [isConverted, setIsConverted] = useState(false)
    const [isSwapped, setIsSwapped] = useState(false)
    const [cryptos, setCryptos] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [error, setError] = useState(false)

    const { darkModeSet } = useContext(DarkModeContext)
    const data = darkModeSet ? converterDM : converter

    useEffect(() => {
        setAmount(1)
        createCurrencyItems()
        createCryptoItems()
    }, [])

    useEffect(() => {
        if (route?.params) {
            const coin = route?.params
            const hasCoin = cryptos.some(crypto => crypto.title === coin.symbol)

            if (hasCoin === false) {
                setCryptos([...cryptos, {
                    title: coin.symbol,
                    image: coin.iconUrl,
                    uuid: coin.uuid
                }])
            }
            setCryptoInput(coin.symbol)
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
        
        if(response === "error") {
            setError(true)
            return 0
        }

        const calculus = amount * Number(response.price)

        setResult(calculus.toFixed(6))
        setIsConverted(true)


    }

    const createCurrencyItems = async () => {
        const currencyData = await getFiatCurrencies()


        if(currencyData === "error") {
            setError(true)
            return 0
        }
    
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

        if(cryptoData === "error") {
            setError(true)
            return 0
        }

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

    if (!error) {
        return (
            <View style={[data.container, { paddingTop: Constants.statusBarHeight }]}>
                <Text style={[data.header, {color: data !== converterDM ? "black" : "white"}]}>Conversion calculator</Text>
                <Text style={[data.subHeader, {color: data !== converterDM ? "black" : "white"}]}>Convert {isSwapped ? currencyInput : cryptoInput} to {isSwapped ? cryptoInput : currencyInput}</Text>
                <View style={data.converterContainer}>
                    <DropdownList
                        currencyItems={isSwapped ? currencies : cryptos}
                        setCurrency={isSwapped ? setCurrencyInput : setCryptoInput}
                        placeholderValue={amount}
                        setAmount={setAmount}
                        currentItem={isSwapped ? currencyInput : cryptoInput}
                        setIsConverted={setIsConverted}
                    />
                    <TouchableOpacity
                        style={converter.swapButton}
                        onPress={swapTextInput}>
                        <Ionicons name="md-swap-vertical" size={24} color={data !== converterDM ? "black" : "white"} />
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
                        text={"Refresh Converter"}
                    />
                </View>
            </View>
        )
    }
    else {
        return (
            <ErrorScreen />
        )
    }
}

export default Converter