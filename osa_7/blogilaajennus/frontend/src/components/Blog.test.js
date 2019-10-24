import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('by default only the summary information is shown', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Random Author Guy',
    url: 'wwwplace',
    likes: 10,
    user: {
      username: 'Jimmy Jester'
    }
  }

  const user = {
    username: 'Timmy Tester'
  }

  const blogs = []
  const dummyFunction = () => {}

  const component = render(
    <Blog blog={blog} blogs={blogs} user={user} setBlogs={dummyFunction}/>
  )

  //component.debug()

  const summary = component.container.querySelector('.summary')
  expect(summary).toHaveTextContent('Test Blog Random Author Guy')
  expect(summary).not.toHaveTextContent('wwwplace')
  expect(summary).not.toHaveTextContent('like')
  expect(summary).not.toHaveTextContent('remove')
})

test('after clicking all information is shown', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Random Author Guy',
    url: 'wwwplace',
    likes: 10,
    user: {
      username: 'Jimmy Jester',
    }
  }

  const user = {
    username: 'Timmy Tester'
  }

  const blogs = []
  const dummyFunction = () => {}

  const component = render(
    <Blog blog={blog} blogs={blogs} user={user} setBlogs={dummyFunction}/>
  )

  const clickable = component.getByText('Test Blog Random Author Guy')
  fireEvent.click(clickable)

  // component.debug()

  const summary = component.container.querySelector('.summary')
  expect(summary).toHaveTextContent('Test Blog Random Author Guy')
  const details = component.container.querySelector('.details')
  expect(details).toHaveTextContent('wwwplace')
  expect(details).toHaveTextContent('like')
  expect(details).toHaveTextContent('remove')
})