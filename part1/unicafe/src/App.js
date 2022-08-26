import { useState } from 'react'

const Button = ({name}) => {
  return (
    <button value={name}>{name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
      <p>{text} {value}</p>
    </>
  )
}

const Statistics = ({good, neutral, bad, average, total}) => {
  if(total === 0){
    return (
      <p>
        No feedback is given
      </p>
    )
  }
  return (
    <>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={total} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={good/total} />
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*-1)/total
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
        <Statistics good={good} neutral={neutral} bad={bad} average={average} total={total} />
      </div>
    </>
  )
}

export default App