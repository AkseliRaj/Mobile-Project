import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import logo from '../assets/OnlyLogo.png';
import { getCoins } from "../api/Functions";
import { dataLM } from '../style/styles'
import { dataDM } from '../style/stylesDM'
import ErrorScreen from "./ErrorScreen";
import DarkModeSwitch from "./DarkModeSwitch";
import DarkModeContext from "./DarkModeContext";
import { useContext } from "react";


export default function Home({ navigation }) {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState(true)
    const [error, setError] = useState(false)

    const { darkModeSet } = useContext(DarkModeContext);

    const data = darkModeSet ? dataDM : dataLM;

    useEffect(() => {
        const fetchCoins = async () => {
            const result = await getCoins();

            if (result === "error") {
                setError(true)
                return 0
            }
            setItems(result)
        };

        fetchCoins();

    }, []);

    function priceFilter() {
        let lowerPrice = [...items].sort((a, b) => b.price - a.price);
        let higherPrice = [...items].sort((a, b) => a.price - b.price);
        let price = filter ? lowerPrice : higherPrice;
        setFilter((prevFilter) => !prevFilter);
        setItems(price);
    }

    function changeFilter() {
        let lowerChange = [...items].sort((a, b) => b.change - a.change);
        let higherChange = [...items].sort((a, b) => a.change - b.change);
        let change = filter ? lowerChange : higherChange;
        setFilter((prevFilter) => !prevFilter);
        setItems(change);
    }

    function rankFilter() {
        let lowerRank = [...items].sort((a, b) => b.rank - a.rank);
        let higherRank = [...items].sort((a, b) => a.rank - b.rank);
        let rank = filter ? lowerRank : higherRank;
        setFilter((prevFilter) => !prevFilter);
        setItems(rank);
    }

    if (!error) {
        return (
            <ScrollView style={data.container}>
                <Image
                    style={data.logo}
                    source={logo}
                />
                <DarkModeSwitch />
                <View style={data.article}>
                    <Text style={data.header}>Welcome to Cryptex</Text>
                    <Text style={data.text}>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
                    <Text style={data.text}>Make planning for your next investment convenient with the intuitive currency converter.</Text>
                    <Text style={data.text}>Your gateway to market insights begins <Text style={data.bold}>here.</Text></Text>
                </View>


                <Text style={data.subHeader}>Stocks, with the biggest <Text style={data.bold}>price:</Text></Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title onPress={rankFilter}>
                            <View style={data.tableTittleRow}>
                                <Text style={data.tableTittle}>Name</Text>
                                <View style={data.tableTittleSpace}>
                                    <FontAwesome name="sort" size={12} color={data !== dataDM ? "black" : "white"} />
                                </View>
                            </View>
                        </DataTable.Title>
                        <DataTable.Title onPress={priceFilter} numeric>
                            <View style={data.tableTittleRow}>
                                <Text style={data.tableTittle}>Price</Text>
                                <View style={data.tableTittleSpace}>
                                    <FontAwesome name="sort" size={12} color={data !== dataDM ? "black" : "white"} />
                                </View>
                            </View>
                        </DataTable.Title>
                        <DataTable.Title onPress={changeFilter} numeric>
                            <View style={data.tableTittleRow}>
                                <Text style={data.tableTittle}>Change</Text>
                                <View style={data.tableTittleSpace}>
                                    <FontAwesome name="sort" size={12} color={data !== dataDM ? "black" : "white"} />
                                </View>
                            </View>
                        </DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>

                    {items.slice(0, 3).map((item, index) => (
                        <Pressable onPress={() => navigation.navigate('Coin', { uuid: item.uuid })} key={index}>
                            <DataTable.Row>
                                <DataTable.Cell>
                                    <View style={data.tableRow}>
                                        <ExpoImage
                                            style={data.tableIcon}
                                            source={{ uri: item.iconUrl }}
                                            contentFit="contain"
                                        />
                                        <View>
                                            <Text style={data.tableText}>{item.name}</Text>
                                            <Text style={data.tableTextColor}>{item.symbol}</Text>
                                        </View>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={data.tableText}>${parseFloat(item.price).toFixed(2)}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={data.tableText}>{item.change}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={data.tableButtonCell}>
                                    <Pressable style={data.tableButton} onPress={() => navigation.navigate('Coin', { uuid: item.uuid })}>
                                        <Text style={data.tableButtonText}>Open</Text>
                                    </Pressable>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </Pressable>
                    ))}

                </DataTable>
            </ScrollView>
        )
    }
    else {
        return (
            <ErrorScreen />
        )
    }
}

