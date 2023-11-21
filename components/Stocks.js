
import React from 'react';
import { View, Text, Button, Pressable, Image, StyleSheet, ScrollView } from 'react-native';

import { getCoins } from "../api/Functions";
import { DataTable } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';


const Stocks = ({ navigation }) => {

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

    // const navigateToSpecificStock = () => {
    //     navigation.navigate('SpecificStock');
    //   };
      
  return (
    // <View style={styles.container}>
    //   <Text>This is the Stocks page</Text>
    //   <Pressable onPress={navigateToSpecificStock}>
    //     <Text>Go to Specific Stock</Text>
    //   </Pressable>
    // </View>
    <ScrollView>
    <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        <Text style={styles.tableTittle}>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={styles.tableTittle}>Price</Text>
                        <AntDesign onPress={priceFilter} name="caretup" size={8} color="black" />
                        <AntDesign onPress={priceFilter} name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={styles.tableTittle}>Change</Text>
                        <AntDesign onPress={changeFilter} name="caretup" size={8} color="black" />
                        <AntDesign onPress={changeFilter} name="caretdown" size={8} color="black" />
                    </DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {items.map((item, index) => (
                    <DataTable.Row onPress={() => console.log(item)} key={index}>
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
                            <Pressable style={styles.tableButton} onPress={() => navigation.navigate('SpecificStock', { uuid: item.uuid })}>
                                <Text style={styles.tableButtonText}>Open</Text>
                            </Pressable>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
      </ScrollView>
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
  }

})

export default Stocks;


