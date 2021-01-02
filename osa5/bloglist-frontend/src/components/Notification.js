import React from 'react'

const Notification = ({ notification }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightGrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const successStyle = {
    color: 'green',
    background: 'lightGrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (notification === null) {
    return null
  }
  if(notification.type === 'error'){
    return (
      <div className="error" style = {errorStyle}>
        {notification.message}
      </div>
    )
  }
  else{
    return (
      <div className="error" style = {successStyle}>
        {notification.message}
      </div>
    )
  }
}

export default Notification