import React from 'react'
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import DeviceSelector from '../DeviceSelector'
import useDevices from "../../hooks/useDevices";
import { DEVICE_TYPES } from "../../constants";

const DeviceCheckForm = ({ cameraList, microphoneList, speakerList }) => {
  const deviceState = useDevices();

  return (
    <div className='container p-3'>
    <Form className='col-10 offset-1 col-md-6 offset-md-3 p-4 border border-primary rounded form-checkin'>
      <h5 className='col-12 mb-4'>Please select the input and output sources:</h5>
      <DeviceSelector deviceType={DEVICE_TYPES.CAMERA} deviceList={deviceState.cameraList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.MICROPHONE} deviceList={deviceState.microphoneList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.SPEAKER} deviceList={deviceState.speakerList}/>
      <Button color="primary" className="col-6 offset-3">Confirm</Button>
    </Form>
  </div>
  )
}

DeviceCheckForm.propTypes = {
  cameraList: PropTypes.arrayOf(PropTypes.shape(DeviceSelector.propTypes)),
  microphoneList: PropTypes.arrayOf(PropTypes.shape(DeviceSelector.propTypes)),
  speakerList: PropTypes.arrayOf(PropTypes.shape(DeviceSelector.propTypes)),
}

DeviceCheckForm.defaultProps = {
  cameraList: [],
  microphoneList: [],
  speakerList: [],
};

export default DeviceCheckForm;