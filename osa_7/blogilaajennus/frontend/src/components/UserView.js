import React from 'react'

const UserView = (props) => {
    if (props.user === undefined) { 
        return null
      }

    const blogItem = (blog) => {
        return(
            <li>{blog.title}</li>
        )
    }

    return(
        <div>
            <h2>{props.user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {props.user.blogs.map(blog => blogItem(blog))}
            </ul>

        </div>
    )
}

export default UserView