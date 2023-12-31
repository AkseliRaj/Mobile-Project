const URL = 'https://api.coinranking.com/v2/'
const APIKEY = "coinrankingf42c6745f49e34e0cc901dcb0960ec367f35caf528b67704"

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': APIKEY,
}

// Calls the API to get the coins

export const getCoins = async () => {
    try {
        const response = await fetch(URL + 'coins', {
            method: 'GET',
            headers: headers
        });
        const result = await response.json();

        return result.data.coins
    }
    catch (error) {
        console.error('Error fetching data:', error)
        return "error"
    }
}

// Calls the API to get the FIAT currencies

export const getFiatCurrencies = async () => {
    try {
        const response = await fetch(URL + 'reference-currencies', {
            method: 'GET',
            headers: headers
        });
        const result = await response.json();

        return result.data.currencies
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return "error"
    }
}

// Calls the API to get the coin details for a specific coin. Using uuid as a parameter. So remember to pass the uuid of the coin when navigating to specific coin details page.

export const getCoinDetails = async (id, timePeriod) => {
    try {
        let uri = URL + 'coin/' + id;

        // Add timePeriod to the URI only if it is provided
        if (timePeriod) {
            uri += "?timePeriod=" + timePeriod;
        }

        const response = await fetch(uri, {
            method: 'GET',
            headers: headers
        });

        const result = await response.json();

        return result.data.coin;
    } catch (error) {
        console.error('Error fetching data:', error);
        return "error"
    }
}

// Search for a coin by name or symbol

export const searchCoin = async (search) => {
    try {
        const response = await fetch(URL + 'search-suggestions?query=' + search, {
            method: 'GET',
            headers: headers
        });
        const result = await response.json();

        return result.data.coins
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return "error"
    }
}