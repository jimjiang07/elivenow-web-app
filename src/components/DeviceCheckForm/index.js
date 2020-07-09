import React from 'react';
import DeviceCheckFormBase from './DeviceCheckFormBase'
import { useHistory } from 'react-router-dom';
import useDevices from "../../hooks/useDevices";

const DeviceCheckForm = () => {
  const deviceState = useDevices();
  const history = useHistory();

  const onDeviceConfirm = (event) => {
    event.preventDefault();
    console.log('onDeviceConfirm');
    history.push('/classroom');
  }

  return (
    <DeviceCheckFormBase devices={deviceState} onDeviceConfirm={onDeviceConfirm}/>
  )
}

export default DeviceCheckForm;