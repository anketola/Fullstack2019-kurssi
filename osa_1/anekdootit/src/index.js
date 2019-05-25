import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
  {text}
  </button> 
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const handleRandomClick = () => {
    const randomAnecote = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomAnecote)
  }

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      {props.anecdotes[selected]}<br />
      Has {votes[selected]} votes.<br />
      <Button text="Vote" handleClick={handleVoteClick} />
      <Button text="Next anecdote" handleClick={handleRandomClick} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
