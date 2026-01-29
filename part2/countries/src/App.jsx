import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState('')
  const [matchedCountries, setMatchedCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(countries.trim().toLowerCase())
        )
        setMatchedCountries(filtered)
      })
  }, [countries])

  useEffect(() => {
    if (matchedCountries.length === 1) {
      getweatherdata(matchedCountries[0].capital).then(data => {
        setWeatherData(data)
      })
    }
  }, [matchedCountries])
  
  const getweatherdata = async (location) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`)
    return response.data
  }
  return (
    <div>
      find countries
      <input
        value={countries}
        onChange={(event) => setCountries(event.target.value)}
      />

      <br />

      {/* Case: Too many */}
      {matchedCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* Case: Between 2 and 10 */}
      {matchedCountries.length <= 10 && matchedCountries.length > 1 && (
        <ul>
          {matchedCountries.map(country =>
            <div key={country.name.common}>
              <li>
                {country.name.common}
              </li>
              <button onClick={() => setMatchedCountries([country])}>
                show
              </button>

            </div>
          )}
        </ul>
      )}

      {/* Case: Exactly 1 */}
      {matchedCountries.length === 1 && (
        <div>
          <h1>{matchedCountries[0].name.common}</h1>
          <p>capital {matchedCountries[0].capital}</p>
          <p>area {matchedCountries[0].area}</p>

          <h3>languages:</h3>
          <ul>
            {Object.values(matchedCountries[0].languages)
              .map(language =>
                <li key={language}>{language}</li>
              )}
          </ul>

          <img
            src={matchedCountries[0].flags.png}
            alt="flag"
            width="150"
          />

          <h1>Weather in {matchedCountries[0].capital}</h1>
          {weatherData && (
            <div>
              <p><b>temperature:</b> {weatherData.current.temp_c} Celsius</p>
              <img src={weatherData.current.condition.icon} alt="weather icon" />
              <p><b>wind:</b> {weatherData.current.wind_kph} km/h</p>
            </div>
          )}


        </div>
      )}
    </div>
  )
}

export default App
