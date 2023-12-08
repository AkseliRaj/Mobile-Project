import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Keyboard } from 'react-native';
import { getCoins, searchCoin } from "../api/Functions";
import { DataTable } from "react-native-paper";
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useState, useEffect, useRef } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { useScrollToTop } from '@react-navigation/native';
import { data } from '../style/styles'


const Coins = ({ navigation }) => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState(true)
    const [search, setSearch] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [searching, setSearching] = useState(false)
    const ref = useRef(null);

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

    //functions for searching

    const searchCoins = async (searchQuery) => {
        const result = await searchCoin(searchQuery);
        setSearchItems(result);
        setSearching(true)
    }

    const clearSearch = () => {
        setSearch('')
        setSearching(false)
        Keyboard.dismiss()
    }

    useScrollToTop(ref);

    return (
        <View style={data.container}>
            <View style={data.searchBar}>
                <AntDesign name="search1" size={20} color="black" style={data.searchIcon} />
                <TextInput
                    style={data.searchInput}
                    placeholder="Search coins..."
                    keyboardType='default'
                    returnKeyType='search'
                    value={search}
                    onChangeText={(text) => (searchCoins(text), setSearch(text))}
                />
                {searching &&
                    <AntDesign onPress={() => clearSearch()} name="close" size={13} color="black" style={data.closeIcon} />
                }
            </View>
            <ScrollView ref={ref}>
                <DataTable>
                    {!searching && (
                        <>
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
                        </>
                    )}

                    {!searching ? items.map((item, index) => (
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
                    ))
                        :
                        searchItems.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>
                                    <View style={data.tableRow}>
                                        <ExpoImage
                                            style={data.tableIcon}
                                            source={{ uri: item.iconUrl }}
                                            contentFit="contain"
                                        />
                                        <View>
                                            <Text style={data.tableWrap}>{item.name}</Text>
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
                        ))
                    }

                </DataTable>
            </ScrollView>
        </View>
    );
};

export default Coins;


