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
    document.getElementById('searchSuggestions').style.display = 'none'

}
function showHashtags() {
    let container = document.getElementById('showHashtags')
    container.style.display = 'grid'
    for (let index = 0; index < 3; index++) {
        let result = document.getElementById('resultName' + index)
        let box = document.createElement('div')
        let span = document.createElement('span')
        box.classList.add('searchTags')
        container.appendChild(box)
        box.appendChild(span)
        span.textContent = '#' + result.textContent
    }
}

//Esta funcion permite realizar la busqueda desde la barra
function search() {
    let container = document.getElementById("resultContainer")
    container.innerHTML = ""
    document.getElementById('searchSuggestions').style.display = 'none'
    document.getElementById('suggestions').style.display = 'none'
    document.getElementById('trending').style.display = 'none'
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
            showHashtags()
        })
        .catch(error => console.log(error))
}

