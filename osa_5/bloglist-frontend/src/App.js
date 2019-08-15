import React, { useState, useEffect } from 'react'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'

const Notification = ( { message, type } ) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={type}>
        {message}
      </div>
    )
  }
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const username = useField('username')
  const password = useField('password')
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setMessageType('notification')
      setMessage('Logged in successfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlogObject = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value
    }

    const addedBlog = await blogService.create(newBlogObject)
    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
    //console.log(addedBlog)
    const newBlog = {
      ...addedBlog,
      user: user
    }
    //console.log(newBlog)
    setBlogs(blogs.concat(newBlog))

    setMessageType('notification')
    setMessage(`a new blog ${newBlogObject.title} by ${newBlogObject.author} has been successfully added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div className="loginarea">
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType}/>
        <LoginForm
          handleSubmit={handleLogin}
          username={username.withoutReset()}
          password={password.withoutReset()}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>

      <h2>create new</h2>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          handleSubmit={addBlog}
          blogTitle={blogTitle.withoutReset()}
          blogAuthor={blogAuthor.withoutReset()}
          blogUrl={blogUrl.withoutReset()}
        />
      </Togglable>
      <div className="bloglistings">
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
      )}
      </div>
    </div>
  )
}

export default App
