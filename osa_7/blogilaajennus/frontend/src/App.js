import React, { useEffect } from 'react'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import { useField } from './hooks'
import { changeNotification } from './reducers/notifyReducer'
import { connect } from 'react-redux'
import { initializeBlogs, addNewBlog } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/allUsersReducer'
import { setUser, handleUserLogout } from './reducers/authenticationReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const App = (props) => {
  const username = useField('username')
  const password = useField('password')
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
 
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeAllUsers()
  }, [])

  useEffect(() => {
    props.setUser()
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
      props.setUser(user)
      username.reset()
      password.reset()
      props.changeNotification('Logged in successfully', 'notification')
      } catch (exception) {
      props.changeNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    props.handleUserLogout()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlogObject = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      user: props.user
    }
    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
    props.addNewBlog(newBlogObject)
    props.changeNotification(`a new blog ${newBlogObject.title} by ${newBlogObject.author} has been successfully added`, 'notification')
  }
  
  if (props.user === null) {
    return (
      <div className="loginarea">
        <h2>Log in to application</h2>
        <Notification />
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
      
      <Notification />
      <p>
        {props.user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>


      <Router>
        
        <Route exact path="/" render={() =>
            <div>  
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
              {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} user={props.user}/>
              )}
              </div>
            </div>
      } />
    <Route exact path="/users" render={({ match }) => <UsersView path={match.path}/>} />
    <Route exact path="/users/:id" render={({ match }) => <UserView path={match.path}
        user={props.users.find(user => user.id == match.params.id)}/>} />
      </Router>
  </div>
  )
}

const mapDispatchToProps = {
  changeNotification,
  initializeBlogs,
  addNewBlog,
  initializeAllUsers,
  setUser,
  handleUserLogout
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
