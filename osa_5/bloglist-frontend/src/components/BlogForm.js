import React from 'react'

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
      <h2>create</h2>
    
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

export default BlogForm
