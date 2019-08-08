const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('GET requests work as expected', () => {

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the identifying field id exists in JSON response', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
  })

  test('the JSON response does not contain _id field', async () => {
    const response = await helper.blogsInDb()
    expect(response[0]._id).not.toBeDefined()
  })
})

describe('POST works as intended', () => {

  test('A new blog can be added', async () => {
    
  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

  test('Blog count increases by one', async () => {
    
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
  })
    
  test('Correct blog is found in the database', async () => {
  
    await api
      .post('/api/blogs')
      .send(helper.newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)
    const listOfTitles = blogsAtEnd.map(n => n.title)
    //console.log(listOfTitles)
    expect(listOfTitles).toContain(helper.newBlog.title)
  })

  test('A new blog with no likes set defaults it to 0', async () => {

    const likelessBlog = await api
      .post('/api/blogs')
      .send(helper.newBlogNoLikes)
      .expect(201)
    
    expect(likelessBlog.body.likes).toBe(0)
  })

  test('A new blog entry requires a title and URL, otherwise status 400', async () => {
     
    await api
      .post('/api/blogs')
      .send(helper.blogNoTitleUrl)
      .expect(400)

  })

})

afterAll(() => {
  mongoose.connection.close()
})