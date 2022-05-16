import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [descr, setDescr] = useState('Unknown weather')

  const [zip, setZip] = useState('')
  const [long, setLong] = useState('')
  const [lat, setLat] = useState('')

  async function getData() {

    await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=f195469201dedc86117028f76d94996d`)
         .then((res) => {
           setLong(res.data.lon)
           setLat(res.data.lat)
         })
  }

  function handleLong(event) {
    setLong(event.target.value)
  }

  function handleLat(event) {
    setLat(event.target.value)
  }

  function handleZip(event) {
    setZip(event.target.value)
  }

  function updateWeather() {
     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f195469201dedc86117028f76d94996d`)
                .then((res) => {
                  console.log(res)
                  setData(res.data)
                  setDescr(res.data.weather[0].description)
                })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontWeight:'900', fontSize:'3em', border:'solid white 15px', borderRadius:'10px', padding:'20px 40px'}}>
          Weather API
        </p>
        <p>
          Zipcode
          <textarea value={zip} onChange={() => handleZip(event)} /> <br/>

          <button onClick={() => {getData()}}>Update Coordinates</button> <br/>

          Longitude
          <textarea value={long} onChange={() => handleLong(event)} /> <br/>

          Latitude
          <textarea value={lat} onChange={() => handleLat(event)}/> <br/>

        </p>

        <br/>

        <button onClick={() => {updateWeather()}}>What's the weather?</button>

        <br/>

        <p style={{fontWeight:'900'}}>
          Current weather for the {data.name} area
        </p>
        <p style={{textTransform:'capitalize'}}>
          {descr}
        </p>
        
      </header>
    </div>
  )
}

export default App
