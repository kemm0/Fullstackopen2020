import React, {useState} from 'react'
const Blog = ({ blog, updateBlog, removeBlog, user }) => {

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
  const like = () => {
    const likedBlog = {...blog}
    console.log(likedBlog)
    console.log(likedBlog.id)
    likedBlog.likes = blog.likes + 1
    updateBlog(likedBlog)
  }
  const remove = () => {
    removeBlog(blog)
  }
  if(viewInfo && (user.username === blog.user.username)){
    return(
      <div style={blogStyle}>
        <ul>
          <li>title: {blog.title} <button onClick={toggleVisibility}>close</button></li>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes} <button onClick={like}>like</button></li>
        </ul>
        <button onClick={remove}>delete</button>
      </div>
    )
  }
  else if (viewInfo){
    return(
      <div style={blogStyle}>
        <ul>
          <li>title: {blog.title} <button onClick={toggleVisibility}>close</button></li>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes} <button onClick={like}>like</button></li>
        </ul>
      </div>
    )
  }
  else{
    return(
      <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>view</button>
    </div>
    )
  }
}

export default Blog
