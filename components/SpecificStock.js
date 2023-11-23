import React from 'react';
import { View, Text, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from 'react';
import { getCoinDetails } from '../api/Functions';
import Loading from './Loading';
import { ScrollView } from 'react-native-gesture-handler';

// Hard coded uuid for testing purposes
// const UUID = 'Qwsogvtv82FCd'

const SpecificStock = ({ navigation, route }) => {

  const { uuid } = route.params;

  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigateToCurrencyConverter = () => {
    navigation.navigate('CurrencyConverter',coin.symbol);
  };

  // Getting data from the API

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const result = await getCoinDetails(uuid);
      setCoin(result);
      setIsLoading(false);
    };

    fetchCoinDetails();
  }, [uuid]);

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
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
              borderRadius: 16,
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
      </View>
      <View style={styles.dataWholeContainer}>
        <View style={styles.coinNameHeadingContainer}>
          <ExpoImage
            style={styles.coinIcon}
            source={{ uri: coin.iconUrl }}
          />
          <Text style={styles.coinNameHeading}>{coin.name}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataHeading}>Price</Text>
          <Text style={styles.dataText}>{parseFloat(coin.price).toFixed(2)} $</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataHeading}>Volume 24h</Text>
          <Text style={styles.dataText}>{coin['24hVolume']} $</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataHeading}>Circulating supply</Text>
          <Text style={styles.dataText}>{coin.supply.circulating} Coins</Text>
        </View>
        <View>
          <Text style={styles.dataHeading}>Market Cap</Text>
          <Text style={styles.dataText}>{coin.marketCap} $</Text>
        </View>
      </View>


      <Pressable style={styles.SpecificStockButton} onPress={navigateToCurrencyConverter}>
        <Text style={styles.SpecificStockButtonText}>Currency Converter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  dataContainer: {
    marginBottom: 13,
  },

  coinNameHeadingContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 25,
  },

  chartContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
    overflow: 'hidden', // This is important to prevent overflow of border
    padding: 5,
  },

  dataWholeContainer: {
    marginRight: 30,
  },

  coinNameHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },

  dataHeading: {
    fontWeight: "bold",
    fontSize: 13,
  },

  dataText: {
    fontSize: 13,
  },

  SpecificStockButton: {
    backgroundColor: '#004CFF',
    borderRadius: 14,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },

  SpecificStockButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },

  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
})

export default SpecificStock;
