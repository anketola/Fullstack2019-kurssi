import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'


const UPDATE_BIRTHYEAR = gql`
mutation updateBirthyear($name: String!, $birthyear: Int!) {
  editAuthor(
    name: $name
    setBornTo: $birthyear
  ) {
    name
    born
  }
}
`

const CREATE_BOOK = gql`
mutation createNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    author { name }
    published
    genres
    id
  }
}
`
const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`


const App = () => {
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  const handleError = (error) => {
    
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [editBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} result={allAuthors} editBirthyear={editBirthyear}
      />

      <Books
        show={page === 'books'} result={allBooks}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}

export default App