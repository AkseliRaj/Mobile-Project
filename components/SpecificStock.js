import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import styles from '../style/styles';
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from 'react';
import { getCoinDetails } from '../api/Functions';
import Loading from './Loading';

// Hard coded uuid for testing purposes
const UUID = 'Qwsogvtv82FCd'

const SpecificStock = ({ navigation }) => {

  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigateToCurrencyConverter = () => {
    navigation.navigate('CurrencyConverter');
  };

// Getting data from the API

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const result = await getCoinDetails(UUID);
      setCoin(result);
      setIsLoading(false);
    };

    fetchCoinDetails();
  }, [UUID]);

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <View style={styles.container}>
      
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 40} // from react-native
        height={250}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 76, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(109, 109, 109, ${opacity})`,
          style: {
            borderRadius: 10
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#004CFF"
          }
        }}
        
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View>
        <Text>{coin.name}</Text>
      </View>
      <View>
        <View>
          <Text>Price</Text>
          <Text>{parseFloat(coin.price).toFixed(2)} $</Text>
        </View>
        <View>
          <Text>Volume 24h</Text>
          <Text>{coin['24hVolume']} $</Text>
        </View>
        <View>
          <Text>Circulating supply</Text>
          <Text>{coin.supply.circulating} BTC</Text>
        </View>
        <View>
          <Text>Market Cap</Text>
          <Text>{coin.marketCap} $</Text>
        </View>
      </View>

      <Pressable onPress={navigateToCurrencyConverter}>
        <Text>Go to Currency Converter page</Text>
      </Pressable>
    </View>
  );
};

export default SpecificStock;
