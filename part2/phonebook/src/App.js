import { useState } from 'react'

const Person = ({person}) => {
  return (
    <>
      <div>{person.name} {person.phone}</div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleNoteChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }
  
  
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      phone: newNum
    }
    const isNew = JSON.stringify(persons).indexOf(JSON.stringify(newPerson)) < 0
    if(isNew){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNum('')
    } else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
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
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person => <Person key={person.name} person={person}/>)}
        </div>
    </div>
  )
}

export default App
