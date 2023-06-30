import React from 'react'
import PropTypes from 'prop-types'

export const Notification = ({ message }) => {
  const notificationStyle = {
    color: message[1] ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return message[0] && <div style={notificationStyle}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.array.isRequired,
}
