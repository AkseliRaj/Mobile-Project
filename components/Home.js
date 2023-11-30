import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import logo from '../assets/OnlyLogo.png'
import { getCoins } from "../api/Functions";
import { useNavigation } from '@react-navigation/native';


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
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
            />

            <View style={styles.article}>
                <Text style={styles.header}>Welcome to Cryptex</Text>
                <Text style={styles.text}>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
                <Text style={styles.text}>Make planning for your next investment convenient with the intuitive currency converter.</Text>
                <Text style={styles.text}>Your trading journey starts <Text style={styles.bold}>here.</Text></Text>
            </View>


            <Text style={styles.subHeader}>Stocks, with the biggest <Text style={styles.bold}>price:</Text></Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        <Text style={styles.tableTittle}>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title onPress={priceFilter} numeric>
                        <Text style={styles.tableTittle}>Price</Text>
                        <AntDesign name="caretup" size={8} color="black" />
                        <AntDesign name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title onPress={changeFilter} numeric>
                        <Text style={styles.tableTittle}>Change</Text>
                        <AntDesign name="caretup" size={8} color="black" />
                        <AntDesign name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {items.slice(0, 3).map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>
                            <View style={styles.tableRow}>
                                <ExpoImage
                                    style={styles.tableIcon}
                                    source={{ uri: item.iconUrl }}
                                    contentFit="contain"
                                />
                                <View>
                                    <Text style={styles.tableText}>{item.name}</Text>
                                    <Text style={styles.tableTextColor}>{item.symbol}</Text>
                                </View>
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={styles.tableText}>${parseFloat(item.price).toFixed(2)}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={styles.tableText}>{item.change}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.tableButtonCell}>
                            <Pressable style={styles.tableButton} onPress={() => navigation.navigate('Specific coin', { uuid: item.uuid })}>
                                <Text style={styles.tableButtonText}>Open</Text>
                            </Pressable>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    logo: {
        height: 120,
        width: 127,
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },

    article: {
        gap: 12,
        marginLeft: 14,
        marginRight: 30,
        marginBottom: 20
    },

    header: {
        fontSize: 20,
        fontWeight: "bold"
    },

    text: {
        fontSize: 13
    },

    bold: {
        fontWeight: "bold"
    },

    subHeader: {
        fontSize: 16,
        marginLeft: 14,
        marginBottom: 10
    },

    tableTittle: {
        color: "black"
    },

    tableRow: {
        flexDirection: "row",
        alignItems: "center"
    },

    tableIcon: {
        width: 24,
        height: 24,
        marginRight: 8
    },

    tableText: {
        fontSize: 11,
    },

    tableTextColor: {
        fontSize: 11,
        color: "#B3B3B3" 
    },

    tableButtonCell: {
        justifyContent: "center" 
    },

    tableButton: {
        backgroundColor: '#004CFF', 
        padding: 3, 
        borderRadius: 20
    },

    tableButtonText: {
        fontSize: 11, 
        width: 40, 
        height: 17, 
        textAlign: "center", 
        color: "white"
    }

})