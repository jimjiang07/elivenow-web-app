import React from 'react'
import { Button, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import DeviceSelector from '../DeviceSelector'
import useDevices from "../../hooks/useDevices";
import { DEVICE_TYPES } from "../../constants";

const DeviceCheckForm = () => {
  const deviceState = useDevices();
  const history = useHistory();

  const onDeviceConfirm = (event) => {
    event.preventDefault();
    console.log('onDeviceConfirm');
    history.push('/classroom');
  }

  return (
    <div className='container p-3'>
    <Form className='col-10 offset-1 col-md-6 offset-md-3 p-4 border border-primary rounded form-checkin' onSubmit={onDeviceConfirm}>
      <h5 className='col-12 mb-4'>Please select the input and output sources:</h5>
      <DeviceSelector deviceType={DEVICE_TYPES.CAMERA} deviceList={deviceState.cameraList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.MICROPHONE} deviceList={deviceState.microphoneList}/>
      <DeviceSelector deviceType={DEVICE_TYPES.SPEAKER} deviceList={deviceState.speakerList}/>
      <Button color="primary" className="col-6 offset-3">Confirm</Button>
    </Form>
  </div>
  )
}

export default DeviceCheckForm;