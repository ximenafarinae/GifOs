function saveGifId(gifId) {
    let gifIds = JSON.parse(localStorage.getItem('gifIds'))
    gifIds.push(gifId)
    localStorage.setItem('gifIds', JSON.stringify(gifIds))
}

function getGifIds() {
    return JSON.parse(localStorage.getItem('gifIds'));
}

function initGifIds() {
    let gifIds = JSON.parse(localStorage.getItem('gifIds'))
    if(gifIds === null) {
        gifIds = []
    }

    localStorage.setItem('gifIds', JSON.stringify(gifIds))
}

function saveSearchHistory(searchData) {
    let searchHData = JSON.parse(localStorage.getItem('searchHData'))
    for (let index = 0; index < searchHData.length; index++) {
        if (searchData == searchHData[index]) {
            return searchData
        }  
    }
    searchHData.push(searchData)
    localStorage.setItem('searchHData', JSON.stringify(searchHData))
}

function getSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHData'));
}

function initSearchHistory() {
    let searchHData = JSON.parse(localStorage.getItem('searchHData'))
    if(searchHData === null) {
        searchHData = []
    }

    localStorage.setItem('searchHData', JSON.stringify(searchHData))
}

initSearchHistory()
initGifIds()