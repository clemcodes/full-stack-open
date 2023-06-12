import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: '/test-url',
    likes: 0,
    user: {
      name: 'jaycee',
    },
  }

  it('renders blog\'s title and author initially but not url or number of likes', () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText('test blog test author')).toBeDefined()
    expect(screen.getByTestId('invisible')).toHaveStyle('display:none')
  })

  it('renders blog\'s url and likes when the view button is clicked', () => {
    render(<Blog blog={blog} />)

    const button = screen.getByText('view')
    userEvent.click(button)

    expect(screen.getByTestId('invisible')).toHaveStyle('display:block')
  })

  it('calls the event handler twice if button clicked twice', () => {
    const mockUpdateBlog = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

    const button = screen.getByText('view')
    userEvent.click(button)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})
