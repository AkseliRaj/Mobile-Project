import Home from './components/Home';
import Loading from './components/Loading';
import Stocks from './components/Stocks';
import CurrencyConverter from './components/CurrencyConverter';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';


const Tab = createBottomTabNavigator();

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
        <Tab.Navigator screenOptions={{
          tabBarActiveColor: '#004CFF',
          tabBarInactivetColor: '#5B5B5B',
          tabBarLabelPosition: 'beside-icon'
        }}>
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={25} color={color} />,
            }}
          />
          <Tab.Screen
            name='Stocks'
            component={Stocks}
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bulletin-board" size={25} color={color} /> }}
          />
          <Tab.Screen
            name='CurrencyConverter'
            component={CurrencyConverter}
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="currency-eur" size={25} color={color} /> }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

    );
  }
}