import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import DarkModeContext from './DarkModeContext';
import { Switch } from 'react-native-paper';


const DarkModeSwitch = () => {
    const { darkModeSet } = useContext(DarkModeContext);

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
                    trackColor={{ false: "#0731EF", true: "#0731EF" }}
                    thumbColor={darkModeSet ? "white" : "#282828"}
                    
                />
            )}
        </DarkModeContext.Consumer>
    </View>
  )
}

export default DarkModeSwitch