import axios from "axios";
export const  getWeather= async ():Promise<any>=>  {
        const lat = 35;
        const lon = 139;
        const key = "70c803b3a6abad07738f556f76a3cbd6";
        const url =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
        return axios.get(url)

}