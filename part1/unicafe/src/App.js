import { useState } from 'react'

const Button = ({name}) => {
  return (
    <button value={name}>{name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
      <td>{text} {value}</td>
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
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value ={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value ={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value ={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value ={total} />
        </tr>
        <tr>
          <StatisticLine text="average" value ={average} />
        </tr>
        <tr>
          <StatisticLine text="positive" value ={good/total} />
        </tr>
      </tbody>
    </table>
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