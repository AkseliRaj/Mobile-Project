
import React from 'react';
import { View, Text, Button, Pressable, Image, StyleSheet, ScrollView, TextInput, Keyboard } from 'react-native';
import { getCoins, searchCoin } from "../api/Functions";
import { DataTable } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';


const Coins = ({ navigation }) => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState(true)
    const [search, setSearch] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [searching, setSearching] = useState(false)

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



      
  return (
    <View>
        <View style={styles.searchBar}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search coins..."
                value={search}
                onChangeText={(text) => (searchCoins(text),setSearch(text))}
            />
            {!searching ? <AntDesign onPress={() => searchCoins()} name="search1" size={20} color="black" style={styles.searchButton}/> : <AntDesign onPress={() => clearSearch()} name="close" size={20} color="black" style={styles.searchButton}/> }
        </View>
        <ScrollView>
            <DataTable>
                {!searching && (
                    <>
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
                    </>
                )}
                    
                    {!searching ? items.map((item, index) => (
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
                    ))
                    :
                    searchItems.map((item, index) => (
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
                    ))
                    }

                </DataTable>
        </ScrollView>
      </View>
  );
};

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
  },

    searchBar: {
        backgroundColor: '#E7E7E7',
        height: 40,
        borderRadius: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    searchInput: {
        fontSize: 15,
        color: '#000',
        width: '85%',
        height: '100%',
        marginLeft: 10
    },

    searchButton: {
        marginRight: 10,
    }

})

export default Coins;


