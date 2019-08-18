import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
// import { notificationChange } from './reducers/notificationReducer'

const combReducer = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(combReducer)

console.log(store.getState())
//store.dispatch(notificationChange('sds'))
//console.log(store.getState())

const renderApp = () => {
  ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)