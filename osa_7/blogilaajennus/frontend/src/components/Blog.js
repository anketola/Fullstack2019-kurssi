import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBlog, increaseLikes } from '../reducers/blogReducer'

const Blog = (props) => {

  const blog = props.blog
  const user = props.user

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonVisible = { display: user.username === blog.user.username ? '' : 'none' }

  const handleLikePress = async () => {
    props.increaseLikes(blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog)
    }
  }

  if (visible === false) {

    return (
      <div className="blogitem">
        <div style={blogStyle} className="summary">
          <div onClick={() => setVisible(!visible)}>
            {blog.title} {blog.author} <br />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blogitem">
      <div style={blogStyle} className="summary">
        <div onClick={() => setVisible(!visible)}>
          {blog.title} {blog.author} <br />
        </div>
        <div className="details">
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} likes
          <button onClick={handleLikePress}>
          like
          </button> <br />
        added by {blog.user.name} <br />
          <button style={removeButtonVisible} onClick={handleRemove}>
          remove
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
const mapDispatchToProps = {
  removeBlog,
  increaseLikes
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlog