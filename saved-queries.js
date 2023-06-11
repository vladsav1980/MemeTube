var savedQueriesContainer = document.getElementById('saved-queries');
var savedQueries = [];

function saveQuery() {
  var query = document.getElementById('search-query').value;

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
  var queryIndex = savedQueries.indexOf(query);

  if (queryIndex !== -1) {
    savedQueries.splice(queryIndex, 1);
    localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
  }
}

function createSavedQueryButton(query) {
  var savedQueryButton = document.createElement('button');
  savedQueryButton.classList.add('saved-query-button');
  savedQueryButton.innerText = query;

  var removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.innerText = 'x';
  removeButton.addEventListener('click', function(event) {
    event.stopPropagation();
    removeSavedQuery(query);
    savedQueriesContainer.removeChild(savedQueryButton);
  });

  savedQueryButton.appendChild(removeButton);

  savedQueryButton.addEventListener('click', function() {
    document.getElementById('search-query').value = query;
    searchAndSaveQuery();
  });

  return savedQueryButton;
}



