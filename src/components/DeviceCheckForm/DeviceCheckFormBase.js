import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import DeviceSelector from '../DeviceSelector';
import { DEVICE_TYPES } from "../../constants";

const DeviceCheckFormBase = ({ onDeviceConfirm, devices }) => {
  return (
  <div className='container p-3'>
    <Form className='col-10 offset-1 col-md-6 offset-md-3 p-4 form-checkin' onSubmit={onDeviceConfirm}>
      <h5 className='col-12 mb-4'>Please select the input and output sources:</h5>
      <DeviceSelector deviceType={DEVICE_TYPES.CAMERA} deviceList={devices.cameraList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.MICROPHONE} deviceList={devices.microphoneList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.SPEAKER} deviceList={devices.speakerList}/>
      <Button color="primary" className="col-6 offset-3">Confirm</Button>
    </Form>
  </div>
  )
}

const DeviceType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
})

DeviceCheckFormBase.propTypes = {
  onDeviceConfirm: PropTypes.func,
  devices: PropTypes.shape({
    cameraList: PropTypes.arrayOf(DeviceType),
    microphoneList: PropTypes.arrayOf(DeviceType),
    speakerList: PropTypes.arrayOf(DeviceType),
  })
}

DeviceCheckFormBase.defaultProps = {
  onDeviceConfirm: () => {},
  devices: {},
}

export default DeviceCheckFormBase
