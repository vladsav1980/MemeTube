

// var apiKey = 'AIzaSyC2VPl0djicrfyLku1xK-jax8aIcQ9hhFg';
var apiKey = ['AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0', 'AIzaSyC2VPl0djicrfyLku1xK-jax8aIcQ9hhFg'];

var searchForm = document.getElementById('search-form');




document.addEventListener('DOMContentLoaded', function() {
  
  searchVideos('українські меми', 11, false);  
});





function searchVideos(query, maxResults, initialDisplay) {
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResults + '&q=' + query + '&key=' + apiKey[Math.round(Math.random())];

  var xhr = new XMLHttpRequest();
  xhr.open('GET', requestUrl, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      displaySearchResults(response.items, initialDisplay);
    } else {
      console.log('Request failed. Status: ' + xhr.status);
    }
  };
  xhr.send();
}

function displaySearchResults(results, initialDisplay1) {
  var resultsContainer = document.getElementById('search-results');
  

  if (initialDisplay1 == true) {
    var video = results[1];

    var videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = '<h3>' + video.snippet.title +  '</h3>' +
      '<iframe width="560" height="315" src="https://img.youtube.com/vi/' + video.id.videoId + '/maxresdefault.jpg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    resultsContainer.appendChild(videoElement);
  }

  else {
    resultsContainer.innerHTML = '';
  for (var i = 1; i < results.length; i++) {
    var video = results[i];

    var videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = '<h3>' + video.snippet.title +  '</h3>' +
      '<iframe width="560" height="315" src="https://img.youtube.com/vi/' + video.id.videoId + '/maxresdefault.jpg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    resultsContainer.appendChild(videoElement);
  }
  
}


}
