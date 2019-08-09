const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Eka blogi',
      author: 'kirjoittaja 1',
      url: 'www.jotain.jotain',
      likes: 3
    },
    {
      title: 'Toka blogi',
      author: 'kirjoittaja 2',
      url: 'www.jotainjotain.jotain',
      likes: 1
    }
  ]

const initialUser = {
  username: "Testitunnus",
  name: "Timo Testaaja",
  password: "salasana123"
}

const newBlog = {
  title: 'Uusi blogi',
  author: 'Kirjoittaja 3',
  url: 'www.blaah.blaah',
  likes: 0
}

const newBlogNoLikes = {
  title: 'Uusi blogi ilman like',
  author: 'Kirjoittaja 4',
  url: 'www.blaah.bla'
}

const blogNoTitleUrl = {
  author: 'Kirjoittaja 5',
  likes: 4
}

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, newBlog, newBlogNoLikes, blogNoTitleUrl, usersInDb, initialUser
  }