import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'BLOG_INITIALIZE':
      return action.data
    case 'BLOG_ADD':
      return state.concat(action.data)
    case 'BLOG_LIKE':
      const stateWithLike = state.map(blog => blog.id === action.data.id ? action.data : blog)
      return stateWithLike
    case 'BLOG_REMOVE':
      const stateWithRemoved = state.filter(blog => blog.id !== action.data.id)
      return stateWithRemoved
    default:
      return state
  }
}

export const addNewBlog = (blog) => {
  return async dispatch => {
    const newBlogObject = await blogService.create(blog)
    dispatch({
      type: 'BLOG_ADD',
      data: newBlogObject
    })
  }
}

export const increaseLikes = (blog) => {
  return async dispatch => {
    const id = blog.id
    const blogUser = blog.user
    const updatedObject = {
      ...blog,
      user: blog.user._id,
      likes: blog.likes + 1 }
    const updatedBlogObject = await blogService.update(id, updatedObject)
    const deliverable = {
      ...updatedBlogObject,
      user: blogUser
    }
    dispatch({
      type: 'BLOG_LIKE',
      data: deliverable
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'BLOG_REMOVE',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_INITIALIZE',
      data: allBlogs
    })
  }
}

export default reducer