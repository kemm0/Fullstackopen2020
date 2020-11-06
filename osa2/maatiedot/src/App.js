import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredCountries,setFilteredCountries] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const onSearchChange = (event) => {
    const newInput = event.target.value
    setSearchInput(newInput)
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(newInput.toLowerCase())))
  }

  if(searchInput.length === 0 || filteredCountries.length === 0){
    return (
      <div>
      find countries <input value={searchInput} onChange={onSearchChange}/>
      </div>
    )
  }
  else if(filteredCountries.length === 1){
    const country = filteredCountries[0]
    return(
      <div>
        find countries <input value={searchInput} onChange={onSearchChange}/>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt={`Flag of ${country.name}`} src={country.flag} width="20%"/>
      </div>
    )
  }
  else if(filteredCountries.length <= 10 && filteredCountries.length >= 1){
    return(
        <div>
        find countries <input value={searchInput} onChange={onSearchChange}/>
        {filteredCountries.map(country => 
          <p key={country.name}>{country.name}</p>)}
        </div>
    )
  }
  else{
    return(
      <div>
        find countries <input value={searchInput} onChange={onSearchChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default App;
