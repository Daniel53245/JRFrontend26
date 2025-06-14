import React, { useEffect, useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";
import { getWeather, getMiniCityWeather } from "../../services/weatherAPI"
import type { response } from "../../services/weatherAPI"
import { formatUTCString, mapResponseToForecast } from "./utils"
import { WiBarometer, WiNa, WiDaySunny, WiDayCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiSprinkle } from "react-icons/wi";
console.log("WeatherHome component loaded");
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
      id: "4",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "5",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "6",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
    {
      id: "7",
      city: "Melbourne",
      weather: "sunny",
      minTemp: "25",
      maxTemp: "32",
    },
  ],
};
const majorCities = ["Sydney", "New York", "Paris", "BeiJing"];

enum WeatherType {
  CLEAR = "Clear",
  CLOUDS = "Clouds",
  RAIN = "Rain",
  SNOW = "Snow",
  THUNDERSTORM = "Thunderstorm",
  DRIZZLE = "Drizzle",
  MIST = "Mist",
}

const getWeatherIcon = (weather: WeatherType, size: 6 | 12 | 24) => {
  //TODO: return weather icon accoridng to type of weather 
  // var tailwindClass = `w-${width} h-${height}` tail wind does not work with dynamic values
  //create a record for it 
  const sizeClasses = {
    6: 'w-6 h-6',
    12: 'w-12 h-12',
    24: 'w-24 h-24',
  };
  const tailwindClass = sizeClasses[size] || 'w-6 h-6'; // default to 6 if not found
  switch (weather) {
    case WeatherType.CLEAR:
      return (<WiDaySunny className={tailwindClass}></WiDaySunny>)
    case WeatherType.CLOUDS:
      return (<WiDayCloudy className={tailwindClass}></WiDayCloudy>)
    case WeatherType.RAIN:
      return (<WiRain className={tailwindClass}></WiRain>)
    case WeatherType.SNOW:
      return (<WiSnow className={tailwindClass}></WiSnow>)
    case WeatherType.THUNDERSTORM:
      return (<WiThunderstorm className={tailwindClass}></WiThunderstorm>)
    case WeatherType.DRIZZLE:
      return (<WiSprinkle className={tailwindClass}></WiSprinkle>)
    case WeatherType.MIST:
      return (<WiFog className={tailwindClass}></WiFog>)
    default:
      return <p>Icon not included</p>
  }
}

type Props = {};

