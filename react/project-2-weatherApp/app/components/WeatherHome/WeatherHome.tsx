import React from 'react'

const sampleData = {
  currentCity: {
    date: '23 July, Sunday 12:00',
    city: 'Sydney',
    currentTemp: '27',
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
    }, {
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
    <main >
      <div className='flex justify- w-fit gap-x-0.5 my-8 bg-slate-200 m-6 p-3 rounded-lg'>
        <div className='current-weather bg-indigo-500 rounded-lg text-white w-1/3 text-center p-3 mr-6'>
          <p className='text-left text-sm mb-3'>{sampleData.currentCity.date}</p>
          <p className='text-xl mb-4'>{sampleData.currentCity.city}</p>
          <p className='text-6xl mb-1'>{sampleData.currentCity.currentTemp}</p>
          <p className='text-xl mb-3 font-light'>{sampleData.currentCity.minTemp + "~" + sampleData.currentCity.maxTemp}</p>
          <p className='mb-6'>{sampleData.currentCity.weather}</p>
          <div className='flex justify-around rounded-lg p-2 bg-slate-300 text-black gap-3'>
            <div><p>{sampleData.currentCity.water}</p></div>
            <div><p>{sampleData.currentCity.wind}</p></div>
            <div><p>{sampleData.currentCity.uv}</p></div>
            <div><p>{sampleData.currentCity.something}</p></div>
          </div>
        </div>
        <div className='right-container flex flex-col max-w'>
          <div className='forecast flex justify-evenly mb-10'>
            {sampleData.forecast.map((item) => (
              <div className='forecast-card flex flex-col p-3'>
                <p className='font-semibold text-2xl mb-3'>{item.day}</p>
                <p className='text-sm text-center text-shadow-lg'>{item.date}</p>
                <p className='mb-1'>{item.weather}</p>
                <p className='text-sm text-center'>{item.minTemp + "~" + item.maxTemp}</p>
              </div>
            ))}
          </div>
          <div className='cities'>
            <div className="search-bar">
              <input type="text" placeholder='search for a city' />
              <button aria-label='Search'>Search</button>
            </div>
            <div className="cities-view flex">
              {
                sampleData.otherCities.map((item) => (
                  <p>{item.city}</p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default WeatherHome