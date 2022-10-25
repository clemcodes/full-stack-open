import { useState, useEffect} from 'react'
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
  const [message, setMessage] = useState(null)
  const [messageIsFailure, setMessageIsFailure] = useState(null)
  
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
      number: newNum
    }
    personService.create(newPerson)
                  .then(res => {
                    setPersons(persons.concat(res.data))
                    setMessage(`Added ${newName}`)
                    setMessageIsFailure(false)
                })
                .catch(error => {
                  setMessage(error.response.data.error)
                  setMessageIsFailure(true)
                })
                    
      setTimeout(() => {
        setMessage(null)
      }, 5000)

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

  const editPerson = (number, id) => {
    personService.replaceNumber(id, number)
                  .then(res => {
                    setPersons(persons.concat(res.data))
                    setMessage('number updated')
                    setMessageIsFailure(false)
                  })
                  .catch(error => {
                    setMessage(error.response.data.error)
                    setMessageIsFailure(true)
                  })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageIsFailure={messageIsFailure}/>
      <Filter search={search} onChange={(e) => setSearch(e.target.value)} />
      
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={(e) => setNewName(e.target.value)} handleNumChange={(e) => setNewNum(e.target.value)} />
      
      <h3>Numbers</h3>
      <Persons 
        search={search} 
        searchResults={searchResults} 
        persons={persons} 
        deletePerson={deletePerson}
        editPerson={editPerson}/>
    </div>
  )
}

export default App
