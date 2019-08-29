const notifyReducer = (state = stateAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
    }
}

const stateAtStart = {
  message: '',
  etype: 'notification'
}

export const resetNotification = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_NOTIFICATION',
      notification: stateAtStart
    })
  }  
}


export const changeNotification = (message, etype) => {
  const deliverable = {
    message,
    etype
  }
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: deliverable
    })
    setTimeout(() => {
      dispatch({
          type: 'RESET_NOTIFICATION'
        })
    }, 5000)
  }
}


export default notifyReducer