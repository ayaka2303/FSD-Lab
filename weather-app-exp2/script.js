
const RAW_API_KEY = 'e8687d759b59173bf2c6bc3513364ca8';
const API_KEY = RAW_API_KEY.trim(); 

const weatherInfoDiv = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

async function getWeatherData(city) {
  weatherInfoDiv.innerHTML = '<p>Loading weather data... ⏳</p>';

  const cityParam = encodeURIComponent(city.trim());
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&appid=${API_KEY}&units=metric`;

  console.log('[Weather] Fetching:', apiUrl); 

  try {
    const response = await fetch(apiUrl);

    
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const cod = body?.cod ?? response.status;
      const message = body?.message ?? response.statusText ?? 'Unknown error';
      throw new Error(`${cod}: ${message}`);
    }

    displayWeather(body);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    let errorMessage = 'Failed to fetch weather data. Please try again.';

    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('401') || msg.includes('invalid api key')) {
      errorMessage = 'API key invalid or not active yet. Double‑check it (and give it up to ~1 hour after creating).';
    } else if (msg.includes('404') || msg.includes('city not found')) {
      errorMessage = 'City not found. Please check the spelling and try again.';
    } else if (msg.includes('network') || msg.includes('cors')) {
      errorMessage = 'Network/CORS issue. Try running from a local server (not file://) or check your connection.';
    } else if (msg.includes('limit')) {
      errorMessage = 'Rate limit reached. Wait a bit and try again.';
    }

    weatherInfoDiv.innerHTML = `<p class="error-message">${errorMessage} 😔</p>`;
  }
}

function displayWeather(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  weatherInfoDiv.innerHTML = `
    <h2>${cityName}, ${country}</h2>
    <p class="temp">${temperature}°C</p>
    <p>${formattedDescription}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    weatherInfoDiv.innerHTML = '<p class="error-message">Please enter a city name! 💡</p>';
  }
});

cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') getWeatherBtn.click();
});

window.onload = () => {
  weatherInfoDiv.innerHTML = '<p>Enter a city name and click "Get Weather" to see the current conditions.</p>';
};
