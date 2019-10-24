import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notifyReducer'
import blogReducer from './reducers/blogReducer'
import allUsersReducer from './reducers/allUsersReducer'
import authenticationReducer from './reducers/authenticationReducer'

const combReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: allUsersReducer,
  user: authenticationReducer
})

const store = createStore(combReducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store