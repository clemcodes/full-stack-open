import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CreateBlog } from './CreateBlog'
import userEvent from '@testing-library/user-event'

describe('<CreateBlog />', () => {
  it('checks that the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockCreateBlog = jest.fn()

    render(<CreateBlog createBlog={mockCreateBlog} />)

    const button = screen.getByText('new blog')
    userEvent.click(button)
    userEvent.type(screen.getByPlaceholderText('title'), 'test blog')
    userEvent.type(screen.getByPlaceholderText('author'), 'test author')
    userEvent.type(screen.getByPlaceholderText('url'), '/test-url')

    const createBtn = screen.getByText('create')
    userEvent.click(createBtn)

    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'test blog',
      author: 'test author',
      url: '/test-url',
    })
  })
})
