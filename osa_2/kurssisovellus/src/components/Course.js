import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}
  
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}
  
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
    )
}
  
const Total = ({ parts }) => {
  const count = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <div>
      <p>
        <strong>total of {count} exercises</strong>
      </p>
    </div>
  )
}
  
const Course = ({ course }) => {
  return (
    <div>
      <Header course={ course } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

export default Course