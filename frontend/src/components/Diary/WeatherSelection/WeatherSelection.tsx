import React from 'react';
import './WeatherSelection.css';

interface Props {
  weathers: string[];
  selectedWeather: string;
  setWeather: (weather: string) => void;
}

const WeatherSelection = (props: Props) => {
  const { weathers, selectedWeather, setWeather } = props;
  
  const handleWeatherChange = (weather: string) => {
    setWeather(weather);
  };

  const getWeatherIcon = (weather: string) => {
    try {
      return require(`../icon/weather/${weather}.png`);
    } catch (error) {
      return require('../icon/weather/default.png');
    }
  };

  return (
    <div className="weather-selection">
      <label className='weather-label'>날씨</label>
      <div className="weather-options">
        {weathers.map((weather, index) => (
          <div
            className={`weather-option ${selectedWeather === weather ? 'selected' : ''}`}
            key={index}
            onClick={() => handleWeatherChange(weather)}
          >
            <img
              src={getWeatherIcon(weather)}
              alt={weather}
              className="weather-icon"
            />
            <label className='weather-option-label'>{weather}</label>
          </div>
        ))}
      </div>

      <p className="selected-weather">Selected Weather: {selectedWeather}</p>
    </div>
  );
};

export default WeatherSelection;
