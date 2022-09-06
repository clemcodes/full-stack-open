const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = ({sum}) => {
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
      </div>
    </div>
  )
}

export default App
