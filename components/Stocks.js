
import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import styles from '../style/styles'

const Stocks = ({ navigation }) => {

    const navigateToSpecificStock = () => {
        navigation.navigate('SpecificStock');
      };
      
  return (
    <View style={styles.container}>
      <Text>This is the Stocks page</Text>
      <Pressable onPress={navigateToSpecificStock}>
        <Text>Go to Specific Stock</Text>
      </Pressable>
    </View>
  );
};

export default Stocks;
