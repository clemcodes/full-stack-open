const Blog = ({ blog, updateBlog }) => {
  if (!blog) {
    return null
  }

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
    </div>
  )
}

export default Blog
