import { View, Text } from 'react-native'
import React from 'react'

export const getCoins = async () => {
        try{
            const response = await fetch('https://api.coinranking.com/v2/coins', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            
            return result.data.coins
        }
        catch(error){
            console.error('Error fetching data:', error);
        }
    }
