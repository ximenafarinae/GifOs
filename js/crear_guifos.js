const form = new FormData();
const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
const gifByIdUrl = `https://api.giphy.com/v1/gifs/`
const gifIds = []
let recorder;


function initRecorder() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, video: { height: 432, width: 830 }
    }).then(function (stream) {
        video = document.getElementById('stream')
        video.srcObject = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240
        });
    })
    // .catch(error => console.log(error))
}

function stopVideo() {
    cameraOff()
    document.getElementById('checkCapture').style.display = 'none'
    document.getElementById('recordBtns').style.display = ''
    document.getElementById('preview').style.display = 'block'
    document.getElementById('uploadOrRepeatBtns').style.display = 'grid'
    recorder.stopRecording(function () {
        form.append('file', recorder.getBlob(), 'myGif.gif');
        let objectURL = URL.createObjectURL(recorder.getBlob())
        let gifImg = document.createElement('img')
        gifImg.src = objectURL
        let gifPreview = document.getElementById('gifPreview')
        gifPreview.innerHTML = ""
        gifPreview.appendChild(gifImg)
    })
    move('myBar')

}

function cameraOff() {
    let stream = document.getElementById('stream').srcObject
    if (stream != null) {
        stream.getTracks().forEach(track => {
            track.stop();
        })
    }


}

function volver() {
    let boton = document.getElementById('cancell')
    boton.addEventListener("click", () => {
        window.history.back();
    });
}

function upload() {
    document.getElementById('captureTwo').style.display = 'none'
    document.getElementById('captureFive').style.display = 'grid'
    document.getElementById('preview').style.display = 'none'
    document.getElementById('previewUpload').style.display = 'block'
    fetch(uploadUrl, {
        method: 'POST',
        body: form,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(json => {
            let gifId = json.data.id
            saveGifId(gifId)
            uploadTime()
        })
    // .catch(error => console.log(error))

}

function uploadTime() {
    document.getElementById('captureFive').style.display = "none"
    document.getElementById('captureSix').style.display = "grid"
    let objectURL = URL.createObjectURL(recorder.getBlob())
    let gifImg = document.createElement('img')
    gifImg.src = objectURL
    let gifPreview = document.getElementById('miniPreview')
    gifPreview.innerHTML = ""
    gifPreview.appendChild(gifImg)
    document.getElementById('sectionMisGuifos').style.display = "grid"
}

//Oculta el div de instrucciones y muestra el div de capturas
function comenzar() {
    document.getElementById('captureOne').style.display = "none"
    document.getElementById('sectionMisGuifos').style.display = "none"
    document.getElementById('captureTwo').style.display = "block"
    initRecorder();
}

function capturar() {
    document.getElementById('captureBtns').style.display = 'none'
    document.getElementById('check').style.display = 'none'
    document.getElementById('checkCapture').style.display = 'block'
    document.getElementById('recordBtns').style.display = 'grid'
    recorder.startRecording();
}
function repetirCaptura() {
    document.getElementById('uploadOrRepeatBtns').style.display = 'none'
    document.getElementById('captureBtns').style.display = 'grid'
    let container = document.getElementById('gifPreview')
    container.innerHTML = ''
    let video = document.createElement('video')
    video.id = 'stream'
    container.appendChild(video)
    initRecorder();
}

function cancelar() {
    let confirmacion = confirm('Desea cancelar la accion?')
    if (confirmacion == true) {
        recorder.destroy()
        document.location.href = 'crear_guifos.html'
    }

}

function getUrl() {
    let gifId = getGifIds().pop()
    if (gifId === "") {
        return
    }
    fetch(gifByIdUrl + gifId + `?api_key=${apiKey}`)
        .then(response => response.json())
        .then((json) => {
            result = JSON.stringify(json.data.url)
            console.log(result)
            let input = document.createElement('input')
            input.classList.add('transparent')
            input.value = result
            document.getElementById('captureSix').appendChild(input)
            var range = document.createRange();
            range.selectNode(input);
            window.getSelection().addRange(range);
            try {
                var resultado = document.execCommand('copy');
            } catch (err) {
                console.log('ERROR al intentar copiar la url');
            }
            window.getSelection().removeAllRanges()
        })
        .catch((err) => {
            console.log('ERROR al intentar copiar la url');
        })


}

function download() {
    let blob = recorder.getBlob();
    invokeSaveAsDialog(blob)
}

function darkTheme() {
    let tema = localStorage.getItem('tema')
    if (tema == 1) {
        let logo = document.getElementById('logo')
        logo.src = 'assets/gifOF_logo_dark.png'
        let camera = document.getElementById('camera')
        camera.src = 'assets/camera_light.svg'
        changeStylesheetNight()
    }
}
var i = 0
function move(idBar) {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById(idBar);
        var width = 1;
        var id = setInterval(frame, 40);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}


darkTheme();
getMisGuifos();

