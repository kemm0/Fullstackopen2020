import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){ //name found
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      const person = {name: newName, number: newNumber}
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange}/>

      <PersonForm 
      onSubmit={addName}
      name={newName}
      onNameChange={handleNameChange}
      number={newNumber}
      onNumberChange={handleNumberChange}/>

      <div>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
      </div>
    </div>
  )

}

export default App