import React from 'react'

const Person = ({ele, deletePerson}) => {
    return (
      <>
        <div>{ele.name} {ele.number} <button onClick={(e) => deletePerson(e, ele.id)}>delete</button></div>
      </>
    )
  }

export const Persons = ({search, searchResults, persons, deletePerson}) => {
  return (
    <div>
        {search 
        ? searchResults.map(ele => <Person key={ele.id} ele={ele}/>) 
        : persons.map(ele => <Person key={ele.id} ele={ele} deletePerson={deletePerson}/>)}
    </div>
  )
}
