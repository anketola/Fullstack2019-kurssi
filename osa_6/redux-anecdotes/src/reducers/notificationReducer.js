const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action)
      return action.notification
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const nullifyNotification  = () => {
  return {
      type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer