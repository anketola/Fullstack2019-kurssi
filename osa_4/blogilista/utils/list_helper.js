const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.lenght === 0
  ? 0
  : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (loop, next) => {
    return loop.likes > next.likes ? loop : next
  }
  return (blogs === undefined || blogs.length === 0)
  ? undefined
  : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  mostBlogsWritten = (_(blogs)
  .countBy('author')
  .entries()
  .max())

  if (mostBlogsWritten === undefined || mostBlogsWritten.length === 0) {
    return undefined
  }

  const resultsObject = {
    author: mostBlogsWritten[0],
    blogs: mostBlogsWritten[1]
  }

  // console.log(resultsObject)
  return resultsObject
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}