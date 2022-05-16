import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [weather, setWeather] = useState([])
  const [long, setLong] = useState('-114')
  const [lat, setLat] = useState('46')

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f195469201dedc86117028f76d94996d`)
         .then((res) => {
           console.log(res)
           setWeather(res.data)
         })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontWeight:'900'}}>
          Weather API
        </p>

        Longitude: {long}, Latitude: {lat}
        <br/><br/>
        <button onClick={() => {'Here is our weather data:', console.log(weather)}}>Console Log Weather</button>
        
      </header>
    </div>
  )
}

export default App
