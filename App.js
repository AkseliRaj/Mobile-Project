import Home from './components/Home';
import Loading from './components/Loading';
import Coins from './components/Coins';
import CurrencyConverter from './components/CurrencyConverter';
import SpecificCoin from './components/SpecificCoin';
import { NavigationContainer, StackActions } from '@react-navigation/native';
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
      component={SpecificCoin}
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
      component={SpecificCoin}
      options={{ tabBarStyle: { display: 'none' } }}
    />
  </Stack.Navigator>
);

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
            }}
          />
        </Tab.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    );
  }
}
