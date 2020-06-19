const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=24`;
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
const searchSuggestionsUrl = `https://api.giphy.com/v1/tags/related/`;
const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;


function irACrear() {
  document.location.href = '/crear_guifos.html'
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropBtn() {
  document.getElementById("themes").classList.toggle("show");
}

//Hacer una funcion que muestre la barra de sugerencias de busqueda
function showSuggestions() {
  let content = document.getElementById('searchInput').value
  if (content != "") {
    document.getElementById('showSearchSuggestions').style.display = "block"
    document.getElementById('searchSuggestions').style.display = "grid"
  } else {
    document.getElementById('showSearchSuggestions').style.display = "none"
    document.getElementById('searchSuggestions').style.display = "none"
  }

}

//Hacer una funcion que me traiga las sugerencias de busqueda
function searchSuggestions() {
  let term = document.getElementById('searchInput').value
  if (term === "") {
    return
  }

  fetch(searchSuggestionsUrl + term + `?api_key=${apiKey}`)

    .then(response => response.json())
    .then(json => {
      let sectionSearch = document.getElementById('sectionSearch')
      let searchSuggestions = document.getElementById('searchSuggestions')
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
  let container = document.getElementById("resultContainer")
  container.innerHTML = ""
  let searchValue = document.getElementById("searchInput").value;
  document.getElementById('results').style.display = "block"
  fetch(searchUrl + "&q=" + searchValue + "&limit=24")
    .then(response => response.json())
    .then(json => {
      let results = []
      results = json.data
      for (let index = 0; index < results.length; index++) {
        const result = results[index];

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


//Esta funcion inicializa la camara
let form = new FormData();

function getStreamAndRecord() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false, video: { height: { exact: 434 } }, width: { exact: 832 }
  }).then(async function (stream) {
    video = document.getElementById('stream')
    video.srcObject = stream;
    video.play();
    let recorder = RecordRTC(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240
    });
    recorder.startRecording();
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);
    recorder.stopRecording(function () {
      form.append('file', recorder.getBlob(), 'myGif.gif');
      console.log(form.get('file'))
    });
  });
}

function upload() {

  fetch(uploadUrl, {
    method: 'POST',
    body: form,
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  })
    .then(response => response.json())
    .then(json => {
      let results = json.data
      console.log(results);
      localStorage.setItem('recordedGifId', results.id);

    })
}




//Oculta el div de instrucciones y muestra el div de capturas
function comenzar() {
  document.getElementById('captureOne').style.display = "none"
  document.getElementById('captureTwo').style.display = "block"
  getStreamAndRecord()
}

function capturar() {
  document.getElementById('captureTwo').style.display = "none"
  document.getElementById('captureThree').style.display = "block"
}




//Esta funcion trae los gifs a la seccion hoy te sugerimos

function getRandoms() {
  for (let index = 0; index < 4; index++) {
    fetch(randomUrl)
      .then(response => response.json())
      .then(json => {
        let container = document.getElementById("sugest")
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


//Esta funcion permite hacer el cambio a modo oscuro
function darkMode() {
  let barDark = document.getElementById('bar')
  barDark.classList.remove('bar')
  barDark.className += "barDark"
  let bodyDark = document.getElementById('body')
  bodyDark.className += "bodyDark"
  let logoDark = document.getElementById('logo')
  logoDark.src = 'assets/gifOF_logo_dark.png'
  let divSearchDark = document.getElementById('search')
  divSearchDark.classList.remove('search')
  divSearchDark.className += "searchDark"
  let pDark = document.getElementById('pDark')
  pDark.className += "pDark"
  let inputDark = document.getElementById('searchInput')
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

  var input = document.getElementById("searchInput");
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




