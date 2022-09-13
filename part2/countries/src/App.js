import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
         .then(res => {
           setCountries(res.data)
         })
  },[])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  const Countries = ({countries}) => {
    return (
      <>
        {
          countries.length > 10 ? <div>Too many matches, specify another filter</div>
          : countries.length === 1 ? <Country country={countries[0]} />
          : <div>{countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}</div>
        }
      </>
      
    )
  }

  const Country = ({country}) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <div>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <div>{country.flag}</div>    
        </div>
      </>
    )
  }

  return (
    <div>
      <div>find countries <input 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)}/>
      </div>
        <Countries countries={ query ? filteredCountries : countries} />
    </div>
  )
}


export default App