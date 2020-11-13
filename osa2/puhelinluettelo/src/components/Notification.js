import React from 'react'

const Notification = ({message,messageColor}) => {
    const notificationStyle = {
      color: messageColor,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    if (message.length === 0) {
      return null
    }
  
    return (
      <div style = {notificationStyle}>
        {message}
      </div>
    )
  }

export default Notification