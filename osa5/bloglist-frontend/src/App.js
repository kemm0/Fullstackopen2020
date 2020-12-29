import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/login' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  //useEffect(() => {
  //  blogService.getAll().then(blogs =>
  //    setBlogs( blogs )
  //  )  
  //}, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    let loggedUser = null
    try {
      loggedUser = await loginService.login({
        username, password,
      })
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
    } catch (exception) {
      console.log('error')
      notify('Wrong username or password','error')
    }
    if(loggedUser !== null){
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log(blogObject)
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      notify(`Added "${returnedBlog.title}" by ${returnedBlog.author}`)
    })
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogsList = () => (
    <div>
      <ul>
        {blogs.map((blog, i) => 
          <Blog
            key={i}
            blog={blog} 
          />
        )}
      </ul>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
    
  )

  return (
    <div>
    <h2>Blogs</h2>  
    <Notification notification={notification}/>
    {user === null ?
      loginForm() :
      <div>
        <p>logged in as {user.name} <button onClick={handleLogOut}>logout</button></p>
        {blogsList()}
      </div>
    }
    </div>
  )
}

export default App