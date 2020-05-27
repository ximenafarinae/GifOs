const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const randomUrl = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

document.body.onload = getRandoms();

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropBtn() {
  document.getElementById("themes").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.goDown')) {
    var dropdowns = document.getElementsByClassName("themeSelector");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function search() {
  let searchValue = document.getElementById("searchInput").value;
  fetch(searchUrl + "&q=" + searchValue)
    .then(response => response.json())
    .then(json => {
      let searchResults = document.getElementById("searchResults");
      var html = "";
      json.data.forEach(result => {
        console.log(result)
        html = html + `<img src="${result.images.preview_gif.url}"></img>`
      });
      searchResults.innerHTML = html;
    })
}

function getRandoms() {

  for (let index = 0; index < 4; index++) {
    fetch(randomUrl)
      .then(response => response.json())
      .then(json => {
        let container = document.getElementById("sugest")
        let addDiv = document.createElement("div")
        addDiv.className += "gifFrame"
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
        addFigCaption.innerHTML = `#${`${json.data.title}`}`
        let addImg = document.createElement("img") 
        addImg.src = `${json.data.images.preview_gif.url}`
        let addButton = document.createElement("button")
        addButton.innerHTML = "Ver más..."
        container.appendChild(addDiv)
        addDiv.appendChild(addFigure)
        addFigure.appendChild(addFigCaption)
        addFigure.appendChild(addImg)
        addFigure.appendChild(addButton)

      });


  }

}

function getTrends() {
    fetch(trendingUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        json.data.forEach(result => {
        let container = document.getElementById("trends")
        let addDiv = document.createElement("div")
        addDiv.className += "gifTrend"
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
        let addImg = document.createElement("img") //`<img src="" alt="">`
        addImg.src = `${result.images.original_still.url}`
        container.appendChild(addDiv)
        addDiv.appendChild(addFigure)
        addFigure.appendChild(addFigCaption)
        addFigure.appendChild(addImg)
        });
        
      });

}





