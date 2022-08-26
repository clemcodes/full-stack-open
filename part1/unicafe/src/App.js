import { useState } from 'react'

const Button = ({name}) => {
  return (
    <button value={name}>{name}</button>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good*1 + neutral*0 + bad*-1)/total}</p>
      <p>positive {good/total} %</p>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button name="good"/>
        <Button name="neutral"/>
        <Button name="bad"/>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      </div>
    </>
  )
}

export default App