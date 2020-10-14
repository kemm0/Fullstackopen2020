import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exercises_array = course.parts.map((part) => part.exercises)
    const sum = exercises_array.reduce((a,b) => a+b)
  
    return(
      <p><b>Total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) =>
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  
  const Course =({course}) => {
    return(
      <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
    )
  }

  export default Course