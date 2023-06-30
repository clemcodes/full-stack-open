import { useState, useEffect } from 'react'
import Menu from './components/Menu'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs.js'
import usersService from './services/users.js'

import { Routes, Route, useMatch } from 'react-router-dom'

import {
  useNotificationValue,
  useNotificationDispatch,
} from './NotificationContext'

import { useLoginValue, useLoginDispatch } from './LoginContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()

  const blogVoteMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const blogCommentMutation = useMutation(
    (data) => blogService.comment(data.id, data.comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const user = useLoginValue()
  const setUser = useLoginDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const message = useNotificationValue()
  const setMessage = useNotificationDispatch()

  const { data } = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  })

  const blogs = data || []

  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  const match = useMatch('/users/:id')
  const individual = match
    ? users.find((user) => user.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const userJSON = JSON.parse(loggedUser)
      setUser({
        type: 'SET',
        data: loggedUser,
      })
      blogService.setToken(userJSON.token)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userInDb = await loginService.login({ username, password })
      setUser({ type: 'SET', payload: userInDb })
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

  const addComment = async (id, comment) => {
    await blogCommentMutation.mutate({ id, comment })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser({ type: 'REMOVE' })
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
              type="password"
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

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <>
          <Menu />
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
          <h1>Blog App</h1>
          <CreateBlog createBlog={handleCreate} />
          <Blogs blogs={blogs} />
        </>
      )}
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={individual} />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog blog={blog} updateBlog={updateBlog} addComment={addComment} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
