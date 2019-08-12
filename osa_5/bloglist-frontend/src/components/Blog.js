import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikePress = async () => {
    const id = blog.id
    const blogUser = blog.user
    const updatedObject = {
      ...blog,  
      user: blog.user._id,
      likes: blog.likes + 1 }
    const updatedBlogObject = await blogService.update(id, updatedObject)
    setBlogs(blogs.filter(previtem => previtem.id !== blog.id).concat({...updatedBlogObject, user: blogUser}))
  }

  const handleRemove = async () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(items => items.id !== blog.id))
    }
  }

  if (visible === false) {

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
    </div>
  )
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author} <br />
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes
        <button onClick={handleLikePress}>
          like
        </button> <br />
        added by {blog.user.name} <br />
        <button onClick={handleRemove}>
          remove
        </button>
      </div>
  </div>
  )
}

export default Blog