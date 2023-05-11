import React from 'react'

export const CreateBlog = (props) => {

  return (
    <form onSubmit={props.handleCreate}>
        <h1>create new</h1>
        <div><label>title: <input type="text" name="title" value={props.title} onChange={(e) => props.setTitle(e.target.value)} /></label></div>
        <div><label>author: <input type="text" name="author" value={props.author} onChange={(e) => props.setAuthor(e.target.value)} /></label></div>
        <div><label>url: <input type="text" name="url" value={props.url} onChange={(e) => props.setUrl(e.target.value)} /></label></div>
        <button>create</button>
    </form>
  )
}
