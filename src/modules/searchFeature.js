import { displayWeatherAndBackground } from "./display";

export const searchFunction = () => {
    const search = document.getElementById('search');
    const submit = document.getElementById('submit');

    submit.addEventListener("click", () => {
        if (!search.value) {
            return;
        }
        displayWeatherAndBackground(search.value);
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            if (!search.value) {
                return;
            }
            displayWeatherAndBackground(search.value);
        }
    });

    //prevent default form submit behaviour
    document.querySelector(".location-form").onsubmit = function(e) {
        e.preventDefault();
    }

}
