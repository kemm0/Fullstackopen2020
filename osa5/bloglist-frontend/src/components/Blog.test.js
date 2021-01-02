import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('only title and author showed by default', () => {
  const title = 'Testiblogi'
  const author = 'Pekka'
  const url = 'asd.com'
  const likes = 3
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: {
      username: 'Pekka'
    }
  }
  const user = {
    username: 'Pekka'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )
  component.debug()

  expect(component.container).toHaveTextContent(
    `title: ${title}author: ${author}view`
  )
})
test('url and likes show when view-button is pressed', () => {
  const title = 'Testiblogi'
  const author = 'Pekka'
  const url = 'asd.com'
  const likes = 3
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: {
      username: 'Pekka'
    }
  }
  const user = {
    username: 'Pekka'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )
  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    `title: ${title}author: ${author}url: ${url}likes: ${likes} likeclosedelete`
  )
})
test('like button fires event correctly', () => {
  const title = 'Testiblogi'
  const author = 'Pekka'
  const url = 'asd.com'
  const likes = 3
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: {
      username: 'Pekka'
    }
  }
  const user = {
    username: 'Pekka'
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} like={mockHandler}/>
  )
  component.debug()

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})