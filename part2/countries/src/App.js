import {useState, useEffect} from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
  return (
    <>
      {
        countries.length > 10 ? <div>Too many matches, specify another filter</div>
        : countries.length === 1 ? <Country country={countries[0]} />
        : <>{countries.map(country => <ShowCountry key={country.name.common} 
                                                     name={country.name.common}
                                                     country={country} />)
                                                     }</>
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
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <div>{country.flag}</div>    
      </div>
      <Weather city={country.capital} />
    </>
  )
}

const ShowCountry = ({name, country}) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <div>{name} <button onClick={() => setShow(true)}>show</button></div> 
       { show ? <Country country={country}/> : '' }
    </>
  )
}

const Weather = ({ city }) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
         .then(res => {
           console.log(res)
           setTemp(res.data.main.temp)
           setWind(res.data.wind.speed)
           setIcon(res.data.weather[0].icon)
         })
  },[city])

  return (
    <>
      <h2>Weather in {city}</h2>
      <div>temperature {temp} Celsius</div>
      <div><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather logo"/></div>
      <div>wind {wind} m/s</div>
    </>
    
  )
}

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