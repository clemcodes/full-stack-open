import React from 'react'

const Person = ({ele}) => {
    return (
      <>
        <div>{ele.name} {ele.number}</div>
      </>
    )
  }

export const Persons = ({search, searchResults, persons}) => {
  return (
    <div>
        {search 
        ? searchResults.map(ele => <Person key={ele.name} ele={ele}/>) 
        : persons.map(ele => <Person key={ele.name} ele={ele}/>)}
    </div>
  )
}
