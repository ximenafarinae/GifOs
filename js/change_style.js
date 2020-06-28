function getDark() {
  let theme = localStorage.getItem('tema')
  if (theme === 1) {
    changeStylesheetNight()
  } else {
    changeStylesheetDay()
  }

}
function changeStylesheetNight() {
  let style = document.getElementById('day')
  style.href = 'styles/css/darkMode.css'
}
function changeStylesheetDay() {
  let style = document.getElementById('day')
  style.href = 'styles/css/style.css'
}


//Esta funcion permite hacer el cambio a modo oscuro
function nightMode() {
  localStorage.setItem('tema', 1)
  changeStylesheetNight()
  elementsInNightMode()
}

function getDark() {
  let tema = localStorage.getItem('tema')
  if (tema == 1) {
    changeStylesheetNight()
    elementsInNightMode()
  }

}

function elementsInNightMode() {
  let logo = document.getElementById('logo')
  logo.src = 'assets/gifOF_logo_dark.png'
  let lupa = document.getElementById('lupa')
  lupa.src = 'assets/lupaDark.svg'
  var input = document.getElementById("searchInput")
  input.addEventListener('input', () => {
    lupa.src = 'assets/lupa_light.svg'
    event.stopPropagation()
  })
}


function dayMode() {
  localStorage.setItem('tema', 2)
  changeStylesheetDay()
  elementsInDayMode()
}

function elementsInDayMode() {
  let logo = document.getElementById('logo')
  logo.src = 'assets/gifOF_logo.png'
  let lupa = document.getElementById('lupa')
  lupa.src = 'assets/lupa_inactive.svg'
  var input = document.getElementById("searchInput")
  input.addEventListener('input', () => {
    lupa.src = 'assets/lupa.svg'
    event.stopPropagation()
    console.log(lupa.src)

  })
}

let lupa = document.getElementById('lupa')
  lupa.src = 'assets/lupa_inactive.svg'
  var input = document.getElementById("searchInput")
  input.addEventListener('input', () => {
    lupa.src = 'assets/lupa.svg'
    event.stopPropagation()
    console.log(lupa.src)

  })