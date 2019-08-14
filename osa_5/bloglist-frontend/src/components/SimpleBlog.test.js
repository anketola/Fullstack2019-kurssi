import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 5
  }

  const tempClickHandler = () => {

  }

  const component = render(
    <SimpleBlog blog={blog} onClick={tempClickHandler}/>
  )

  // component.debug()

  const testTitle = component.container.querySelector('.title')
  const testAuthor = component.container.querySelector('.author')
  const testLikes = component.container.querySelector('.likes')

  expect(testTitle).toHaveTextContent('Test Title')
  expect(testAuthor).toHaveTextContent('Test Author')
  expect(testLikes).toHaveTextContent('5')
})