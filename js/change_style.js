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
  style.href = '/styles/css/style.css'
}