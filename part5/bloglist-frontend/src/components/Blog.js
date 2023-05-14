import { useState } from "react"
import blogService from '../services/blogs'

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

  const handleLikes = () => {
    const updatedBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={ showWhenVisible }>
      <div>{blog.url}</div> 
      <div>{blog.likes}<button onClick={handleLikes}>like</button></div> 
      <div>{blog.user.name}</div>
      </div>   
    </div>   
  )
}

export default Blog