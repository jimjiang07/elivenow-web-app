import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './CheckInForm.css';

const CheckInForm = () => {
  return (
    <Form className='CheckInForm'>
      <Form.Group as={Row} controlId='formBasicEmail'>
        <Form.Label column lg='2'>Name:</Form.Label>
        <Form.Control column lg='5' type='name' placeholder='Enter your name' />
      </Form.Group>

      <Form.Group controlId='formBasicCheckbox'>
        <Form.Label>Role:</Form.Label>
        <Form.Check type='radio' label='teacher' />
        <Form.Check type='radio' label='student' />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Join Class
      </Button>
    </Form>
  )
}

export default CheckInForm;