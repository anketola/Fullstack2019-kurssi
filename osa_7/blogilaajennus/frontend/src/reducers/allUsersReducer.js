import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    const allUsers = await userService.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: allUsers
    })
  }
}

export default reducer