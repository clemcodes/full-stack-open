import { useState } from 'react'

const Blog = ({ blog, updateBlog, addComment }) => {
  if (!blog) {
    return null
  }

  const [comment, setComment] = useState('')

  const handleLikes = () => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog)
  }

  const handleComment = () => {
    addComment(blog.id, comment)
    setComment('')
  }

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div data-testid="invisible">
        <div>{blog.url}</div>
        <div id="likes">
          likes {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      <div>
        <h2>comments:</h2>

        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={handleComment}>add comment</button>

        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
