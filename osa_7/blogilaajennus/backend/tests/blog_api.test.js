const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const newUser = new User(helper.initialUser)
  await newUser.save()

  let blogObject = new Blog(helper.initialBlogs[0])
  blogObject.user = newUser._id
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
  const usersAtStart = await helper.usersInDb()
  const user = usersAtStart[0]
  const dummyForToken = {
    username: user.username,
    id: user.id
  }
  const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${dummyToken}`)
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

  test('Blog count increases by one', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]
    const dummyForToken = {
      username: user.username,
      id: user.id
    }
    const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(helper.newBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
  })
    
  test('Correct blog is found in the database', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]
    const dummyForToken = {
      username: user.username,
      id: user.id
    }
    const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(helper.newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)
    const listOfTitles = blogsAtEnd.map(n => n.title)
    //console.log(listOfTitles)
    expect(listOfTitles).toContain(helper.newBlog.title)
  })

  test('A new blog with no likes set defaults it to 0', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]
    const dummyForToken = {
      username: user.username,
      id: user.id
    }
    const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

    const likelessBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(helper.newBlogNoLikes)
      .expect(201)
    
    expect(likelessBlog.body.likes).toBe(0)
  })

  test('A new blog entry requires a title and URL, otherwise status 400', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]
    const dummyForToken = {
      username: user.username,
      id: user.id
    }
    const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .send(helper.blogNoTitleUrl)
      .set('Authorization', `bearer ${dummyToken}`)
      .expect(400)

  })

})

describe('Deleting a post works as intended by one', () => {
  test('Deleting one blog reduces blog count', async () => {
    
    const blogsInDatabase = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]
    const dummyForToken = {
      username: user.username,
      id: user.id
    }
    const dummyToken = jwt.sign(dummyForToken, process.env.SECRET)

    await api
      .delete(`/api/blogs/${blogsInDatabase[0].id}`)
      .set('Authorization', `bearer ${dummyToken}`)
      .expect(204)

    const countAfterTest = await helper.blogsInDb()
    expect(countAfterTest.length).toBe(blogsInDatabase.length - 1)
  })
})

describe('PUT modifies blog likes', () => {
  test('Possible to change likes in a blog', async () => {
    const blogsInDatabase = await helper.blogsInDb()
    const modifiable = blogsInDatabase[0]
    
    const updatedBlog = { 
      ...modifiable,
      likes: 10
    }

    await api
      .put(`/api/blogs/${modifiable.id}`)
      .send(updatedBlog)
      .expect(200)
    
    const blogsInDatabaseAfter = await helper.blogsInDb()
    const likesForFirstEntryAfter = blogsInDatabaseAfter[0].likes

    expect(likesForFirstEntryAfter).toBe(10)

  })
})

afterAll(() => {
  mongoose.connection.close()
})