import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
  {text}
  </button> 
)

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <div>
        <Header title="Statistiikka" /> 
        Palautetta ei ole vielä annettu.
      </div>
    )    
  }

  return (
    <div>  
      <Header title="Statistiikka" />  
      Hyvä: {good}<br />
      Neutraali: {neutral}<br />
      Huono: {bad}<br />
      Yhteensä: {total}<br />
      Keskiarvo: {average}<br />
      Positiivisia: {positive} %<br />
    </div>
  )    
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const mainTitle = 'Anna palautetta'

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title={mainTitle} />
      <Button text="Hyvä" handleClick={handleGoodClick} />
      <Button text="Neutraali" handleClick={handleNeutralClick} />
      <Button text="Huono" handleClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
