const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=24`;
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
const searchSuggestionsUrl = `https://api.giphy.com/v1/tags/related/`;




function irACrear() {
  document.location.href = 'crear_guifos.html'
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropBtn() {
  document.getElementById("themes").classList.toggle("show");
}

//Esta funcion trae los gifs a la seccion hoy te sugerimos
// function getRandoms() {
//   let gifsRandom = []
//   for (let index = 0; index < 4; index++) {
//     fetch(randomUrl)
//       .then(response => response.json())
//       .then(json => {
//         result = json.data
//         gifsRandom.push(result)
//       })
//   }
//   createRandomsHtml()
// }
// function createRandomsHtml(data) {
//   for (let index = 0; index < gifsRandom.length; index++) {
//     let container = document.getElementById("sugest")
//     let addDiv = document.createElement("div")
//     addDiv.id = 'gifNro' + index
//     addDiv.classList.add("gifFrame")
//     let addFigure = document.createElement("figure")
//     let addFigCaption = document.createElement("figcaption")
//     addFigCaption.innerHTML = `#${`${json.data.title}`}`
//     let addImg = document.createElement("img")
//     let close = document.createElement("img")
//     close.id = 'close' + [index]
//     close.src = "assets/close.svg"
//     close.classList.add("close")
//     addImg.src = `${json.data.images.preview_gif.url}`
//     let addButton = document.createElement("button")
//     addButton.innerHTML = "Ver más..."
//     container.appendChild(addDiv)
//     addDiv.appendChild(addFigure)
//     addFigure.appendChild(addFigCaption)
//     addFigure.appendChild(addImg)
//     addFigure.appendChild(close)
//     addFigure.appendChild(addButton)

//   }

// }
function getRandoms() {
  for (let index = 0; index < 4; index++) {
    fetch(randomUrl)
      .then(response => response.json())
      .then(json => {
        let container = document.getElementById("sugest")
        let addDiv = document.createElement("div")
        addDiv.id = 'gifNro' + index
        addDiv.classList.add("gifFrame")
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
        addFigCaption.innerHTML = `#${`${json.data.title}`}`
        let addImg = document.createElement("img")
        let close = document.createElement("img")
        close.id = 'close' + [index]
        close.src = "assets/close.svg"
        close.classList.add("close")
        addImg.src = `${json.data.images.preview_gif.url}`
        let addButton = document.createElement("button")
        addButton.innerHTML = "Ver más..."
        container.appendChild(addDiv)
        addDiv.appendChild(addFigure)
        addFigure.appendChild(addFigCaption)
        addFigure.appendChild(addImg)
        addFigure.appendChild(close)
        addFigure.appendChild(addButton)
        let btnClose = document.getElementById('close' + [index])
        btnClose.addEventListener('click', () => {
          document.getElementById('gifNro' + index).style.display = 'none'
        })
      })

      .catch(error => console.log(error))


  }

}





//Esta funcion trae los gifs a la seccion tendencias.
function getTrends() {
  fetch(trendingUrl)
    .then(response => response.json())
    .then(json => {
      let trends = []
      trends = json.data
      for (let index = 0; index < trends.length; index++) {
        const result = trends[index];
        let container = document.getElementById("trends")
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

    })
    .catch(error => console.log(error))


}

// function getMisGuifos() {
//   fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}`)
// }



//Esta funcion permite hacer el cambio a modo oscuro
function nightMode() {
  localStorage.setItem('tema', 1)
  location.reload();
}


function darkMode() {
  let theme = localStorage.getItem('tema')
  if (theme === 1) {
    let logo = document.getElementById('logo')
    logo.src = 'assets/gifOf_logo_dark.png'
    let lupa = document.getElementById('lupa')
    lupa.src = 'assets/Combined Shape.svg'
    var input = document.getElementById("searchInput")
    input.addEventListener('keyup', () => {
      lupa.src = 'assets/lupa_light.svg'
      event.stopPropagation()
    })
    changeStylesheetNight()
  } 

}

function dayMode() {
  localStorage.setItem('tema', 2)
  changeStylesheetDay()
  location.reload();
}

function initEvents() {
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

  var input = document.getElementById("searchInput");
  let button = document.getElementById('btnSearch')
  input.addEventListener("input", function (event) {
    if (button.classList.contains('btnInactive')) {
      button.classList.remove('btnInactive');
      button.classList.add('btnActive')
    } else if (input.value === " ") {
      button.classList.remove('btnActive');
      button.classList.add('btnInactive')
    }


  })


  var input = document.getElementById("searchInput");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      search()
    }
  })

}

//Esta funcion llama a las funciones que contiene una vez que se carga el html
(function () {
  darkMode()
  getRandoms()
  getTrends()
  initEvents()
})();




