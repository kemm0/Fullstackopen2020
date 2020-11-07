import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){ //name found
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      const person = {name: newName, number: newNumber}
      axios
      .post('http://localhost:3001/persons',person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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