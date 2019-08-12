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
    const updatedObject = {
      ...blog,  
      user: blog.user._id,
      likes: blog.likes + 1 }
    const updatedBlogObject = await blogService.update(id, updatedObject)
    setBlogs(blogs.filter(previtem => previtem.id !== blog.id).concat(updatedBlogObject))
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
        added by {blog.user.name}
      </div>
  </div>
  )
}

export default Blog