import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notifyReducer'

const combReducer = combineReducers({
    notification: notificationReducer
  })

const store = createStore(combReducer, 
  composeWithDevTools(applyMiddleware(thunk)))

export default store