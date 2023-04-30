$.support.cors = true;

// Отримуємо форму пошуку
const searchForm = document.getElementById('search-form');


searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми
  searchVideos(); // Виконуємо пошук відео
});

function searchVideos() {
  // Отримуємо значення запиту з поля введення
  const query = document.getElementById('search-query').value;
  
  // Виконуємо запит до YouTube Data API з використанням ключа API та введеного запиту
  const requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + query + '&key=AIzaSyDPEmTC6Rxdg8emogFoROj6LXtELKOThw0';
  
  // Виконуємо запит Ajax
  $.ajax({
    url: requestUrl,
    type: 'GET',
    success: function(data) {
      // Виконуємо обробку результатів пошуку
      const results = data.items;
      displaySearchResults(results);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}



// Функція для відображення результатів пошуку на сторінці
function displaySearchResults(results) {
  // Отримуємо контейнер для результатів пошуку
  const resultsContainer = document.getElementById('search-results');
  
  // Очищуємо контейнер
  resultsContainer.innerHTML = '';
  
  // Проходимось по всіх відео з результатів пошуку та відображаємо їх на сторінці
  for (let i = 0; i < results.length; i++) {
    const video = results[i];
    
    // Створюємо HTML елемент для відображення відео
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `;
    
    // Додаємо обробник подій до елемента відео, щоб відтворити відео при кліку на нього
    videoElement.addEventListener('click', function() {
      const iframe = this.querySelector('iframe');
      const videoUrl = iframe.src;
      const newUrl = videoUrl + '?autoplay=1';
      iframe.src = newUrl;
    });

   
	// Додаємо елемент відео до контейнера результатів пошуку
		resultsContainer.appendChild(videoElement);
		}
	}