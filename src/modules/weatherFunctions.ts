const cityName = document.querySelector('.city-name') as HTMLHeadingElement;
const temperature = document.querySelector('.temperature') as HTMLSpanElement;
const tempMin = document.querySelector('.temp-min') as HTMLSpanElement;
const tempMax = document.querySelector('.temp-max') as HTMLSpanElement;
const weather = document.querySelector('.weather') as HTMLSpanElement;
const unitSwitch = document.getElementById('switch') as HTMLInputElement;


const changeUnit = (temp: number): number => {
    const fahrenheit = (temp - 273.15) * 9/5 + 32; 
    const celsius = temp - 273.15;
    return (unitSwitch.checked ? fahrenheit : celsius);
}

export const changeTempSymbol = (): string => {
    return (unitSwitch.checked ? "°F" : "°C");
}

const fetchWeatherData = async (location: string): Promise<Object | string> => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEA_API_KEY}`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    }
    catch (err: any) {
		return err.message;
    }  
}

const sortWeatherData = (weatherData: any) => {
    const data = {
        city: `${weatherData.name}, ${weatherData.sys.country}`,
        weather: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        minTemp: weatherData.main.temp_min,
        maxTemp: weatherData.main.temp_max
    }
    return data;
}

export const displayWeatherData = (data: any, symbol: string) => {
    cityName.innerText = data.city;
    weather.innerText = data.weather;
    temperature.innerText = `${Math.floor(changeUnit(data.temp))} ${symbol}`;
    tempMin.innerText = `${Math.floor(changeUnit(data.minTemp))} ${symbol}`;
    tempMax.innerText = `${Math.floor(changeUnit(data.maxTemp))} ${symbol}`;
}

export const fetchAndSortWeatherData = async (location: string) => {
    try {
        const weatherData = await fetchWeatherData(location);
        const sortedData = sortWeatherData(weatherData);
        return sortedData;
    }
    catch (err) {
		return;
    }
}

export const activateUnitSwitch = () => {
    unitSwitch.addEventListener("click", async () => {
        try {
            const location = cityName.innerText;
            const sortedData = await fetchAndSortWeatherData(location);
            const symbol = changeTempSymbol();
            displayWeatherData(sortedData, symbol);
        }
        catch (err) {
            return err;
        }  
    });
}