import React from "react";
import "./WeatherSelectionLayout.css";

export interface WeatherSelectionProps {
    weathers: string[];
    selectedWeather: string;
    setWeather: (weather: string) => void;
}

const WeatherSelectionLayout = (props: WeatherSelectionProps) => {
    const { weathers, selectedWeather, setWeather } = props;

    return (
        <div className="weather-selection">
            <label className="weather-label">날씨</label>
            <div className="weather-options">
                {weathers.map((weather, index) =>
                    WeatherOption(weather, selectedWeather, setWeather, index)
                )}
            </div>
            <p className="selected-weather">
                Selected Weather: {selectedWeather}
            </p>
        </div>
    );
};

const getWeatherIcon = (weather: string) => {
    try {
        return require(`../icon/weather/${weather}.png`);
    } catch (error) {
        return require("../icon/weather/default.png");
    }
};

const WeatherOption = (
    weather: string,
    selectedWeather: string,
    setWeather: (weather: string) => void,
    index: number
) => (
    <div
        className={`weather-option ${
            selectedWeather === weather ? "selected" : ""
        }`}
        key={index}
        onClick={() => setWeather(weather)}
    >
        <img
            src={getWeatherIcon(weather)}
            alt={weather}
            className="weather-icon"
        />
        <label className="weather-option-label">{weather}</label>
    </div>
);

export default WeatherSelectionLayout;
