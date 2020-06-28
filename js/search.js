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
    let hashtags = document.getElementById('showHashtags')
    hashtags.style.display = "none"
    hashtags.innerHTML = ""
    let term = document.getElementById('searchInput').value
    if (term === "") {
        return
    }
    fetch(searchSuggestionsUrl + term + `?api_key=${apiKey}`)

        .then(response => response.json())
        .then(json => {
            console.log(json.data)
            let sectionSearch = document.getElementById('sectionSearch')
            let searchSuggestions = document.getElementById('searchSuggestions')
            searchSuggestions.innerHTML = ""
            sectionSearch.appendChild(searchSuggestions)
            let resultLength = Math.min(3, json.data.length)

            for (i = 0; i < resultLength; i++) {
                let result = document.createElement('div')
                result.id = "result" + i
                let resultName = document.createElement('p')
                resultName.id = "resultName" + i
                result.appendChild(resultName)
                resultName.innerHTML = json.data[i].name
                searchSuggestions.appendChild(result)
                resultName.addEventListener('click', handleClick)
            }
        })
}

function handleClick(event) {
    getValue(event.target)
    search()
}

function getValue(p) {
    let searchInput = document.getElementById('searchInput')
    let value = document.getElementById(p.id).textContent
    searchInput.value = value
    noMostrar('searchSuggestions')

}
function showHashtags() {
    let container = document.getElementById('showHashtags')
    container.style.display = 'grid'
    let searchs = JSON.parse(localStorage.getItem('searchHData')) 
    console.log(searchs)
    for (let index = 0; index < 6; index++) {
        let result = searchs[index]
        console.log(result)
        let box = document.createElement('div')
        let span = document.createElement('span')
        box.classList.add('searchTags')
        box.id = 'hashtag' + index
        container.appendChild(box)
        box.appendChild(span)
        span.id = 'span' + index
        span.textContent = '#' + result
        if (span.textContent.length > 11) {
            box.classList.add('divWide')
        }
    }
    hashtagsSearch()
}

//Esta funcion es la que toma el text de los botones que tienen los hashtags y realiza la busqueda
function hashtagsSearch() {
    for (let index = 0; index < 6; index++) {
        let btn = document.getElementById('hashtag' + index)
        let text = document.getElementById('span' + index)
        btn.addEventListener('click', () => {
            document.getElementById('showHashtags').innerHTML = ""
            document.getElementById('searchInput').value = text.textContent.substring(1)
            search()
        })

    }
}

//Esta funcion permite realizar la busqueda desde la barra
function search() {
    let container = document.getElementById("resultContainer")
    container.innerHTML = ""
    noMostrar('searchSuggestions')
    noMostrar('suggestions')
    noMostrar('trending')
    let searchValue = document.getElementById("searchInput").value
    if (searchValue != "") {
        saveSearchHistory(searchValue)
    }
    document.getElementById('results').style.display = "block"
    fetch(searchUrl + "&q=" + searchValue + "&limit=24")
        .then(response => response.json())
        .then(json => {
            let results = []
            results = json.data
            crearContenidoSearch(results, container)
            showHashtags()
        })
        .catch(error => console.log(error))
}

function crearContenidoSearch(results, container) {
    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        let addDiv = document.createElement("div")
        addDiv.className += "gifResult"
        let addFigure = document.createElement("figure")
        let addFigCaption = document.createElement("figcaption")
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
}

function noMostrar(id) {
    document.getElementById(id).style.display = 'none'
}

