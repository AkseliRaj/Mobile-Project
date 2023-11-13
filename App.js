import Home from './components/Home';
import Loading from './components/Loading';
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
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: 'transparent' }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline'
              } else if (route.name === 'Gameboard') {
                iconName = focused
                  ? 'dice-multiple'
                  : 'dice-multiple-outline'
              } else if (route.name === 'Scoreboard') {
                iconName = focused
                  ? 'view-list'
                  : 'view-list-outline'
              }
              return <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray'
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

    );
  }
}