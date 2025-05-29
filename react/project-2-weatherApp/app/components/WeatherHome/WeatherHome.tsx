import React from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";
const sampleData = {
  currentCity: {
    date: "23 July, Sunday 12:00",
    city: "Sydney",
    currentTemp: "27",
    minTemp: "28",
    maxTemp: "32",
    weather: "sunny",
    water: "85%",
    wind: "9km/h",
    uv: "75ug",
    something: "26",
  },
  forecast: [
    {
      id: "0",
      day: "Monday",
      date: "24 July",
      weather: "cloudy",
      minTemp: "20",
      maxTemp: "25",
    },
    {
      id: "1",
      day: "Monday",
      date: "24 July",
      weather: "cloudy",
      minTemp: "20",
      maxTemp: "25",
    },
    {
      id: "2",
      day: "Monday",
      date: "24 July",
      weather: "cloudy",
      minTemp: "20",
      maxTemp: "25",
    },
    {
      id: "3",
      day: "Monday",
      date: "24 July",
      weather: "cloudy",
      minTemp: "20",
      maxTemp: "25",
    },
  ],
  otherCities: [
    {
      id: "0",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "1",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "2",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "3",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
  ],
};

type Props = {};

const WeatherHome = (props: Props) => {
  return (
    <main>
      <div className="all-conainer flex w-200   gap-x-0.5 my-8 bg-zinc-100 m-auto p-3 rounded-lg">
        <div className="left-container flex flex-col current-weather bg-indigo-500 rounded-lg text-white w-1/3 text-center p-3 mr-6">
          <p className="text-left text-sm mb-3">
            {sampleData.currentCity.date}
          </p>
          <p className="text-xl mb-4">{sampleData.currentCity.city}</p>
          <p className="text-6xl mb-1">{sampleData.currentCity.currentTemp}</p>
          <p className="text-xl mb-2 font-light">
            {sampleData.currentCity.minTemp +
              "~" +
              sampleData.currentCity.maxTemp +
              "\u00B0"}
          </p>
          <div className="weather-icon-contaienr flex justify-center items-center">
            <TiWeatherSunny className="w-24 h-24" />
          </div>
          <div className="wiget-container mt-auto flex justify-around rounded-lg p-2 bg-slate-300 text-black gap-x-2">
            <div className="wiget flex flex-col items-center justify-center ">
              <WiHumidity className="wiget-icon w-6 h-6" />
              <p className="wiget-content text-sm">
                {sampleData.currentCity.water}
              </p>
            </div>
            <div className="wiget w-fit text-nowrap wiget flex flex-col items-center justify-center ">
              <FaWind className="wiget-icon w-6 h-6 " />
              <p className="wiget-content text-sm">
                {sampleData.currentCity.wind}
              </p>
            </div>
            <div className="wiget flex flex-col items-center justify-center ">
              <TbUvIndex className="wiget-icon w-6 h-6" />

              <p className="wiget-content text-sm">
                {sampleData.currentCity.uv}
              </p>
            </div>
            <div className="wiget flex flex-col items-center justify-center ">
              <FaTemperatureHalf className="wiget-icon w-6 h-6" />
              <p className="wiget-content text-sm">
                {sampleData.currentCity.something + "\u00B0"}
              </p>
            </div>
          </div>
        </div>
        <div className="right-container flex flex-col max-w place-content-between">
          <div className="forecast-container flex justify-evenly ">
            {sampleData.forecast.map((item) => (
              <div className="forecast-card flex flex-col p-3" key="{item.id}">
                <p className="font-semibold text-2xl mb-1">{item.day}</p>
                <p className="text-sm text-center text-shadow-lg">
                  {item.date}
                </p>
                <div className="mb-1 flex justify-center">
                  <TiWeatherSunny className="w-24 h-24" />
                </div>
                <p className="text-sm text-center">
                  {item.minTemp + "~" + item.maxTemp}
                </p>
              </div>
            ))}
          </div>
          <div className="cities-container mb-2 flex flex-col">
            <div className="search-bar bg-white flex gap-1 shadow-md w-50% mr-auto rounded-md">
              <input
                className="grow-1 max-w-70% pl-3"
                type="text"
                placeholder=" search for a city"
              />
              <button
                className="grow-0 p-1 bg-indigo-500 rounded-md m-2 pl-2 pr-2 text-white"
                aria-label="Search"
              >
                Search
              </button>
            </div>
            <div className="cities-view flex justify-around">
              {sampleData.otherCities.map((item) => (
                <div className="city-card flex flex-col justify-center items-center p-2">
                  <TiWeatherSunny className="w-12 h-12" />
                  <p>{item.city}</p>
                  <p>{item.minTemp + "~" + item.maxTemp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WeatherHome;
