import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import logo from '../assets/OnlyLogo.png';
import { getCoins } from "../api/Functions";
import { data } from '../style/styles'


export default function Home({ navigation }) {


    const [items, setItems] = useState([])
    const [filter, setFilter] = useState(true)

    useEffect(() => {
        const fetchCoins = async () => {
            const result = await getCoins();
            setItems(result);
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

    return (
        <ScrollView style={data.container}>
            <Image
                style={data.logo}
                source={logo}
            />

            <View style={data.article}>
                <Text style={data.header}>Welcome to Cryptex</Text>
                <Text style={data.text}>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
                <Text style={data.text}>Make planning for your next investment convenient with the intuitive currency converter.</Text>
                <Text style={data.text}>Your gateway to market insights begins <Text style={data.bold}>here.</Text></Text>
            </View>


            <Text style={data.subHeader}>Stocks, with the biggest <Text style={data.bold}>price:</Text></Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        <Text style={data.tableTittle}>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title onPress={priceFilter} numeric>
                                    <View style={data.tableTittleRow}>
                                        <Text style={data.tableTittle}>Price</Text>
                                        <View style={data.tableTittleSpace}>
                                            <FontAwesome name="sort" size={12} color="black" />
                                        </View>
                                    </View>
                                </DataTable.Title>
                                <DataTable.Title onPress={changeFilter} numeric>
                                    <View style={data.tableTittleRow}>
                                        <Text style={data.tableTittle}>Change</Text>
                                        <View style={data.tableTittleSpace}>
                                            <FontAwesome name="sort" size={12} color="black" />
                                        </View>
                                    </View>
                                </DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {items.slice(0, 3).map((item, index) => (
                    <DataTable.Row key={index}>
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
                            <Pressable style={data.tableButton} onPress={() => navigation.navigate('Specific coin', { uuid: item.uuid })}>
                                <Text style={data.tableButtonText}>Open</Text>
                            </Pressable>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
        </ScrollView>
    )
}

