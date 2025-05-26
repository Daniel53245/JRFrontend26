import React from 'react'

const sampleData =  {
    currentCity: {
        date: '23 July, Sunday 12:00',
        city: 'Sydney',
        minTemp: '28',
        maxTemp: '32',
        weather: 'sunny',
        water: '85%',
        wind: '9km/h',
        uv: '75ug',
        something: '26',
    },
    forecast: [
        {
            day: 'Monday',
            date: '24 July',
            weather: 'cloudy',
            minTemp: '20',
            maxTemp: '25'
        },
            {
            day: 'Monday',
            date: '24 July',
            weather: 'cloudy',
            minTemp: '20',
            maxTemp: '25'
        },
            {
            day: 'Monday',
            date: '24 July',
            weather: 'cloudy',
            minTemp: '20',
            maxTemp: '25'
        },
            {
            day: 'Monday',
            date: '24 July',
            weather: 'cloudy',
            minTemp: '20',
            maxTemp: '25'
        }
    ],
    otherCities: [
        {
            city: 'Melbourne',
            weather: 'sunny',
            minTemp: '25',
            maxTemp: '32'
        },
              {
            city: 'Melbourne',
            weather: 'sunny',
            minTemp: '25',
            maxTemp: '32'
        },
              {
            city: 'Melbourne',
            weather: 'sunny',
            minTemp: '25',
            maxTemp: '32'
        },      {
            city: 'Melbourne',
            weather: 'sunny',
            minTemp: '25',
            maxTemp: '32'
        }
    ]
}

type Props = {}

const WeatherHome = (props: Props) => {
  return (
    <main>
      <div>
        <p>{sampleData.currentCity.date}</p>
        <p>{sampleData.currentCity.city}</p>
        <p>{sampleData.currentCity.maxTemp}</p>
        <p>{sampleData.currentCity.minTemp + "~" + sampleData.currentCity.maxTemp}</p>
        <div>
          <div><p>{sampleData.currentCity.water}</p></div>
        </div>
      </div>
      <div>

      </div>
      <div>

      </div>
    </main>
  )
}

export default WeatherHome