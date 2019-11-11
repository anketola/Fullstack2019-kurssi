import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  console.log(props.listing)
  if (!props.show) {
    return null
  }
 
  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors 

  const options = authors.map(author => ({ value: author.name, label: author.name }))

  const handleNameChange = (props) => {
    setName(props.label)
  }

  const handleYearChange = (props) => {
    setYear(props.value)
  }

  const updateEntry = async (e) => {
    e.preventDefault()

    await props.editBirthyear({
      variables: { name, birthyear: parseInt(year) }
    })
    setName('')
    setYear('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={updateEntry}>
          <div>
            <Select placeholder="Please select an author" onChange={handleNameChange} options={options} />
          </div>
          <div>
            <input type="text" onChange={({ target }) => handleYearChange(target)} value={year}/>
          </div>
          
          <button action="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors