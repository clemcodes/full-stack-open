import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs.js'

import {
  useNotificationValue,
  useNotificationDispatch,
} from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()

  const blogVoteMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const message = useNotificationValue()
  const setMessage = useNotificationDispatch()

  const { data } = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  })

  const blogs = data || []

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const userJSON = JSON.parse(loggedUser)
      setUser(userJSON)
      blogService.setToken(userJSON.token)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userInDb = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(userInDb))
      blogService.setToken(userInDb.token)
      setUser(userInDb)
      setUsername('')
      setPassword('')
      setMessage({
        type: 'SHOW',
        payload: [`${username} logged in`, true],
      })
      setTimeout(() => {
        setMessage({
          type: 'REMOVE',
        })
      }, 5000)
    } catch (exception) {
      setUsername('')
      setPassword('')
      setMessage({
        type: 'SHOW',
        payload: ['Wrong credentials', false],
      })
      setTimeout(() => {
        setMessage({
          type: 'REMOVE',
        })
      }, 3000)
    }
  }

  const handleCreate = async (blogObject) => {
    await newBlogMutation.mutate(blogObject)
    setMessage('A new blog created!')
    setMessage({
      type: 'SHOW',
      payload: ['A new blog created!', true],
    })
    setTimeout(() => {
      setMessage({
        type: 'REMOVE',
      })
    }, 5000)
  }

  const updateBlog = async (blog) => {
    await blogVoteMutation.mutate(blog)
  }

  const removeBlog = async (id) => {
    await removeBlogMutation.mutate(id)
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
        {message && <Notification message={message} />}
        <h1>Log in to application</h1>
        <div>
          <label>
            username:{' '}
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password:{' '}
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button id="login-button">login</button>
      </form>
    )
  }

  const loggedInBlogs = () => {
    return (
      <div>
        {!user && loginForm()}
        <h2>blogs</h2>
        {message && <Notification message={message} />}
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <CreateBlog createBlog={handleCreate} />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user.username}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
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
