let cityName = document.querySelector('.city-name');
let temperature = document.querySelector('.temperature');
let tempMin = document.querySelector('.temp-min');
let tempMax = document.querySelector('.temp-max');
let weather = document.querySelector('.weather');
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

export const fetchWeatherData = async (location) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7c75eecbdb2e509cfc5858fb61aa0fc5`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData
    }
    catch (error) {
		console.log(error);
    }
    
}

export const sortWeatherData = async (location) => {
    try {
        const weatherData = await fetchWeatherData(location);
        const tempData = {
            city: `${weatherData.name}, ${weatherData.sys.country}`,
            weather: weatherData.weather[0].description,
            temp: weatherData.main.temp,
            minTemp: weatherData.main.temp_min,
            maxTemp: weatherData.main.temp_max
        }
        return tempData;
    }
    catch (error) {
		console.log(error);
    }
    
}

export const displayWeatherData = async (location) => {
    try {
        const data = await sortWeatherData(location);
        const symbol = changeTempSymbol();
        cityName.innerText = data.city;
        weather.innerText = data.weather;
        temperature.innerText = `${Math.floor(changeUnit(data.temp))} ${symbol}`;
        tempMin.innerText = `${Math.floor(changeUnit(data.minTemp))} ${symbol}`;
        tempMax.innerText = `${Math.floor(changeUnit(data.maxTemp))} ${symbol}`;
    }
    catch (error) {
		console.log(error);
    }
}

export const eventListeners = () => {
    document.addEventListener("click", (e) => {
        console.log(e.target.id)
        // if (e.target.tagName == "LABEL") {
        //     const location = new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //           resolve(document.querySelector('.city-name').innerText);
        //         }, 300);
        //       })
        //       .then(displayWeatherData(location));
        // }
        if (e.target.id == "submit") {
            displayWeatherData("sydney");
            //createBackground();
        }
    });
}



