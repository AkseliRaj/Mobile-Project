import { View, TextInput } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { converter } from '../style/styles'




const DropdownList = ({ currencyItems, setCurrency, placeholderValue, setAmount, currentItem, setIsConverted }) => {
    const [items, setItems] = useState([])
    const [selectedItemIcon, setSelectedItemIcon] = useState("")

    useEffect(() => {
        const currencyNames = currencyItems.map(item => item.title)
        setItems(currencyNames)
        const indexOfCurrent = currencyItems.findIndex(item => item.title === currentItem)

        setSelectedItemIcon(currentItem ? currencyItems[indexOfCurrent]?.image : currencyItems[0]?.image)

    }, [currencyItems,currentItem])


    return (
        <View style={converter.listContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={selectedItemIcon? selectedItemIcon : ""}
                />
                <SelectDropdown
                    data={items}
                    onSelect={(selectedItem, index) => {
                        setIsConverted(false)
                        setCurrency(selectedItem)
                        setSelectedItemIcon(currencyItems[index]?.image)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return currentItem ? currentItem : selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    defaultValue={items[0]}
                    buttonStyle={converter.dropdownButton}
                    dropdownStyle={converter.dropdownContainer}
                    buttonTextStyle={{ fontSize: 15 }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'black'} size={10} />
                    }}
                />
            </View>
            <TextInput
                style={converter.textInput}
                keyboardType='number-pad'
                returnKeyType="done"
                textAlign='right'
                placeholder={String(placeholderValue)}
                onChangeText={setAmount ? v => setAmount(Number(v)) : null}
                editable={setAmount ? true : false}
            />
        </View>
    )
}

export default DropdownList