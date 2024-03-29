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
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }

  const showWhenVisible = {
    display: visible ? '' : 'none',
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>new blog</button>
      </div>
      <form style={showWhenVisible} onSubmit={handleCreate}>
        <h1>create new</h1>
        <div>
          <label>
            title:{' '}
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input
              id="author"
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="author"
            />
          </label>
        </div>
        <div>
          <label>
            url:{' '}
            <input
              id="url"
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="url"
            />
          </label>
        </div>
        <button id="create-blog">create</button>
      </form>
      <button style={showWhenVisible} onClick={() => setVisible(false)}>
        cancel
      </button>
    </div>
  )
}
