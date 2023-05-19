// AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0
  
// Отримуємо форму пошуку
var searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchVideos();
});

function searchVideos() {
  var query = document.getElementById('search-query').value;
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + query + '&key=AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', requestUrl, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      displaySearchResults(response.items);
    } else {
      console.log('Request failed. Status: ' + xhr.status);
    }
  };
  xhr.send();
}

function displaySearchResults(results) {
  var resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  for (var i = 0; i < results.length; i++) {
    var video = results[i];

    var videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = '<h3>' + video.snippet.title + '</h3>' +
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video.id.videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    resultsContainer.appendChild(videoElement);
  }
}
