import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({
  handleSubmit,
  blogTitle,
  blogAuthor,
  blogUrl
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" { ...blogTitle}/>
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" {...blogAuthor}/>
        <Form.Label>Url</Form.Label>
        <Form.Control type="text" { ...blogUrl }/>
        <Button variant="primary" type="submit">create</Button>
      </Form.Group>
    </Form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  blogTitle: PropTypes.object.isRequired,
  blogAuthor: PropTypes.object.isRequired,
  blogUrl: PropTypes.object.isRequired
}

export default BlogForm
