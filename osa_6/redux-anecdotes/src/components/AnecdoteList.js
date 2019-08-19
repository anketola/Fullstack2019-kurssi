import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, nullifyNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.notificationChange(`you voted for '${anecdote.content}'`)  
    setTimeout(() => {
      props.nullifyNotification()
    }, 5000)
  }
  //console.log(anecdotes)

return (
  <div>
    <Filter store={props.store}/>  
    {props.visibleAnecdotes
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
)
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  console.log(anecdotes)
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationChange,
  nullifyNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList