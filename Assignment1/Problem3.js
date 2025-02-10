// Initialize an array of city weather objects
let weatherData = [
  { cityName: "New York", temperature: 25, condition: "Sunny" },
  { cityName: "London", temperature: 15, condition: "Cloudy" },
  { cityName: "Tokyo", temperature: 30, condition: "Sunny" },
];

// Function to render weather summary
const renderWeatherSummary = () => {
  const weatherSummary = document.getElementById('weatherSummary');
  weatherSummary.innerHTML = ''; // Clear previous weather summary

  weatherData.forEach(({ cityName, temperature, condition }) => {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-item');
    weatherItem.innerHTML = `City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}`;
    weatherSummary.appendChild(weatherItem);
  });
};

// Add City Weather: Function to add a new city weather object
const addCityWeather = () => {
  const cityName = document.getElementById('cityName').value;
  const temperature = parseFloat(document.getElementById('temperature').value);
  const condition = document.getElementById('condition').value;

  if (cityName && !isNaN(temperature) && condition) {
    const newCityWeather = { cityName, temperature, condition };
    weatherData.push(newCityWeather);
    renderWeatherSummary();  // Re-render the weather summary
  } else {
    alert('Please fill out all fields correctly.');
  }
};

// Find Hottest City: Function to find the city with the highest temperature
const findHottestCity = () => {
  const hottestCity = weatherData.find(city => city.temperature === Math.max(...weatherData.map(city => city.temperature)));
  
  const hottestCityElement = document.getElementById('hottestCity');
  
  // Destructuring to extract city details
  const { cityName, temperature, condition } = hottestCity;
  hottestCityElement.innerHTML = `City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}`;
};

// Filter by Condition: Function to filter cities by weather condition
const filterByCondition = () => {
  const conditionToFilter = document.getElementById('filterCondition').value.toLowerCase();
  const filteredCities = weatherData.filter(city => city.condition.toLowerCase() === conditionToFilter);

  // Clear the current weather summary and render filtered cities
  const weatherSummary = document.getElementById('weatherSummary');
  weatherSummary.innerHTML = '';

  filteredCities.forEach(({ cityName, temperature, condition }) => {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-item');
    weatherItem.innerHTML = `City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}`;
    weatherSummary.appendChild(weatherItem);
  });
};

// Initially render the weather summary
renderWeatherSummary();

// Show the hottest city on page load
findHottestCity();
