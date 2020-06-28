import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './CheckInForm.css';

const CheckInForm = () => {
  return (
    <div class='container p-3'>
      <Form className='col-10 offset-1 col-md-6 offset-md-3 p-4 border border-primary rounded form-checkin'>
        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="name" className="col-4">Name:</Label>
          <Input type="text" name="name" id="name" className="col-8" placeholder="Enter your name" />
        </FormGroup>

        <FormGroup className="d-flex mb-4">
          <Label className="col-4">Role:</Label>
          <div className="col-8 d-flex align-items-center">
            <FormGroup check className="col-6">
              <Label check>
                <Input type="radio" name="user-role" />{' '}
                Teacher
              </Label>
            </FormGroup>
            <FormGroup check className="col-6">
              <Label check>
                <Input type="radio" name="user-role" />{' '}
                Student
              </Label>
            </FormGroup>
          </div>
        </FormGroup>

        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="camera" className="col-4">Camera:</Label>
          <Input type="select" name="select" id="camera" className="col-8">
            <option>FaceTime HD Camera (Built-in)</option>
          </Input>
        </FormGroup>

        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="microphone" className="col-4">Microphone:</Label>
          <Input type="select" name="select" id="microphone" className="col-8">
            <option>MacBook Pro Speakers</option>
          </Input>
        </FormGroup>

        <Button color="primary" className="col-6 offset-3">Join class</Button>
      </Form>
    </div>
  )
}

export default CheckInForm;