// AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0
  
// Отримуємо форму пошуку
var searchForm = document.getElementById('search-form');

var saveQueryBtn = document.getElementById('save-query-btn');
var savedQueriesContainer = document.getElementById('saved-queries');

// Отримуємо поле пошуку
const searchInput = document.getElementById('search-query');

// Додаємо обробник події focus до поля пошуку
searchInput.addEventListener('focus', function() {
  // Очищуємо значення поля пошуку
  this.value = '';
});


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchVideos();

  
});

saveQueryBtn.addEventListener('click', function() {
  saveQuery();
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

function saveQuery() {
  var query = document.getElementById('search-query').value;

  if (query.trim() !== '') {
    var savedQueryButton = document.createElement('button');
    savedQueryButton.classList.add('saved-query-button');
    savedQueryButton.innerText = query;
    savedQueryButton.addEventListener('click', function() {
      document.getElementById('search-query').value = query;
      searchVideos();
    });

    savedQueriesContainer.appendChild(savedQueryButton);
  }
}