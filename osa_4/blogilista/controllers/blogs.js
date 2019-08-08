const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  try {  
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
    response.status(200).json(updatedBlog.toJSON())

    } catch (exception) {
      next (exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  //console.log(blog)
  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).send()
  }

  try { 
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter