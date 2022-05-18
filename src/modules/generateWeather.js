let cityName = document.querySelector('.city-name');
let temperature = document.querySelector('.temperature');
let tempMin = document.querySelector('.temp-min');
let tempMax = document.querySelector('.temp-max');
let weather = document.querySelector('.weather');

const tempUnit = {
    symbol: "°C",
    system: "metric"
}

const changeUnit = (temp) => {
    if (tempUnit.system == "metric") {
        tempUnit.system = "imperial";
        tempUnit.symbol = "°F";
        return temp = (temp - 273.15) * 9/5 + 32;
    }
    if (tempUnit.system == "imperial") {
        tempUnit.system = "metric";
        tempUnit.symbol = "°C";
        return temp = temp - 273.15;
    }
}

const changeTempValues = () => {
    //make this an asyn function probably
    temperature.innerText = changeUnit(temperature.innerText);
    tempMin.innerText = changeUnit(tempMin.innerText);
    tempMax.innerText = changeUnit(tempMax.innerText);
    console.log(temperature.innerText)
}

const generateWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c75eecbdb2e509cfc5858fb61aa0fc5`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        cityName.innerText = `${response.name}, ${response.sys.country}`;
        weather.innerText = `${response.weather[0].description}`;
        temperature.innerText = `${Math.floor(changeUnit(response.main.temp))} ${tempUnit.symbol}`;
        tempMin.innerText = `${Math.floor(changeUnit(response.main.temp_min))} ${tempUnit.symbol}`;
        tempMax.innerText = `${Math.floor(changeUnit(response.main.temp_max))} ${tempUnit.symbol}`;
        console.log(response)
        });
}

export {
    weather,
    generateWeather,
    changeTempValues,
}
   