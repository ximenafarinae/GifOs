const idsUrl = `https://api.giphy.com/v1/gifs?api_key=${apiKey}`
function getMisGuifos() {
  fetch(idsUrl + '&ids=' + getGifIds().toLocaleString())
    .then(response => response.json())
    .then(json => {
      let trends = []
      trends = json.data
      createGifFrame(trends)

    })
    .catch(error => console.log(error))

}

function createGifFrame(trends){
  for (let index = 0; index < trends.length; index++) {
    const result = trends[index];
    let container = document.getElementById("myGifs")
    let addDiv = document.createElement("div")
    addDiv.className += "gifTrend"
    let addFigure = document.createElement("figure")
    let addFigCaption = document.createElement("figcaption")
    addFigCaption.innerHTML = `#${`${trends[index].title}`}`
    let addImg = document.createElement("img") //`<img src="" alt="">`
    addImg.src = `${result.images.preview_gif.url}`
    container.appendChild(addDiv)
    addDiv.appendChild(addFigure)
    addFigure.appendChild(addFigCaption)
    addFigure.appendChild(addImg)
    if ((index + 1) % 5 === 0) {
      addImg.src = `${result.images.downsized_large.url}`
      addDiv.classList.add('wideGif')
    }
  }
}


function darkTheme() {
  let tema = localStorage.getItem('tema')
  if (tema == 1) {
    let logo = document.getElementById('logo')
    logo.src = 'assets/gifOF_logo_dark.png'
    
  } else if (tema == 2) {
    logo.src = 'assets/gifOF_logo.png'
  }
}

darkTheme()
getMisGuifos();
