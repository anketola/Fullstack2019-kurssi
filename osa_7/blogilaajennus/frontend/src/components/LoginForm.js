import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'


const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control id="username" type="text" {...username}/>
        <Form.Label>password</Form.Label>
        <Form.Control id="cy-password" type="password" {...password}/>
        <Button variant="primary" type="submit">login</Button>
      </Form.Group>
    </Form>

  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm