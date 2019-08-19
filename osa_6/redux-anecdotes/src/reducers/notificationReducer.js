const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action)
      return action.data
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = ( notificationMessage, secondsDelay ) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notificationMessage
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 1000 * secondsDelay)
  }
}
  


export default notificationReducer