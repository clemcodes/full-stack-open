import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageIsFailure, setMessageIsFailure] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const userJSON = JSON.parse(loggedUser)
      setUser(userJSON)
      blogService.setToken(userJSON.token)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userInDb = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(userInDb))
      blogService.setToken(userInDb.token)
      setUser(userInDb)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageIsFailure(true)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

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
    setMessage('A new blog created!')
    setMessageIsFailure(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {message && <Notification message={message} messageIsFailure={messageIsFailure} />}
        <h1>Log in to application</h1>
        <div><label>username: <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></label></div>
        <div><label>password: <input  type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label></div>
        <button>login</button>
      </form>
    )
  }

  const loggedInBlogs = () => {
    return (
      <div>
        {!user && loginForm()}
        <h2>blogs</h2>
        {message && <Notification message={message} messageIsFailure={messageIsFailure} />}
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <CreateBlog handleCreate={handleCreate} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && loggedInBlogs()}
    </div>
  )
}

export default App