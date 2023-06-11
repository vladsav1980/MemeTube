

// var apiKey = 'AIzaSyC2VPl0djicrfyLku1xK-jax8aIcQ9hhFg';
var apiKey = 'AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0';

var searchForm = document.getElementById('search-form');
var savedQueriesContainer = document.getElementById('saved-queries');
var savedQueries = [];

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchAndSaveQuery();
});

document.addEventListener('DOMContentLoaded', function() {
  loadSavedQueries();
  displayInitialSearchResults();  
});



function searchAndSaveQuery() {
  var query = document.getElementById('search-query').value;

  if (query.trim() !== '') {
    searchVideos(query, 11, false);
    saveQuery(query);
    document.getElementById('search-query').value = '';
  }
}

function searchVideos(query, maxResults, initialDisplay) {
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResults + '&q=' + query + '&key=' + apiKey;

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
    videoElement.innerHTML = '<h3>' + video.snippet.title + '</h3>' +
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video.id.videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    resultsContainer.appendChild(videoElement);
  }

  else {
    resultsContainer.innerHTML = '';
  for (var i = 1; i < results.length; i++) {
    var video = results[i];

    var videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = '<h3>' + video.snippet.title + '</h3>' +
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video.id.videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    resultsContainer.appendChild(videoElement);
  }
}

  
}

function saveQuery(query) {
  if (query.trim() !== '') {
    if (!savedQueries.includes(query)) {
      savedQueries.push(query);
      localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
      var savedQueryButton = createSavedQueryButton(query);
      savedQueriesContainer.insertBefore(savedQueryButton, savedQueriesContainer.firstChild);
      limitSavedQueries();
    }
  }
}

function removeSavedQuery(query) {
  var savedQueryButtons = savedQueriesContainer.getElementsByClassName('saved-query-button');

  for (var i = 0; i < savedQueryButtons.length; i++) {
    var button = savedQueryButtons[i];
    if (button.innerText === query) {
      savedQueriesContainer.removeChild(button);
      break;
    }
  }
}

function loadSavedQueries() {
  savedQueries = JSON.parse(localStorage.getItem('savedQueries')) || [];

  for (var i = savedQueries.length - 1; i >= 0; i--) {
    var query = savedQueries[i];
    var savedQueryButton = createSavedQueryButton(query);
    savedQueriesContainer.appendChild(savedQueryButton);
  }
}

function limitSavedQueries() {
  if (savedQueries.length > 20) {
    var buttonsToRemove = savedQueries.length - 20;

    for (var i = 0; i < buttonsToRemove; i++) {
      var query = savedQueries[i];
      removeSavedQuery(query);
      savedQueriesContainer.removeChild(savedQueriesContainer.lastChild);
    }
  }
}

function displayInitialSearchResults() {
  for  (var i = savedQueries.length - 1; i >= 0; i--) {
    var query = savedQueries[i];
    searchVideos(query, 2, true);
  }
}

