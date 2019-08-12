import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <button onClick={() => console.log('pressed like')}>
          like
        </button> <br />
        added by {blog.user.name}
      </div>
  </div>
  )
}

export default Blog