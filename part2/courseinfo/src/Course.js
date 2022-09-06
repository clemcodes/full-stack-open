export const Course = ({course}) => {

    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total sum={total} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return <h2>{course}</h2>
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Total = ({ sum }) => <b>total of {sum} exercises</b>