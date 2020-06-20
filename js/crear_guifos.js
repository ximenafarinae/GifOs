const form = new FormData();
let recorder;

function initRecorder() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, video: { height: { exact: 434 } }, width: { exact: 832 }
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
}

function stop() {
    document.getElementById('checkCapture').style.display = 'none'
    document.getElementById('recordBtns').style.display = ''
    document.getElementById('preview').style.display = 'block'
    document.getElementById('uploadOrRepeatBtns').style.display = 'grid'
    recorder.stopRecording(function () {
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'))
        document.getElementById('stream')
    });

}
const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
let gifIds = []
function upload() {
    document.getElementById('captureTwo').style.display = 'none'
    document.getElementById('captureFive').style.display = 'grid'
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
            gifIds.push(results.id)
            console.log(gifId)
            localStorage.setItem('recordedGifId', gifIds);
        })
}

//Oculta el div de instrucciones y muestra el div de capturas
function comenzar() {
    document.getElementById('captureOne').style.display = "none"
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
