import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/__mocks__/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user is logged, blog entries are not rendered but login form visible', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    //component.debug()
    expect(component.container.querySelector('.loginarea')).toBeDefined()
    const blogs = component.container.querySelector('.blogitem')
    expect(blogs).toBe(null)

  })

  /* test('if user is logged, blogs are visible', async ()  => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    //component.debug()
    await waitForElement(
      () => component.container.querySelector('.bloglistings')

    )
    component.debug()
    const blogs = component.container.querySelector('.blogitem')
    //expect(blogs.length).toBe(2)

  })
*/
})