window.addEventListener('DOMContentLoaded', function() {
  loadSavedQueries();
});

function loadSavedQueries() {
  var savedQueries = localStorage.getItem('savedQueries');

  if (savedQueries) {
    savedQueries = JSON.parse(savedQueries);

    for (var i = 0; i < savedQueries.length; i++) {
      var query = savedQueries[i];

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
}

function saveQuery() {
  var query = document.getElementById('search-query').value;

  if (query.trim() !== '') {
    var savedQueries = localStorage.getItem('savedQueries');

    if (savedQueries) {
      savedQueries = JSON.parse(savedQueries);
    } else {
      savedQueries = [];
    }

    savedQueries.push(query);
    localStorage.setItem('savedQueries', JSON.stringify(savedQueries));

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
