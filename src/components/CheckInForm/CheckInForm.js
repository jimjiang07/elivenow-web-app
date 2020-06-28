import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './CheckInForm.css';

const CheckInForm = ({ cameraList, microphoneList }) => {
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
                <Input type="radio" name="user-role" checked/>{' '}
                Student
              </Label>
            </FormGroup>
            <FormGroup check className="col-6">
              <Label check>
                <Input type="radio" name="user-role"/>{' '}
                Teacher
              </Label>
            </FormGroup>
          </div>
        </FormGroup>

        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="camera" className="col-4">Camera:</Label>
          <Input type="select" name="select" id="camera" className="col-8">
            {
              cameraList.length > 0
                ? cameraList.map(({ name, value }) => (<option value={value}>{name}</option>))
                : <option value="" disabled selected>No camera is detected</option>
            }
          </Input>
        </FormGroup>

        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="microphone" className="col-4">Microphone:</Label>
          <Input type="select" name="select" id="microphone" className="col-8">
            {
              microphoneList.length > 0
                ? microphoneList.map(({ name, value }) => (<option value={value}>{name}</option>))
                : <option value="" disabled selected>No microphone is detected</option>
            }
          </Input>
        </FormGroup>

        <Button color="primary" className="col-6 offset-3">Join class</Button>
      </Form>
    </div>
  )
}

CheckInForm.propTypes = {
  cameraList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  microphoneList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }))
}

CheckInForm.defaultProps = {
  cameraList: [],
  microphoneList: [],
};

export default CheckInForm;

