const apiKey = "mbqOaa1Di4W2ZDeaGsjK5COdrFxzvWSL";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=4`;
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropBtn() {
    document.getElementById("themes").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
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

 

function search() {
    let searchValue = document.getElementById("searchInput").value;
    fetch(searchUrl + "&q=" + searchValue)
        .then(response => response.json())
        .then(json => {
            let searchResults = document.getElementById("searchResults");
            var html = "";
            json.data.forEach(result => {
                console.log(result)
                html = html + `<img src="${result.images.preview_gif.url}"></img>`
            });
            searchResults.innerHTML = html;
        })
}


/* fetch(trendingUrl)
    .then(response => response.json())
    .then(json => {
        let trend = document.getElementById("trend");
        trend.innerHTML = `<p>#${json.data[0].user.display_name}</p>`;
    })

    .catch(error => console.log(error)); */



