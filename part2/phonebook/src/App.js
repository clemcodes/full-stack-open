import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  
  const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
  useEffect(() => {
    personService
      .getAll()
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

    const existedPerson = persons.find(person => person.name === newName)
    const changedNumber = {...existedPerson, number:newNum}

    if(!existedPerson){
      personService.create(newPerson)
                   .then(res => setPersons(persons.concat(res.data)))
      
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } else if(existedPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService.replaceNumber(existedPerson.id, changedNumber)
                   .then(res => setPersons(persons.map(person => person.id !== existedPerson.id ? person : res.data)))
      setSuccessMessage(`${newName}'s number updated to ${newNum}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNum('')
  }

  const deletePerson = (e, id) => {
    e.preventDefault()
    if(window.confirm('Are you sure you want to delete?')){
      personService.deleteItem(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter search={search} onChange={(e) => setSearch(e.target.value)} />
      
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={(e) => setNewName(e.target.value)} handleNumChange={(e) => setNewNum(e.target.value)} />
      
      <h3>Numbers</h3>
      <Persons search={search} searchResults={searchResults} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
