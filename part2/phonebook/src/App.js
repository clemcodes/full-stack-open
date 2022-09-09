import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNoteChange = (e) => {
    setNewName(e.target.value)
  }
  
  
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName
    }
    const isNew = JSON.stringify(persons).indexOf(JSON.stringify(newPerson)) < 0
    if(isNew){
      setPersons(persons.concat(newPerson))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person => <div key={person.name}>{person.name}</div>)}
        </div>
    </div>
  )
}

export default App
