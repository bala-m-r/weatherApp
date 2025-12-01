import { useState } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'Your_API_KEY'; // Replace with your actual API key from https://www.weatherapi.com/
  const API_URL = 'https://api.weatherapi.com/v1/current.json';

  const handleSearch = async () => {
    if (!cityName.trim()) {
      return;
    }

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${encodeURIComponent(cityName)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      // Check if API returned an error in the response
      if (data.error || !data.current) {
        throw new Error('Failed to fetch weather data');
      }
      
      setWeatherData(data);
    } catch (error) {
      alert('Failed to fetch weather data');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>Weather App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="city-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {loading && <p className="loading-message">Loading data...</p>}
      </div>

      {weatherData && weatherData.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p className="weather-value">{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p className="weather-value">{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p className="weather-value">{weatherData.current.condition?.text || 'N/A'}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p className="weather-value">{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
