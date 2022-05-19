import { sortWeatherData } from "./generateWeather";

export const createBackground = async (location) => {
  try {
    const img = document.querySelector('.background-image');
    const data = await sortWeatherData(location);
    const response = await fetch(`https://api.pexels.com/v1/search?query=${data.weather}&per_page=2`, 
    {headers: {
      Authorization: 
      "563492ad6f91700001000001231b4ca641d54a5282bae2b44e046189"
    }});
    const images = await response.json();
    let index = Math.floor(Math.random() * images.photos.length);
    return img.src = images.photos[index].src.original; 
  }
  catch (err) {
		return;
    }    
}
