import React from 'react'

export const Filter = ({search, onChange}) => {
  return (
    <div>filter shown with <input type="search" value={search} onChange={onChange}/></div>
  )
}
