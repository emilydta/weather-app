const getBackgroundData = async (data) => {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${data.weather}&per_page=2`, 
    {headers: {
      Authorization: 
      `${process.env.PEX_API_KEY}`
    }});
    const images = await response.json();
    return images;
  }
  catch (err) {
		return;
  }    
}

export const displayBackground = async (data) => {
  try {
    const images = await getBackgroundData(data);
    let index = Math.floor(Math.random() * images.photos.length);
    const img = document.querySelector('.background-image');
    return img.src = images.photos[index].src.original; 
  }
  catch (err) {
    console.log(err.message)
		return;
  }  
}