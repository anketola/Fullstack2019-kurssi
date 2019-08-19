import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  
  useEffect(() => {
    props.initializeAnecdotes()
  },[])


  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)