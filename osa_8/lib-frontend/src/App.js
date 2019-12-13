import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

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

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
    author {
      name
      born
    }
    published
    genres
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const ALL_GENRES = gql`
{
  allBooks {
    genres
  }
}
`
const USER_FAV = gql`
{
  me {
    favoriteGenre
  }
}
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
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
  const [genre, setGenre] = useState('')
  
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS, { variables: { genre }})
  const allGenres = useQuery(ALL_GENRES)
  const userFav = useQuery(USER_FAV)
  const client = useApolloClient()

  const handleError = (error) => { }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book ${addedBook.title} added`)
      console.log(subscriptionData)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
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
        show={page === 'books'} result={allBooks} allGenres={allGenres} genre={genre} setGenre={genre => setGenre(genre)}
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
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>

      </div>

      <Authors
        show={page === 'authors'} result={allAuthors} editBirthyear={editBirthyear} token={token}
      />

      <Books
        show={page === 'books'} result={allBooks} allGenres={allGenres} genre={genre} setGenre={genre => setGenre(genre)}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

      <Recommendations
        show={page === 'recommendations'} result={allBooks} userFav={userFav}
      />

    </div>
  )

}

export default App