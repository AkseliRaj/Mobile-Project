import React from 'react';
import Loading from './Loading';
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from 'react';
import { getCoinDetails } from '../api/Functions';
import { specificLM } from '../style/styles'
import { specificDM } from '../style/stylesDM'
import ErrorScreen from './ErrorScreen';
import DarkModeContext from './DarkModeContext';
import { useContext } from 'react';

// Hard coded uuid for testing purposes
// const UUID = 'Qwsogvtv82FCd'

const SpecificCoin = ({ navigation, route }) => {

  const { uuid } = route.params;

  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  const timePeriods = ["1h", "3h", "3m", "1y", "3y"];
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(null)
  const [timeframe, setTimeframe] = useState([])


  const { darkModeSet } = useContext(DarkModeContext);
  const specific = darkModeSet ? specificDM : specificLM;

    



  const navigateToCurrencyConverter = () => {
    navigation.popToTop();
    navigation.navigate('Converter', coin);
  };

  // Getting data from the API
  const fetchCoinDetails = async (timePeriod) => {

    setSelectedTimePeriod(timePeriod)
    let result = await getCoinDetails(uuid, timePeriod);


    if (result === "error") {
      setError(true)
      return 0
    }

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

  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price)
    if (Number(parsedPrice) >= 1) {
      return parsedPrice.toFixed(2)
    } else {
      const parts = price.split(".")
      const firstNonZeroIndex = parts[1].split("").findIndex((digit) => digit !== "0")
      return parsedPrice.toFixed(firstNonZeroIndex + 2)
    }
  }


  if (!error) {
    return (
      <ScrollView style={specific.container}>
        <View style={specific.centeredContainer}>
          <View style={specific.chartContainer}>
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
                backgroundColor: darkModeSet ? "#282828" : "#ffffff",
                backgroundGradientFrom: darkModeSet ? "#282828" : "#ffffff",
                backgroundGradientTo: darkModeSet ? "#282828" : "#ffffff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 76, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(109, 109, 109, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#004CFF"
                }
              }}

              style={{
                marginTop: 10,
                borderRadius: 16,
              }}
            />
            <View style={specific.timePeriodContainer}>
              {timePeriods.map((item, i) => (
                <Pressable
                  key={item + i}
                  onPress={() => fetchCoinDetails(item)}
                >
                  <Text style={{ color: selectedTimePeriod === item ? "#004CFF" : (darkModeSet ? "white" : "black")}}>{item}</Text>
                </Pressable>
              ))
              }
            </View>
          </View>
          <View style={specific.dataWholeContainer}>
            <View style={specific.coinNameHeadingContainer}>
              <ExpoImage
                style={specific.coinIcon}
                source={{ uri: coin.iconUrl }}
              />
              <Text style={specific.coinNameHeading}>{coin.name}</Text>
            </View>
            <View style={specific.dataContainer}>
              <Text style={specific.dataHeading}>Price</Text>
              <Text style={specific.dataText}>{formatPrice(coin.price)} $</Text>
            </View>
            <View style={specific.dataContainer}>
              <Text style={specific.dataHeading}>Volume 24h</Text>
              <Text style={specific.dataText}>{Number(coin['24hVolume']).toLocaleString()} $</Text>
            </View>
            <View style={specific.dataContainer}>
              <Text style={specific.dataHeading}>Circulating supply</Text>
              <Text style={specific.dataText}>{Number(coin.supply.circulating).toLocaleString()} Coins</Text>
            </View>
            <View>
              <Text style={specific.dataHeading}>Market Cap</Text>
              <Text style={specific.dataText}>{Number(coin.marketCap).toLocaleString()} $</Text>
            </View>
          </View>

          <Pressable style={specific.SpecificStockButton} onPress={navigateToCurrencyConverter}>
            <Text style={specific.SpecificStockButtonText}>Go to converter</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
  else {
    return (
      <ErrorScreen />
    )
  }
};

export default SpecificCoin;
