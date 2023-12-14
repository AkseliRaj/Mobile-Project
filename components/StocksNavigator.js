import React from 'react'
import Coins from './Search'
import SpecificCoin from './Coin'
import { createStackNavigator } from '@react-navigation/stack';
import DarkModeContext from './DarkModeContext';
import { useContext } from 'react';

const Stack = createStackNavigator();

const StocksNavigator = () => {

    const { darkModeSet } = useContext(DarkModeContext);


  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Search'
        component={Coins}
        options={{ headerShown: true,
        headerTintColor: darkModeSet ? 'white' : 'black',
        headerStyle: {
            backgroundColor: darkModeSet ? '#282828' : 'white',
        },
        }}
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

export default StocksNavigator