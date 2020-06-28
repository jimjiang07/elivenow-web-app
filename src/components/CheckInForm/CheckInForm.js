import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { USER_ROLES } from '../../constants'

import './CheckInForm.css';

const CheckInForm = ({ onCheckInSubmit }) => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(USER_ROLES.STUDENT);

  return (
    <div className='container p-3'>
      <Form className='col-10 offset-1 col-md-6 offset-md-3 p-4 border border-primary rounded form-checkin' onSubmit={(event) => {
        event.preventDefault();
        onCheckInSubmit({ userName, userRole });
      }}>
        <FormGroup className="d-flex align-items-center mb-4">
          <Label for="name" className="col-4">Name:</Label>
          <Input type="text" name="name" id="name" className="col-8" placeholder="Enter your name" onChange={event => setUserName(event.target.value)}/>
        </FormGroup>
        <FormGroup className="d-flex mb-4">
          <Label className="col-4">Role:</Label>
          <div className="col-8 d-flex align-items-center">
            <FormGroup check className="col-6">
              <Label check>
                <Input type="radio" name="user-role" defaultChecked onClick={() => setUserRole(USER_ROLES.STUDENT)}/>{' '}
                Student
              </Label>
            </FormGroup>
            <FormGroup check className="col-6">
              <Label check>
                <Input type="radio" name="user-role" onClick={() => setUserRole(USER_ROLES.TEACHER)}/>{' '}
                Teacher
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <Button color="primary" className="col-6 offset-3" disabled={!userName || !userRole}>Join class</Button>
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
  speakerList: [],
};

export default CheckInForm;

