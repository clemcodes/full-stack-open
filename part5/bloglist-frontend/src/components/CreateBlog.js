import React, { useState } from 'react'

export const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleCreate = (e) => {
      e.preventDefault()
      props.createBlog({
        title,
        author,
        url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setVisible(false)
  }

  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>new blog</button>
      </div>
      <form style={showWhenVisible} onSubmit={handleCreate}>
          <h1>create new</h1>
          <div><label>title: <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /></label></div>
          <div><label>author: <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} /></label></div>
          <div><label>url: <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} /></label></div>
          <button>create</button>
      </form>
      <button style={showWhenVisible} onClick={() => setVisible(false)}>cancel</button>
    </div>
  )
}
