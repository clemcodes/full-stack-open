import { useState } from "react"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={ showWhenVisible }>
      {blog.author} {blog.url} {blog.likes}
      </div>   
    </div>   
  )
}

export default Blog