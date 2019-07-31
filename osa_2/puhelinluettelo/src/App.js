import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const FilterField = ({value, handler }) => {
  return (
    <div>
      filter shown with
      <input value={value}
      onChange={handler}
      />
    </div>
  )
}

const PersonForm = ({onSubmit, personValue, numberValue, personHandler, numberHandler}) => {
  return(
    <form onSubmit={onSubmit}>
    <div>
      name: <input 
      value={personValue} 
      onChange={personHandler}
      />
    </div>
    <div>
      number: <input
      value={numberValue}
      onChange={numberHandler}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ peopleToShow }) => {
  return(
    <ul>
      {peopleToShow.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const Person = ({ key, person }) => {
  return(
    <li key={key}>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000-0000000' },
    { name: 'Timo Testi', number: '111-1111111'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
 
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const peopleToShow = filter === '' ? 
    persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleChangePerson = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField value={filter} handler={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} personValue={newName} numberValue={newNumber} personHandler={handleChangePerson} numberHandler={handleChangeNumber} />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )

}

export default App