import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = (props) => {
  
    const userItem = (user) => {
      return(
        <tr key={user.id}>
          <td>
            <Link to={`${props.path}/${user.id}`}>{user.name}</Link>
          </td>
          <td>
            {user.blogs.length}
          </td>
        </tr>
      )
    }
  
    return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>name</strong></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {props.users.map(user => userItem(user))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      users: state.users
    }
  }

const ConnectedUsersView = connect(mapStateToProps, null)(UsersView)

export default ConnectedUsersView