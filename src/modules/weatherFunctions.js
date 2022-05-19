import { getBackgroundData } from "./background";

const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const tempMin = document.querySelector('.temp-min');
const tempMax = document.querySelector('.temp-max');
const weather = document.querySelector('.weather');
const unitSwitch = document.getElementById('switch');

const changeUnit = (temp) => {
    if (unitSwitch.checked) {
        return temp = (temp - 273.15) * 9/5 + 32;
    }
    if (!unitSwitch.checked) {
        return temp = temp - 273.15;
    }
}

const changeTempSymbol = () => {
    return (unitSwitch.checked ? "°F" : "°C");
}

const fetchWeatherData = async (location) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7c75eecbdb2e509cfc5858fb61aa0fc5`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    }
    catch (err) {
		return;
    }
    
}

const sortWeatherData = (weatherData) => {
    if (!weatherData.sys) {
        return;
    }
    const tempData = {
        city: `${weatherData.name}, ${weatherData.sys.country}`,
        weather: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        minTemp: weatherData.main.temp_min,
        maxTemp: weatherData.main.temp_max
    }
    return tempData;
}

const displayWeatherData = async (data, symbol) => {
    try {
        cityName.innerText = data.city;
        weather.innerText = data.weather;
        temperature.innerText = `${Math.floor(changeUnit(data.temp))} ${symbol}`;
        tempMin.innerText = `${Math.floor(changeUnit(data.minTemp))} ${symbol}`;
        tempMax.innerText = `${Math.floor(changeUnit(data.maxTemp))} ${symbol}`;
    }
    catch (err) {
		alert ("Please enter a valid city name.");
        return;
    }
}

export const fetchAndSortWeatherData = async (location) => {
    const searchWeatherData = await fetchWeatherData(location);
    const sortedData = sortWeatherData(searchWeatherData);
    return sortedData;
}

export const displayWeatherAndBackground = async (location) => {
    const sortedData = await fetchAndSortWeatherData(location);
    const symbol = changeTempSymbol();
    displayWeatherData(sortedData, symbol);
    getBackgroundData(sortedData);
}

export const activateUnitSwitch = () => {
    document.getElementById("unit-switch").addEventListener("click", async () => {
        const location = document.querySelector('.city-name').innerText;
        const sortedData = await fetchAndSortWeatherData(location);
        const symbol = changeTempSymbol();
        displayWeatherData(sortedData, symbol);
    });
}