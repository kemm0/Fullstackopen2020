import React from 'react'

const Persons = (props) => {
    return(
        <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(filteredperson =>
            <p key={filteredperson.name}>{filteredperson.name} {filteredperson.number}</p>)}
        </div>
    )
}

export default Persons