import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  blogTitle,
  blogAuthor,
  blogUrl,
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogUrlChange
}) => {
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
        title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={handleBlogUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired,
  blogUrl: PropTypes.string.isRequired,
  handleBlogTitleChange: PropTypes.func.isRequired,
  handleBlogAuthorChange: PropTypes.func.isRequired,
  handleBlogUrlChange: PropTypes.func.isRequired,
}

export default BlogForm
