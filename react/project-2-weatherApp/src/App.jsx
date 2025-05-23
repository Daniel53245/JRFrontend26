import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Container} from '@mui/material'
import WeatherDetails from './components/WeatherDetails.jsx'
import ForeCast from './components/ForeCast.jsx'
function App(){
  const [count, setCount] = useState(0)

  return (
    <div>

    <WeatherDetails/>
   <ForeCast/>
    </div>
  )
}

export default App;
