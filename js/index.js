const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=24`;
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
const searchSuggestionsUrl = `http://api.giphy.com/v1/tags/related/`;


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropBtn() {
  d("themes").classList.toggle("show");
}

//Hacer una funcion que muestre la barra de sugerencias de busqueda
function showSuggestions() {
  let content = d('searchInput').value
  if (content != "") {
    d('showSearchSuggestions').style.display = "block"
    d('searchSuggestions').style.display = "grid"
  } else {
    d('showSearchSuggestions').style.display = "none"
    d('searchSuggestions').style.display = "none"
  }

}

//Hacer una funcion que me traiga las sugerencias de busqueda
function searchSuggestions() {
  let term = d('searchInput').value
  if (term === "") {
    return
  }
  fetch(searchSuggestionsUrl + term + `?api_key=${apiKey}`)

    .then(response => response.json())
    .then(json => {
      let sectionSearch = d('sectionSearch')
      let searchSuggestions = d('searchSuggestions')
      searchSuggestions.innerHTML = ""
      sectionSearch.appendChild(searchSuggestions)
      let resultLength = Math.min(3, json.data.length)

      for (i = 0; i < resultLength; i++) {
        let result = document.createElement('div')
        let resultName = document.createElement('p')
        result.appendChild(resultName)
        resultName.innerHTML = json.data[i].name
        searchSuggestions.appendChild(result)
      }

    })

}

//Esta funcion permite realizar la busqueda desde la barra
function search() {
  let searchValue = d("searchInput").value;
  d('results').style.display = "block"
  fetch(searchUrl + "&q=" + searchValue + "&limit=24")
    .then(response => response.json())
    .then(json => {
      let results = []
      results = json.data
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        let container = d("resultContainer")
        let addDiv = document.createElement("div")
        addDiv.className += "gifResult"
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
        console.log(result.title)
        addFigCaption.innerHTML = `#${`${result.title}`}`
        let addImg = document.createElement("img")
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

//Esta funcion obtiene un elemento por su id
function d(id) {
  return document.getElementById(id);
}

//Esta funcion inicializa la camara
function getStreamAndRecord() {

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false, video: { height: { exact: 434 } }, width: { exact: 832 }
  }).then(async function (stream) {
    video = d('stream')
    video.srcObject = stream;
    video.play();
    // let recorder = RecordRTC(stream, {
    //   type: 'gif',
    //   frameRate: 1,
    //   quality: 10,
    //   width: 360,
    //   hidden: 240
    // });
    // recorder.startRecording();

    // const sleep = m => new Promise(r => setTimeout(r, m));
    // await sleep(3000);

    // recorder.stopRecording(function () {
    //   let blob = recorder.getBlob();
    //   console.log(blob)
    //   localStorage.setItem('miGif', JSON.stringify(blob))
    //   // invokeSaveAsDialog(blob);
    // });
  });
}

//Oculta el div de instrucciones y muestra el div de capturas
function comenzar() {
  d('captureOne').style.display = "none"
  d('captureTwo').style.display = "block"
  getStreamAndRecord()
}

function capturar() {
  d('captureTwo').style.display = "none"
  d('captureThree').style.display = "block"
}




//Esta funcion trae los gifs a la seccion hoy te sugerimos

function getRandoms() {
  for (let index = 0; index < 4; index++) {
    fetch(randomUrl)
      .then(response => response.json())
      .then(json => {
        let container = d("sugest")
        let addDiv = document.createElement("div")
        addDiv.classList.add("gifFrame")
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
        addFigCaption.innerHTML = `#${`${json.data.title}`}`
        let addImg = document.createElement("img")
        let close = document.createElement("img")
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
        let container = d("trends")
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


//Esta funcion permite hacer el cambio a modo oscuro
function darkMode() {
  let barDark = d('bar')
  barDark.classList.remove('bar')
  barDark.className += "barDark"
  let bodyDark = d('body')
  bodyDark.className += "bodyDark"
  let logoDark = d('logo')
  logoDark.src = 'assets/gifOF_logo_dark.png'
  let divSearchDark = d('search')
  divSearchDark.classList.remove('search')
  divSearchDark.className += "searchDark"
  let pDark = d('pDark')
  pDark.className += "pDark"
  let inputDark = d('searchInput')
  inputDark.className += "inputDark"

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

  var input = d("searchInput");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      search()
    }
  })
}

//Esta funcion llama a las funciones que contiene una vez que se carga el html
(function () {
  getRandoms()
  getTrends()
  initEvents()
})();




