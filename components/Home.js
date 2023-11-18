import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import logo from '../assets/OnlyLogo.png'
import styles from '../style/styles'
import { getCoins } from "../api/Functions";


export default function Home() {

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
        <View style={styles.containerLogo}>
            <Image
                style={styles.homeLogo}
                source={logo}
            />
            <View style={{ gap: 10 }}>
                <View style={{ gap: 10, marginLeft: 14, marginRight: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome to Cryptex</Text>
                    <Text style={{ fontSize: 13 }}>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
                    <Text style={{ fontSize: 13 }}>Make planning for your next investment convenient with the intuitive currency converter.</Text>
                    <Text style={{ fontSize: 13 }}>Your trading journey starts <Text style={{ fontWeight: "bold" }}>here.</Text></Text>
                </View>

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={{ color: "black" }}>Name</Text>
                        </DataTable.Title>
                        <DataTable.Title numeric>
                            <Text style={{ color: "black" }}>Price</Text>
                            <AntDesign onPress={priceFilter} name="caretup" size={8} color="black" />
                            <AntDesign onPress={priceFilter} name="caretdown" size={8} color="black" />
                        </DataTable.Title>
                        <DataTable.Title numeric>
                            <Text style={{ color: "black" }}>Change</Text>
                            <AntDesign onPress={changeFilter} name="caretup" size={8} color="black" />
                            <AntDesign onPress={changeFilter} name="caretdown" size={8} color="black" />
                        </DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>

                    <View>
                        {items.slice(0, 3).map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <ExpoImage
                                            style={{ width: 18, height: 18, marginRight: 8 }}
                                            source={{ uri: item.iconUrl }}
                                            contentFit="contain"
                                        />
                                        <View>
                                            <Text style={{ fontSize: 11 }}>{item.name}</Text>
                                            <Text style={{ fontSize: 11, color: "#B3B3B3" }}>{item.symbol}</Text>
                                        </View>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={{ fontSize: 11 }}>${parseFloat(item.price).toFixed(2)}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={{ fontSize: 11 }} >{item.change}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ justifyContent: "center" }}>
                                    <Pressable style={{ backgroundColor: '#004CFF', borderRadius: 20 }} onPress={() => console.log(item)}>
                                        <Text style={{ fontSize: 11, padding: 6, color: "white" }}>Open</Text>
                                    </Pressable>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </View>


                </DataTable>
            </View>
        </View>
    )

}
