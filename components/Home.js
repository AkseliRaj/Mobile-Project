import { Image, Pressable, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import logo from '../assets/OnlyLogo.png'
import styles from '../style/styles'
import { getCoins } from "../api/Functions";


export default function Home() {

    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchCoins = async () => {
            const result = await getCoins();
            setItems(result);
        };

        fetchCoins();
    }, []);

    // const options = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'x-access-token': 'your-access-token-here',
    //     },
    // };

    // fetch('https://api.coinranking.com/v2/coin/Qwsogvtv82FCd', options)
    //     .then((response) => response.json())
    //     .then((result) => setItems([result.data.coin]));

    const [filter, setFilter] = useState(true);

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
            <Text>Welcome to Cryptex</Text>
            <Text>Stay up-to-date with the latest market trends and explore a wide range of currencies.</Text>
            <Text>Make planning for your next investment convenient with the intuitive currency converter.</Text>
            <Text>Your trading journey starts here.</Text>
            <Text>Stocks, with the biggest price:</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Price
                        <AntDesign onPress={priceFilter} name="caretup" size={8} color="black" />
                        <AntDesign onPress={priceFilter} name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title numeric>Change
                        <AntDesign onPress={changeFilter} name="caretup" size={8} color="black" />
                        <AntDesign onPress={changeFilter} name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {items.slice(0, 3).map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.name} {item.symbol}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.change}</DataTable.Cell>
                        <DataTable.Cell style={{ justifyContent: "center" }}>
                            <Pressable>
                                <Text>Open</Text>
                            </Pressable>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}


            </DataTable>

        </View>
    )

}
