import React, { useState } from 'react'
import blogService from '../services/blogs'

export const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    const newObj = {
        title,
        author,
        url
    }
    blogService.create(newObj)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
        <h1>create new</h1>
        <div><label>title: <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /></label></div>
        <div><label>author: <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} /></label></div>
        <div><label>url: <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} /></label></div>
        <button>create</button>
    </form>
  )
}
