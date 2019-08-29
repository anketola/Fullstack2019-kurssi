import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

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

test('function called twice when clicked twice', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
  
})
