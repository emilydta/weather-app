import { displayWeatherAndBackground } from "./display";

export const searchFunction = () => {
    const search = document.getElementById('search') as HTMLInputElement;
    const submit = document.getElementById('submit') as HTMLButtonElement;

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
    let locationForm = document.querySelector(".location-form") as HTMLFormElement;
    locationForm.onsubmit = function(e) {
        e.preventDefault();
    }
}
