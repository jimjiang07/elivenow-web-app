import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import DeviceSelector from '../DeviceSelector'
import { DEVICE_TYPES } from "../../constants";

import './CheckInForm.css';

const CheckInForm = ({ cameraList, microphoneList, speakerList }) => {
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

        <DeviceSelector deviceType={DEVICE_TYPES.CAMERA} deviceList={cameraList}/>
        <DeviceSelector deviceType={DEVICE_TYPES.MICROPHONE} deviceList={microphoneList}/>
        <DeviceSelector deviceType={DEVICE_TYPES.SPEAKER} deviceList={speakerList}/>

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
  speakerList: [],
};

export default CheckInForm;

