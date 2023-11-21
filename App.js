import Home from './components/Home';
import Loading from './components/Loading';
import Stocks from './components/Stocks';
import CurrencyConverter from './components/CurrencyConverter';
import SpecificStock from './components/SpecificStock';
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
      name='StocksNavigator'
      component={Stocks}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name='SpecificStock'
      component={SpecificStock}
      options={{ tabBarStyle: {display: 'none'} }}
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
            name='Home'
            component={Home}
            options={{
              tabBarLabelPosition: 'below-icon',
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='home' size={25} color={color} />),
            }}
          />
          <Tab.Screen
            name='Stocks'
            component={StocksNavigator}
            options={{
              tabBarLabelPosition: 'below-icon',             
              headerShown: false,
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='bulletin-board' size={25} color={color} />),
            }}
          />
          <Tab.Screen
            name='CurrencyConverter'
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