const WeatherHome = (props: Props) => {
  const [weatherData, setWeatherData] = useState<response>();
  const [fetchDataError, setfetchDataError] = useState("OK");
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [targetCity, setTargetCity] = useState("Sydney");
  const [otherCities, setOtherCities] = useState<any[]>([]);
  const isLoadingOtherCities = otherCities.length === 0;
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  };
  const fetchData = async () => {
    try {
      const result = await getWeather(targetCity);
      setWeatherData(result)
      console.log("Weather result from weather home \n", result)
      setIsFetchingData(false);
    } catch (error) {
      console.error("Error while fetching weather:", error);
      setfetchDataError(String(error))
      setIsFetchingData(false);
    };
  };
  const fetchOtherCities = async () => {
    const cityNames = ["London", "New York", "BeiJing", "Melboune"];
    const results = await Promise.all(
      cityNames.map((name, index) => getMiniCityWeather(name, index + 4))
    );
    setOtherCities(results.filter((r) => r !== null));
  };
  //fetch weather data 
  useEffect(
    () => {
      console.log("Fetching weather data for target city: ", targetCity);
      setIsFetchingData(true);
      setfetchDataError("OK");
      fetchOtherCities();
      fetchData();
    },
    []
  )

  // set differnet city 
  useEffect(() => {
    console.log("Target city changed to: ", targetCity);
    setIsFetchingData(true);
    fetchData();
  }, [targetCity])

  if (isFetchingData) {
    //TODO: add a toast for loading do not just show a heading
    return (<h1>Getting Weather Data</h1>)
  }
  if (isFetchingData === false && fetchDataError !== "OK") {
    return (
      <>
        <h1 className="">Error Fetching error data</h1>
        <p>Error message /n {fetchDataError.toString()}</p>
      </>
    )
  }
  if (!weatherData) {
    return (
      <h1 className="text-red-500">Error fetching weather data and not catched</h1>
    )
  }

  const foreCastData = mapResponseToForecast(weatherData);


  return (
    <main>

      <div className="all-conainer flex w-200   gap-x-0.5 my-8  m-auto p-3 rounded-lg">
        <div className="left-container flex flex-col current-weather bg-indigo-500 rounded-lg text-white w-1/3 text-center p-3 mr-6">
          {/* TODO dd mm weekday time this is utc time */}
          <p className="text-left text-sm mb-3">
            {formatUTCString(weatherData.list[0].dt)}
          </p>
          {/* //TODO City name */}
          <p className="text-xl mb-4">{weatherData.city.name === "" ? "Sydney" : weatherData.city.name}</p>
          {/* //TODO current temperature  */}
          <p className="text-6xl mb-1">
            {weatherData.list[0].main.temp.toFixed()} <span className="text-3xl">&#8451;</span>
          </p>
          <p className="text-xl mb-2 font-light">
            {/* //TODO min temperature and max temperature */}
            {weatherData.list[0].main.temp_min.toFixed() +
              "~" +
              weatherData.list[0].main.temp_max.toFixed() +
              "\u00B0"}
          </p>
          <div className="weather-icon-contaienr flex justify-center items-center">
            {/* TODO weather Icon */}
            {getWeatherIcon(weatherData.list[0].weather[0].main as WeatherType, 24)}
            {/* <TiWeatherSunny className="w-24 h-24" /> */}
          </div>
          <div className="wiget-container mt-auto flex justify-around rounded-lg p-2 bg-slate-300 text-black gap-x-2">
            <div className="wiget flex flex-col items-center justify-center ">
              <WiHumidity className="wiget-icon w-6 h-6" />
              <p className="wiget-content text-sm">
                {weatherData.list[0].main.humidity + "%"}
              </p>
            </div>
            <div className="wiget w-fit text-nowrap wiget flex flex-col items-center justify-center ">
              <FaWind className="wiget-icon w-6 h-6 " />
              <p className="wiget-content text-sm">
                {typeof (weatherData.list[0].wind) !== "undefined" ?
                  weatherData.list[0].wind.speed.toFixed() + "m/s" :
                  <WiNa />}
              </p>
            </div>
            <div className="wiget flex flex-col items-center justify-center ">
              <WiBarometer className="wiget-icon w-6 h-6" />

              <p className="wiget-content text-sm">
                {weatherData.list[0].main.pressure.toFixed() + "hPa"}
              </p>
            </div>
            <div className="wiget flex flex-col items-center justify-center ">
              <FaTemperatureHalf className="wiget-icon w-6 h-6" />
              <p className="wiget-content text-sm">
                {weatherData.list[0].main.feels_like.toFixed() + "\u00B0C"}
              </p>
            </div>
          </div>
        </div>
        <div className="right-container flex flex-col max-w place-content-between">
          <div className="forecast-container flex justify-evenly ">
            {foreCastData.map((item, index) => ( //todo map the data form weather api
              // TODO the items in the forecast section should be setted to next 4 days of the week, according to the current date
              <div className="forecast-card flex flex-col p-3" key={item.id}>
                <p className="font-semibold text-2xl mb-1">{item.day}</p>
                <p className="text-sm text-center text-shadow-lg">
                  {item.date}
                </p>
                <div className="mb-1 flex justify-center">
                  {getWeatherIcon(item.weather as WeatherType, 24)}
                </div>
                <p className="text-sm text-center">
                  {item.minTemp + "~" + item.maxTemp}
                </p>
              </div>
            ))}
          </div>
          <div className="cities-container mb-2 flex flex-col">
            <div className="search-bar bg-grey flex gap-1 shadow-md w-50% mr-auto rounded-md">
              <input
                className="grow-1 max-w-70% pl-3"
                type="text"
                placeholder=" search for a city"
                onChange={onchange}
                value={searchBarValue}
              />
              <button
                className="grow-0 p-1 bg-indigo-500 rounded-md m-2 pl-2 pr-2 text-white"
                aria-label="Search"
                onClick={() => { setTargetCity(searchBarValue) }} //TODO: this should be a function that sets the target city to the search bar value
              >
                Search
              </button>
            </div>
            <div className="cities-view flex justify-around">
              {isLoadingOtherCities
                ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="city-card animate-pulse bg-slate-200 p-4 rounded-lg flex flex-col items-center w-24 h-32">
                    <div className="w-12 h-12 bg-slate-400 rounded-full mb-2"></div>
                    <div className="w-16 h-4 bg-slate-400 rounded mb-1"></div>
                    <div className="w-12 h-4 bg-slate-300 rounded"></div>
                  </div>
                ))
                : otherCities.map((item) => (
                  <div key={item.id} className="city-card flex flex-col justify-center items-center p-2">
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
