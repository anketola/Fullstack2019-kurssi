import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combReducer = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(combReducer)

const renderApp = () => {
  ReactDOM.render(
  <Provider store={store}>  
    <App />
  </Provider>,
  document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)