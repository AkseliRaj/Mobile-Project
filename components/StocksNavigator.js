import { View, Text } from 'react-native'
import React from 'react'
import Coins from './Coins'
import SpecificCoin from './SpecificCoin'
import { createStackNavigator } from '@react-navigation/stack';
import DarkModeContext from './DarkModeContext';
import { useContext } from 'react';

const Stack = createStackNavigator();

const StocksNavigator = () => {

    const { darkModeSet } = useContext(DarkModeContext);


  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Coins'
        component={Coins}
        options={{ headerShown: true,
        headerTintColor: darkModeSet ? 'white' : 'black',
        headerStyle: {
            backgroundColor: darkModeSet ? '#282828' : 'white',
        },
        }}
        />
        <Stack.Screen
        name='Specific coin'
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

export default StocksNavigator