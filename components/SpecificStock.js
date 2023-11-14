import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../style/styles';

const SpecificStock = ({ navigation }) => {
  const navigateToStock = () => {
    navigation.navigate('StocksNavigator');
  };

  const navigateToCurrencyConverter = () => {
    navigation.navigate('CurrencyConverter');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateToStock}>
        <Text>Go back to Stock page</Text>
      </Pressable>
      <Text>Welcome to Currency Converter page</Text>
      <Pressable onPress={navigateToCurrencyConverter}>
        <Text>Go to Currency Converter page</Text>
      </Pressable>
    </View>
  );
};

export default SpecificStock;
