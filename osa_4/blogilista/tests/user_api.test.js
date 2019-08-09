const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObject = new User(helper.initialUser)
  await userObject.save()
})

describe('when there is initially one user at db', () => {

  test('creation succeeds with a fresh username that fulfills all criteria', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser123',
      name: 'New User',
      password: 'topsecret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: helper.initialUser.username,
      name: '123456789',
      password: 'topsecret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    //console.log(result.body.error)
    expect(result.body.error).toBe('Username already in use')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  
  test('user creation fails with proper status and error if username missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserNoUsername = {
      name: 'I has no usename',
      password: 'topsecret'
    }

    const result = await api
      .post('/api/users')
      .send(newUserNoUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed') 
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user creating fails with proper status and error if password missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserNoPassword = {
      name: 'I has no usename',
      username: 'Another Test Subject'
    }

    const result = await api
      .post('/api/users')
      .send(newUserNoPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('Password has to be included and be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('too short password rejected', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserShortPassword = {
      name: 'I has short password',
      username: 'YetAnotherTestSubject',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUserShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('Password has to be included and be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('too short username rejected', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserShortUsername = {
      name: 'I has short username',
      username: 'aa',
      password: '123456789'
    }

    const result = await api
      .post('/api/users')
      .send(newUserShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})