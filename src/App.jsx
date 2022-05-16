import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [descr, setDescr] = useState('Unknown weather')
  const [main, setMain] = useState('')
  const [temp, setTemp] = useState('')
  const [icon, setIcon] = useState('')
  const [long, setLong] = useState('')
  const [lat, setLat] = useState('')
  const key = import.meta.env.VITE_WEATHER_API_KEY

  const weather = {
    thunderstorm: 'https://wallpapers.com/wallpapers/iphone-4k-thunderstorm-5ieattwkqqoynfoe.html?embed=true',
    drizzle: 'https://wallpapers.com/wallpapers/rain-heavy-rain-flowers-street-balcony-height-wet-1lo5o3cswuz897y9.html?embed=true',
    rain: 'https://wallpapers.com/wallpapers/rain-in-city-hd-wallpaper-i-hd-image-83ztyvqabpqleouo.html?embed=true',
    snow: 'https://wallpapers.com/wallpapers/a-white-dragon-peanut-on-the-table-gouache-ideas-0cxm1xy026zidi2w.html?embed=true',
    clear: 'https://wallpapers.com/wallpapers/sunny-day-in-boston-9ixaih3jaxa04qei.html?embed=true',
    clouds: 'https://wallpapers.com/wallpapers/dark-cloudy-sunset-ulpd38espbo8ltj6.html?embed=true'
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setDescr('Geolocation is not supported by your browser');
    } else {
      setDescr('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`)
                .then((res) => {
                  console.log(res)
                  setData(res.data)
                  setDescr(res.data.weather[0].description)
                  setTemp(Math.floor(9/5 * (res.data.main.temp - 273) + 32))
                  setIcon(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)

                  const main_weather = res.data.weather[0].main.toLowerCase()

                  console.log('main weather:', main_weather)

                  setMain(weather[main_weather])

                  
                  console.log(main)
                })
        
      }, () => {
        setDescr('Unable to retrieve your location');
      });
    }
  }, [])

  function updateWeather() {
     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
                .then((res) => {
                  console.log(res)
                  setData(res.data)
                  setDescr(res.data.weather[0].description)
                })
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundImage: `url(${main})`}}>
        <p style={{fontWeight:'900', fontSize:'3em', border:'solid white 15px', borderRadius:'10px', padding:'20px 40px'}}>
          Weather API
        </p>

        <p style={{fontWeight:'900'}}>
          Current weather for the {data.name} area
        </p>
        <p style={{textTransform:'capitalize'}}>
          {temp} &deg; {descr}
        </p>

        <img src={icon} alt={descr} />
        
      </header>
    </div>
  )
}

export default App
