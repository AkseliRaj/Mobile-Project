import { View, Text } from 'react-native'
import React from 'react'
import Home from './Home'
import SpecificCoin from './Coin'
import { createStackNavigator } from '@react-navigation/stack';
import DarkModeContext from './DarkModeContext';
import { useContext } from 'react';

const Stack = createStackNavigator();

const HomeNavigator = () => {

    const { darkModeSet } = useContext(DarkModeContext);

  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: true,
        headerTintColor: darkModeSet ? 'white' : 'black',
        headerStyle: {
            backgroundColor: darkModeSet ? '#282828' : 'white',
        }, }}
        />
        <Stack.Screen
        name='Coin'
        component={SpecificCoin}
        options={{ tabBarStyle: { display: 'none' },
        headerTintColor: darkModeSet ? 'white' : 'black',
        headerStyle: {
            backgroundColor: darkModeSet ? '#282828' : 'white',
        },
        }}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigator