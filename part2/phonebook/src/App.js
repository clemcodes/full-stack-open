import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  
  const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons.length + 1
    }

    const isNew = JSON.stringify(persons).indexOf(JSON.stringify(newPerson)) < 0

    if(isNew){
      setPersons(persons.concat(newPerson))
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
