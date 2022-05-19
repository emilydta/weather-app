import './style.css';
import { displayWeatherData, activateUnitSwitch } from './modules/generateWeather';
import { createBackground } from './modules/background';
import { searchFunction } from './modules/searchFeature';

createBackground("melbourne, au");     
displayWeatherData("melbourne, au");
searchFunction();
activateUnitSwitch();












