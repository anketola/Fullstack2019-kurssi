const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Eka blogi',
      author: 'kirjoittaja 1',
      url: 'www.jotain.jotain',
      likes: 3
    },
    {
      title: 'Tka blogi',
      author: 'kirjoittaja 2',
      url: 'www.jotainjotain.jotain',
      likes: 1
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }