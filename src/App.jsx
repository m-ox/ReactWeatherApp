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

  // I'm stealing wallpapers for the aesthetic uwu
  const weather = {
    thunderstorm: 'https://wallpapers.com/images/high/iphone-4k-thunderstorm-5ieattwkqqoynfoe.jpg',
    drizzle: 'https://wallpapers.com/images/high/rain-heavy-rain-flowers-street-balcony-height-wet-1lo5o3cswuz897y9.jpg',
    rain: 'https://wallpapers.com/images/high/rain-in-city-hd-wallpaper-i-hd-image-83ztyvqabpqleouo.jpg',
    snow: 'https://wallpapers.com/images/high/a-white-dragon-peanut-on-the-table-gouache-ideas-0cxm1xy026zidi2w.jpg',
    clear: 'https://wallpapers.com/images/high/sunny-day-in-boston-9ixaih3jaxa04qei.jpg',
    clouds: 'https://wallpapers.com/images/high/dark-cloudy-sunset-ulpd38espbo8ltj6.jpg'
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
                  setData(res.data)
                  setDescr(res.data.weather[0].description)
                  setTemp(Math.floor(9/5 * (res.data.main.temp - 273) + 32) +  "° F")
                  setIcon(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
                  setMain(weather[res.data.weather[0].main.toLowerCase()])
                })
        
      }, () => {
        setDescr('Unable to retrieve your location');
      });
    }
  }, [])

  // keeping for posterity, it was handy having a button sometimes
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
      <header className="App-header" style={{backgroundImage: `url(${main})`, backgroundSize: 'cover', height: '100vh'}}>

        <div style={{color:'black', fontFamily:'monospace', fontSize:'1.5em', height:'250px', backgroundColor:'#97979785', borderRadius:'50px', padding:'20px 40px'}}>
          <p style={{fontWeight:'900'}}>
            Current weather for the {data.name} area
          </p>
          <p style={{
                      textTransform:'capitalize',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      fontSize:'1em'
                      }}>
            {temp} <img src={icon} alt={descr} /> {descr}
          </p>

        </div>
        
      </header>
    </div>
  )
}

export default App
