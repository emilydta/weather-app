import './style.css';
import { displayWeatherData, eventListeners } from './modules/generateWeather';
import { createBackground } from './modules/background';

//createBackground();

     
displayWeatherData("melbourne, au");
eventListeners();



