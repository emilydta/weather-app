import { displayBackground } from "./background";
import { displayWeatherData, fetchAndSortWeatherData, changeTempSymbol } from "./weatherFunctions";

export const displayWeatherAndBackground = async (location: string) => {
    try {
        const sortedData = await fetchAndSortWeatherData(location);
        const symbol = changeTempSymbol();
        displayWeatherData(sortedData, symbol);
        displayBackground(sortedData);
    }
    catch (err) {
        console.log(err)
		return;
    }
}