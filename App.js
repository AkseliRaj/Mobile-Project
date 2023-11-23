import Home from './components/Home';
import Loading from './components/Loading';
import Coins from './components/Coins';
import CurrencyConverter from './components/CurrencyConverter';
import SpecificStock from './components/SpecificCoin';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const StocksNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Coins'
      component={Coins}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name='Specific coin'
      component={SpecificStock}
      options={{ tabBarStyle: { display: 'none' } }}
    />
  </Stack.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={Home}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name='Specific coin'
      component={SpecificStock}
      options={{ tabBarStyle: { display: 'none' } }}
    />
  </Stack.Navigator>
);

export default function App() {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 2000)
  })

  if (isloading) {
    return (
      <Loading />
    )
  }
  else {

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveColor: '#004CFF',
            tabBarInactiveColor: '#5B5B5B',
            tabBarLabelPosition: 'beside-icon',
          }}
        >
          <Tab.Screen
            name='Name'
            component={HomeNavigator}
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
            options={{
              tabBarLabelPosition: 'below-icon',
              headerShown: false,
              title: 'Coins',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='bulletin-board' size={25} color={color} />),
            }}
          />
          <Tab.Screen
            name='Currency converter'
            component={CurrencyConverter}
            options={{
              tabBarLabelPosition: 'below-icon',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='currency-eur' size={25} color={color} />),
            }}
          />
        </Tab.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    );
  }
}
