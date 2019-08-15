import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  blogTitle,
  blogAuthor,
  blogUrl
}) => {
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
        title:
          <input { ...blogTitle} />
        </div>
        <div>
        author:
          <input {...blogAuthor} />
        </div>
        <div>
        url:
          <input { ...blogUrl }/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  blogTitle: PropTypes.object.isRequired,
  blogAuthor: PropTypes.object.isRequired,
  blogUrl: PropTypes.object.isRequired
}

export default BlogForm
