
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

initGifIds();