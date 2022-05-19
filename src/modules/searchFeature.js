import { displayWeatherData } from "./generateWeather";
import { createBackground } from "./background";

export const searchFunction = () => {
    const search = document.getElementById('search');
    const submit = document.getElementById('submit');

    submit.addEventListener("click", () => {
        createBackground(search.value);
        displayWeatherData(search.value);
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            createBackground(search.value);
            displayWeatherData(search.value);
        }
    });

    //prevent default form submit behaviour
    document.querySelector(".location-form").onsubmit = function(e) {
        e.preventDefault();
    }

}
