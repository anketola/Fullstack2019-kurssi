import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'VOTE' :
      const anecdoteToChange = state.find(n => n.id === action.anecdote_id)
      const newAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      //console.log(anecdoteToChange)
      //console.log(newAnecdote)
      const oldState = state.filter(n => n.id !== action.anecdote_id)
      //console.log(oldState.concat(newAnecdote))
      return oldState.concat(newAnecdote)
    case 'ADDNEW' :
    console.log('action', action)
    //  const createdAnecdote = {
    //    content: action.data.content,
    //    id: getId(),
    //    votes: 0
    //  }
      return [ ...state, action.data ]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    anecdote_id: id
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADDNEW',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}





export default reducer