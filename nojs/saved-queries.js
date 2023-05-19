// Отримуємо елемент контейнера для збережених запитів
var savedQueriesContainer = document.getElementById('saved-queries');

// Завантажуємо збережені запити з локального сховища
var savedQueries = JSON.parse(localStorage.getItem('savedQueries')) || [];

// Завантажуємо збережені запити під час завантаження сторінки
document.addEventListener('DOMContentLoaded', loadSavedQueries);

// Зберігаємо новий запит
function saveQuery() {
  var query = document.getElementById('search-query').value;

  if (query.trim() !== '') {
    // Перевіряємо, чи запит вже збережений
    if (!savedQueries.includes(query)) {
      savedQueries.push(query);
      localStorage.setItem('savedQueries', JSON.stringify(savedQueries));

      // Створюємо кнопку для збереженого запиту
      var savedQueryButton = createSavedQueryButton(query);

      // Додаємо кнопку до контейнера збережених запитів
      savedQueriesContainer.appendChild(savedQueryButton);
    }
  }
}

// Видаляємо збережений запит
function removeSavedQuery(query) {
  var queryIndex = savedQueries.indexOf(query);

  if (queryIndex !== -1) {
    savedQueries.splice(queryIndex, 1);
    localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
  }
}

// Створюємо кнопку для збереженого запиту
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
    searchVideos();
  });

  return savedQueryButton;
}

// Завантажуємо збережені запити під час завантаження сторінки
function loadSavedQueries() {
  for (var i = 0; i < savedQueries.length; i++) {
    var query = savedQueries[i];

    var savedQueryButton = createSavedQueryButton(query);

    savedQueriesContainer.appendChild(savedQueryButton);
  }
}
