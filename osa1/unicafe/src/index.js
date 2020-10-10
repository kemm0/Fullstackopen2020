import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const StatisticLine = (props) => {
  return(
    <>
    <tr>
    <td>{props.text}</td><td>{props.value}</td>
    </tr>
    </>
  )
}
const Statistics = (props) => {
  if(props.total === 0){
    return(
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'Good'} value={props.good}/>
          <StatisticLine text={'Neutral'} value={props.neutral}/>
          <StatisticLine text={'Bad'} value={props.bad}/>
          <StatisticLine text={'All'} value={props.total}/>
          <StatisticLine text={'Average'} value={props.average}/>
          <StatisticLine text={'Positive'} value={props.positive * 100 + " %"}/>
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
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive =  good / total
  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button text='good' handleClick={()=>setGood(good + 1)}/>
        <Button text='neutral' handleClick={()=>setNeutral(neutral + 1)}/>
        <Button text='bad' handleClick={()=>setBad(bad + 1)}/>
      </div>
        <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
