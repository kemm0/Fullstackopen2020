import React,{ useState } from 'react'
const Blog = ({ blog, removeBlog, like, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewInfo, setViewInfo] = useState(false)

  const toggleVisibility = () => {
    setViewInfo(!viewInfo)
  }
  const remove = () => {
    removeBlog(blog)
  }
  const likeBlog = () => {
    like(blog)
  }
  if(viewInfo && (user.username === blog.user.username)){
    return(
      <li style={blogStyle}>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <button onClick={toggleVisibility}>close</button>
        <button onClick={remove}>delete</button>
      </li>
    )
  }
  else if (viewInfo){
    return(
      <li style={blogStyle}>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <button onClick={toggleVisibility}>close</button>
      </li>
    )
  }
  else{
    return(
      <li style={blogStyle}>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <button onClick={toggleVisibility}>view</button>
      </li>
    )
  }
}

export default Blog
