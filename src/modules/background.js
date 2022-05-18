

const createBackground = (weather) => {
    const img = document.querySelector('.background-image');
    fetch(`https://api.pexels.com/v1/search?query=${weather}&per_page=3`, {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          let index = Math.floor(Math.random() * response.photos.length);
          return img.src = response.photos[index].src.original;
        });
}

export default createBackground;
