import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import LoginForm from './components/LoginForm'

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
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const handleError = (error) => { }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [editBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!token) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('loginform')}>login</button>
        
      </div>

      <Authors
        show={page === 'authors'} result={allAuthors} editBirthyear={editBirthyear} token={token}
      />

      <Books
        show={page === 'books'} result={allBooks}
      />

      <LoginForm
        show={page === 'loginform'} addBook={addBook} login={login} setToken={setToken} setPage={setPage}
      />

    </div>
  ) }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>

      </div>

      <Authors
        show={page === 'authors'} result={allAuthors} editBirthyear={editBirthyear} token={token}
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