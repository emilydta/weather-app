import './style.css';
//import  createBackground from './modules/background';
import {changeTempValues, generateWeather} from './modules/generateWeather';

//createBackground();
generateWeather("melbourne, au");

document.addEventListener("click", (e) => {
    if (e.target.tagName == "LABEL") {
        changeTempValues();
    }
})


