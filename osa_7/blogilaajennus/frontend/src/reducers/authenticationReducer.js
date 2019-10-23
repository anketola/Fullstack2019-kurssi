import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const setUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }  
}

export const handleUserLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'USER_LOGOUT'
    })
  }

}

export default reducer