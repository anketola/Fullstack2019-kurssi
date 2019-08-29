import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)  
  const message = props.notification.message
  const type = props.notification.etype

    if (message === '') {
      return null
    } else {
      return (
        <div className={type}>
          {message}
        </div>
      )
  }
}

const mapStatetoProps = (state) => {
  console.log('state ', state)
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStatetoProps)(Notification)

export default ConnectedNotification