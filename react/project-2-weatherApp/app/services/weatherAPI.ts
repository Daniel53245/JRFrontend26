import axios from "axios";
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

export const getWeather = async ():Promise<response> => {
        const lat = 34;
        const lon = 151;
        const key = "";
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
        return (await axios.get<response>(url)).data;        
}

