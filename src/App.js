import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

function App() {


  const [city, setCity] = React.useState('')
  const [weatherData, setWeatherData] = React.useState(null)


  const handleCity = (event) => {

    setCity(event.target.value)

  }


  const getWeather = async () => {
    console.log('Inside getWeather function')
    console.log('City is', city)

    const API_KEY = 'd2be806d55ae496d96b73856222809'

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

    try {

      const response = await axios.get(url)
      //console.log('response is', response.data)

      const { current, location } = response.data

      const tmpWeatherObj = {}
      tmpWeatherObj.country = location.country
      tmpWeatherObj.cityName = location.name
      tmpWeatherObj.temp_c = current.temp_c
      tmpWeatherObj.condition = current.condition



      setWeatherData(tmpWeatherObj)

    } catch (error) {

      console.log('error is', error)

    }
  }

  console.log(weatherData)

  return (
    <div className="App">
      <h1>Weather App</h1>


      <input className='inputStyle' value={city} onChange={handleCity} placeholder='Enter a city' />
      <button className='weatherButton' onClick={getWeather}>Get Weather</button>

      {weatherData &&


        <div className='weatherContainer'>

          <h3>Weather Data is below</h3>

          <p>City: <span className='dataSpan'>{weatherData.cityName}</span></p>
          <p>Country:  <span className='dataSpan'>{weatherData.country}</span></p>
          <p>Current Temperature:  <span className='dataSpan'>{weatherData.temp_c}  °C</span></p>
          <p>Weather Condition:  <span className='dataSpan'>{weatherData.condition.text}</span></p>

          <img src={weatherData.condition.icon} className='icon' />

        </div>

      }


    </div>
  );
}

export default App;
