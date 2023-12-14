import Home from './components/Home';
import Loading from './components/Loading';
import Coins from './components/Search';
import CurrencyConverter from './components/CurrencyConverter';
import SpecificCoin from './components/Coin';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import HomeNavigator from './components/HomeNavigator';
import StocksNavigator from './components/StocksNavigator';
import DarkModeContext from './components/DarkModeContext';
import { useContext } from 'react';


const Tab = createBottomTabNavigator();


/**
 * resets tabs with stacknavigators to the first route when navigation to another tab
 */
const resetTabStacksOnBlur = ({ navigation }) => ({
  blur: () => {
    const state = navigation.getState();
    state.routes.forEach((route, tabIndex) => {
      if (state?.index !== tabIndex && route.state?.index > 0) {
        navigation.dispatch(StackActions.popToTop());
      }
    });
  },
});


export default function App() {

  const [isloading, setIsLoading] = useState(true);
  const [darkModeSet, setDarkModeSet] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 2000)
  })

  useEffect(() => {
    console.log('dark mode set to: ', darkModeSet);
  }, [])

  if (isloading) {
    return (
      <Loading />
    )
  }
  else {

    return (
      <DarkModeContext.Provider value={{ darkModeSet, setDarkModeSet }}>
        <NavigationContainer darkModeSet={darkModeSet}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#004CFF',
              tabBarInactiveTintColor: darkModeSet ? 'white' : '#5B5B5B',
              tabBarLabelPosition: 'beside-icon',
              tabBarStyle: {
                backgroundColor: darkModeSet ? '#363535' : 'white',
            },
            }}
          >
            <Tab.Screen
              name='Name'
              component={HomeNavigator}
              listeners={resetTabStacksOnBlur}
              options={{
                tabBarLabelPosition: 'below-icon',
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='home' size={25} color={color} />),
              }}
            />
            <Tab.Screen
              name='Default'
              component={StocksNavigator}
              listeners={resetTabStacksOnBlur}
              options={{
                tabBarLabelPosition: 'below-icon',
                headerShown: false,
                title: 'Coins',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='magnify' size={25} color={color} />),
              }}
            />
            <Tab.Screen
              name='Currency converter'
              component={CurrencyConverter}
              options={{
                tabBarLabelPosition: 'below-icon',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='calculator-variant' size={25} color={color} />),
                headerStyle: {
                  backgroundColor: darkModeSet ? '#282828' : 'white'
                },
                headerTintColor: darkModeSet ? 'white' : 'black',  
              }}
            />
          </Tab.Navigator>
          <StatusBar style='auto' />
        </NavigationContainer>
      </DarkModeContext.Provider>
    );
  }
}
