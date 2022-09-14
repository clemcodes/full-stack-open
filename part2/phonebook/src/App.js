import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  
  const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])
  

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons.length + 1
    }

    const isRegistered = persons.find(person => person.name === newPerson.name && person.number ===newPerson.number)

    if(!isRegistered){
      axios.post('http://localhost:3001/persons', newPerson)
           .then(res => setPersons(persons.concat(res.data)))

    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={(e) => setSearch(e.target.value)} />
      
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={(e) => setNewName(e.target.value)} handleNumChange={(e) => setNewNum(e.target.value)} />
      
      <h3>Numbers</h3>
      <Persons search={search} searchResults={searchResults} persons={persons} />
    </div>
  )
}

export default App
