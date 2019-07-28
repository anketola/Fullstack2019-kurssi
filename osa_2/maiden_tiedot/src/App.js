import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryInfo = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.name}> {country.name} </li>)}
      </ul>
    )
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital} <br />
      population {country.population} <br />
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="100" />
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
      <CountryInfo countries={countriesToShow} />
    </div>
  )
}

export default App
