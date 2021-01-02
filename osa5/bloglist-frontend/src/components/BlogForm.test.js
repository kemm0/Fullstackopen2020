import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form inputs work as intended', () => {
  const title = 'Testiblogi'
  const author = 'Pekka'
  const url = 'asd.com'

  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  component.debug()

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: `${title}` }
  })
  fireEvent.change(authorInput, {
    target: { value: `${author}` }
  })
  fireEvent.change(urlInput, {
    target: { value: `${url}` }
  })
  fireEvent.submit(form)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe(`${title}`)
  expect(createBlog.mock.calls[0][0].author).toBe(`${author}`)
  expect(createBlog.mock.calls[0][0].url).toBe(`${url}`)
})