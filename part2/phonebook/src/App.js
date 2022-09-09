import { useState } from 'react'

const Person = ({ele}) => {
  return (
    <>
      <div>{ele.name} {ele.number}</div>
    </>
  )
}

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
      number: newNum
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
      <div>filter shown with <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNum} onChange={(e) => setNewNum(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {search 
            ? searchResults.map(ele => <Person key={ele.name} ele={ele}/>) 
            : persons.map(ele => <Person key={ele.name} ele={ele}/>)}
        </div>
    </div>
  )
}

export default App
