import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  
  const message = props.notification
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message === '') {
    return (
      <div></div>
    )
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification) 

export default ConnectedNotification