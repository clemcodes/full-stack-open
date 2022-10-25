import React, {useState} from 'react'

const Person = ({ele, deletePerson, editPerson}) => {
  const [number, setNumber] = useState(ele.number)
  const [isEditClicked, setIsEditClicked] = useState(false)

  const handleEdit = (id) => {
    setIsEditClicked(!isEditClicked)
    if(isEditClicked){
      editPerson(number, id)
    }
  }

    return (
      <>
        <div>{ele.name} {isEditClicked ? <input onChange={(e) => setNumber(e.target.value)} value={number} /> : number}
          <button onClick={() => handleEdit(ele.id)}>{isEditClicked ? 'confirm' : 'edit'}</button> 
          <button onClick={(e) => deletePerson(e, ele.id)}>delete</button>
        </div>
      </>
    )
  }

export const Persons = ({search, searchResults, persons, deletePerson, editPerson}) => {
  return (
    <div>
        {search 
        ? searchResults.map(ele => <Person key={ele.id} ele={ele} deletePerson={deletePerson} editPerson={editPerson} />) 
        : persons.map(ele => <Person key={ele.id} ele={ele} deletePerson={deletePerson} editPerson={editPerson} />)}
    </div>
  )
}
