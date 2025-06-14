import axios from "axios";
const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
const google_geocoding_key = import.meta.env.VITE_GOOGLEGEOCODE_API_KEY
//TODO: resolve city name 
//TODO: create type interface for the api

export interface response {//the response structure of open api 2.5
        cod: string,
        message: number,
        cnt: number,
        list: ForecastListItem[],
        city:City,
};

export interface ForecastListItem{
        dt:number, //Time of data forecasted, unix, UTC
        main:{
                temp:number,
                feels_like:number,
                temp_min:number,
                temp_max:number,
                pressure:number,
                sea_level:number,
                grnd_level:number,
                humidity:number,//%
                temp_kf:any
        },
        weather:{
                id:number,
                main:string,
                description?:string
                icon?:string
        }[],
        clouds?:{
                all:number //Coudiness%
        },
        wind?:{
                speed:number, //Metric:meter per sec
                deg?:number, //meteorological
                guts?:number,
        },
        visibility?:number, //average visibility meter max 10k
        pop?:number, //0-1 liklihood of percipitation
        rain?:{
                "3h":number
        }, //rain volume for last 3 hours (mm)
        snow?:{
                "3h":number
        }, //snow volume for 3 hours (mm)
        sys:{
                pod:string, //part of day n-night d-day
        }
        dt_txt:string, //Time of data for casted ,ISO,UTC
};

export interface City{
        id:number,
        name:string,
        coord:{
                lat:number,
                lon:number
        }
        country:string, //country
        population?:number, //this is not working
        timezone: number, //shift in secs from UTC
        sunrise:number, //sunrise time , unix UTC
        sunset:number, //sunset time ,unix UTC
};

async function getLatLon(city: string): Promise<{ lat: number; lon: number }> {
  const apiKey = google_geocoding_key;

  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: { address: city, key: apiKey }
  });

  console.log("🛰 Google Geocoding Response:", response.data);

  if (response.data.status !== "OK") {
    throw new Error(`Geocoding failed: ${response.data.status}`);
  }

  const result = response.data.results[0];
  if (!result) throw new Error("Location not found");

  const { lat, lng } = result.geometry.location;
  return { lat, lon: lng };
}



export const getWeather = async (city_name: string = "Sydney"): Promise<response | undefined> => {
  console.log("🚀 getWeather() called with:", city_name); // ← ADD THIS
  try {
    const { lat, lon } = await getLatLon(city_name);
    console.log("✅ Coordinates resolved:", lat, lon); // ← ADD THIS

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const responseData = await axios.get<response>(url);
    return responseData.data;

  } catch (error) {
    console.error("❌ Error in getWeather:", error);
    return undefined;
  }
};

export async function getMiniCityWeather(cityName: string, id: number) {
  try {
    const result = await getWeather(cityName);
    if (!result || result.list.length === 0) return null;

    const first = result.list[0];

    return {
      id: id.toString(),
      city: result.city.name,
      weather: first.weather[0].main,
      minTemp: Math.round(first.main.temp_min).toString(),
      maxTemp: Math.round(first.main.temp_max).toString(),
    };
  } catch (err) {
    console.error(`❌ Failed to fetch weather for ${cityName}:`, err);
    return null;
  }
}
