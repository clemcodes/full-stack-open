import React from 'react'
import PropTypes from 'prop-types'

export const Notification = ({ message, messageIsFailure }) => {
  const notificationStyle = {
    color: messageIsFailure ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message === null){
    return null
  }

  return (
    <div style={notificationStyle}>{message}</div>

  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageIsFailure: PropTypes.bool.isRequired
}