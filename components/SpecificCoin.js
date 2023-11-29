import React from 'react';
import { View, Text, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from 'react';
import { getCoinDetails } from '../api/Functions';
import Loading from './Loading';

// Hard coded uuid for testing purposes
// const UUID = 'Qwsogvtv82FCd'

const SpecificCoin = ({ navigation, route }) => {

  const { uuid } = route.params;

  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const timePeriods = ["1h", "3h", "3m", "1y", "3y"];
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(null)
  const [timeframe, setTimeframe] = useState([])


  const navigateToCurrencyConverter = () => {
    navigation.popToTop();
    navigation.navigate('Currency converter', coin);
  };

  // Getting data from the API
  const fetchCoinDetails = async (timePeriod) => {
    setSelectedTimePeriod(timePeriod)
    let result = await getCoinDetails(uuid, timePeriod);
    const convertedSparkline = result.sparkline.map(dataPoint => parseFloat(dataPoint));
    const filteredSparkline = convertedSparkline.filter((dataPoint) => isNaN(dataPoint) === false)

    result.sparkline = filteredSparkline;
    setCoin(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoinDetails("1y");
  }, [uuid]);

  // Triggers everytime time period changes
  useEffect(() => {
    changeTimeframe()
  }, [selectedTimePeriod]);

  const changeTimeframe = () => {

    switch (selectedTimePeriod) {
      case "1y":
        setTimeframe(generateShortenedDates(12))
        break

      case "3y":
        const date = new Date()
        const currentYear = date.getFullYear()

        const years = []

        for (let i = 0; i < 3; i++) {
          years.push(currentYear - i)
        }
        setTimeframe(years.reverse())
        break

      case "3m":
        setTimeframe(generateShortenedDates(3))
        break

      case "1h":
        setTimeframe(generateTimeframe(60, 10))
        break

      case "3h":
        setTimeframe(generateTimeframe(180, 30))
        break
    }

  }

  const generateShortenedDates = (numberOfMonths) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date = new Date()
    const shortenedDates = []

    for (let i = 0; i < numberOfMonths; i++) {
      shortenedDates.push(`${months[date.getMonth()]}`)
      date.setMonth(date.getMonth() - 1)
    }
    return shortenedDates.reverse()
  }

  const generateTimeframe = (minutes, step) => {
    const date = new Date()
    const generatedTimeframe = []

    for (let i = 0; i <= minutes; i += step) {
      const currentTime = `${date.getHours()}.${date.getMinutes()}`
      generatedTimeframe.push(currentTime)
      date.setMinutes(date.getMinutes() - step)
    }
    return generatedTimeframe.reverse()
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.timePeriodContainer}>
        {timePeriods.map((item, i) => (
          <Pressable
            key={item + i}
            onPress={() => fetchCoinDetails(item)}
          >
            <Text style={{ color: selectedTimePeriod === item ? "#004CFF" : "black" }}>{item}</Text>
          </Pressable>
        ))
        }
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: timeframe,
            datasets: [
              {
                data: coin.sparkline
              }
            ]
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={250}
          yAxisSuffix="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 76, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(109, 109, 109, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
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
        <Text style={styles.SpecificStockButtonText}>Currency converter</Text>
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

  timePeriodContainer: {
    padding: 10,
    flexDirection: "row",
    gap: 15
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
    width: 230,
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

export default SpecificCoin;
