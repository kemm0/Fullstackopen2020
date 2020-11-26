import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import NumberService from './services/NumberService'
import image from './doggo.gif'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('green')

  useEffect(() =>{
    NumberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){ //name found
      const foundPerson = persons.find(person => person.name === newName)
      if(foundPerson.number === newNumber){
        window.alert(`${newName} is already added to phonebook`)
      }
      else{
        const answer = window.confirm(`${newName} is already added to phonebook, replace
        old number with the new one?`)
        if(answer===true){
          const fixedPerson = {...foundPerson,number: newNumber}
          NumberService.replace(fixedPerson)
          .then(response => {
            const i = persons.findIndex(person => person.name === newName)
            const fixedPersons = [...persons]
            fixedPersons[i] = response.data
            setPersons(fixedPersons)
          })
          .catch(error =>{
            setMessageColor('red')
            setMessage(`information of ${foundPerson.name} was already deleted from the server. Please refresh page.`)
          }
          )
        }
      }
    }
    else{
      const person = {name: newName, number: newNumber}
      NumberService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessageColor('green')
        setMessage(
          `User '${person.name}' was added`
        )
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
      <Notification message={message} messageColor={messageColor}/>
      <Filter filter={newFilter} handler={handleFilterChange}/>

      <PersonForm 
      onSubmit={addName}
      name={newName}
      onNameChange={handleNameChange}
      number={newNumber}
      onNumberChange={handleNumberChange}/>

      <div>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={newFilter}/>
      </div>
      <div>
        <img src={image}/>
      </div>
    </div>
  )
}

export default App