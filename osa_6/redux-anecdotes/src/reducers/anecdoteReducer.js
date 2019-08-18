const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    anecdote_id: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADDNEW',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

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



export default reducer