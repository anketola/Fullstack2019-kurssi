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

module.exports = {
  dummy, totalLikes, favoriteBlog
}