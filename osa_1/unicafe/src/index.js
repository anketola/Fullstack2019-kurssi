import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
  {text}
  </button> 
)

const Statistic = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>    
      <td>{value}</td>    
    </tr>
  )
}

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
      <table>
        <tbody>
          <Statistic text="Hyvä" value={good} />
          <Statistic text="Neutraali" value={neutral} />
          <Statistic text="Huono" value={bad} />
          <Statistic text="Yhteensä" value={total} />
          <Statistic text="Keskiarvo" value={average} />
          <Statistic text="Positiivisia" value={positive} />
        </tbody>
      </table>
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
  const positive = (good / total * 100).toString() + ' %'

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
