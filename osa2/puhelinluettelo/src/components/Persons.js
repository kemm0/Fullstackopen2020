import React from 'react'
import NumberService from '../services/NumberService'


const Persons = (props) => {
    const handleRemove = (removedID,removedName) => {
        const confirmed = window.confirm(`Are you sure you want to remove ${removedName}?`)
        if(confirmed === true){
            NumberService
            .remove(removedID)
            .then(props.setPersons(props.persons.filter(person => person.id !== removedID)))
        }
    }
    return(
        <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map((filteredperson) =>
            <p key={filteredperson.name}>{filteredperson.name} {filteredperson.number}
            <button onClick={() => handleRemove(filteredperson.id,filteredperson.name)}>remove</button> 
            </p>)}
        </div>
    )
}

export default Persons