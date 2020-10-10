import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomInt = (max) => {
  return Math.floor(Math.random()*Math.floor(max))
}
const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(randomInt(anecdotes.length))
  const [points, addPoints] = useState(new Array(anecdotes.length).fill(0)) 

  const vote=(index)=>{
    const newPoints = [...points]
    newPoints[index] += 1
    addPoints(newPoints)
  }
  const nextAnecdote=()=>{
    let randint = randomInt(anecdotes.length)
    while(randint === selected){
      randint = randomInt(anecdotes.length)
    }
    setSelected(randint)
  }
  const mostVotes = anecdotes[points.indexOf(Math.max(...points))]
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={()=>{vote(selected)}} text="Vote"/>
      <Button handleClick={nextAnecdote} text="Next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotes}</p>
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
