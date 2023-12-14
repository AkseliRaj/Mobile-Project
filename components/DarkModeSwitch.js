import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import DarkModeContext from './DarkModeContext';
import { Switch } from 'react-native-paper';


const DarkModeSwitch = () => {
    const { darkModeSet, setDarkModeSet } = useContext(DarkModeContext);

    useEffect(() => {
        console.log('dark mode set to: ', darkModeSet);
    }, [darkModeSet])

  return (
    <View>
        <DarkModeContext.Consumer>
            {({ darkModeSet, setDarkModeSet }) => (
                <Switch
                    value={darkModeSet}
                    onValueChange={() => setDarkModeSet(!darkModeSet)}
                />
            )}
        </DarkModeContext.Consumer>
    </View>
  )
}

export default DarkModeSwitch