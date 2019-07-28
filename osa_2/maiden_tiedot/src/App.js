import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryInfo = ({ countries, filter, setSearchFilter, weather, setWeather}) => {
  if (filter === '') {
    return (
      <p>No search filter given</p>
    )
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} weather={weather} setWeather={setWeather}/>
    )
  } else if (countries.lenght === 0) {
    return (
      <p>No matches found with the search filter</p>
    )
  } else {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name}>
          {country.name}
          <button onClick={() => setSearchFilter(country.name)}>
          Show
          </button>
          </div>)}
      </div>
    )
  }
}

const Weather = ({ city, weather, setWeather}) => {
 
  const hook = () => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=dd3e560b93e945c2a82135908192807&q=' ${city}`)
      .then(response => setWeather(response.data.current))
  }
  useEffect(hook, [])
  
  return (
    <>
      <p><strong>temperature:</strong><div>{weather.temp_c} Celsius</div></p>
      { weather.condition && <img src={weather.condition.icon} alt="condition" /> }
      <p><strong>wind:</strong><div>{weather.wind_kph} kph direction {weather.wind_dir} </div></p>
    </>    
  )
}

const Country = ({ country, weather, setWeather }) => {
  return (
    <div key={country.name}>
      <h2>{country.name}</h2>
      capital {country.capital} <br />
      population {country.population} <br />
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="100" />
      <Weather city={country.capital} weather={weather} setWeather={setWeather} />
    </div>
  )
}

const SearchInput = ({ value, searchHandler }) => {
  return (
    <input value={value}
    onChange={ searchHandler }
    />
  )
}


const App = () => {
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ countryData, setCountryData ] = useState([])
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  const countriesToShow = searchFilter === '' ? 
    countryData : countryData.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const handleChangeSearch = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      find countries <SearchInput value={searchFilter} searchHandler={handleChangeSearch} />
      <CountryInfo 
      countries={countriesToShow} 
      filter={searchFilter} 
      setSearchFilter={setSearchFilter}
      weather={weather}
      setWeather={setWeather}
      />
    </div>
  )
}

export default App
