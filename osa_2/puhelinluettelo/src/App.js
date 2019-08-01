import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

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

const Persons = ({ peopleToShow, deleteFunction }) => {
  return(
    <div>
      {peopleToShow.map(person => <Person key={person.name} person={person} deleteFunction={deleteFunction} />)}
    </div>
  )
}

const Person = ({ person, deleteFunction }) => {
  return(
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deleteFunction(person.id)}>delete</button>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ error }) => {
  if (error === null) {
    return null
  }
  return (
    <div className='error'>
      {error}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(n => n.name === newName);
        personsService
          .update(oldPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(personlist => (personlist.id !== oldPerson.id ? personlist : response)))
            setNewName('')
            setNewNumber('')
            setMessage(`Changed the number for person ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setError(`Information on ${newName} has already been removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName));
          })
        }
    } else {
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setMessage(`Added person ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch(error => {
          setError(`${error.response.data.error}`)
          setTimeout(() => {
            setError(null)
          }, 5000)
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

  const removePerson = (id) => {
    const removeName = persons.find(n => n.id === id);
    if (window.confirm(`Delete ${removeName.name} ?`)) { 
    personsService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Removed person ${removeName.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
      })
      .catch(error => {
        setError(`Person ${removeName.name} has already been removed from the server`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setPersons(persons.filter(person => person.name !== removeName.name));
      })
    }
  }

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
      <Notification message={message} />
      <ErrorMessage error={error} />
      <FilterField value={filter} handler={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} personValue={newName} numberValue={newNumber} personHandler={handleChangePerson} numberHandler={handleChangeNumber} />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} deleteFunction={removePerson}/>
    </div>
  )

}

export default App