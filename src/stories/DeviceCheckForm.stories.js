import React from 'react';
import DeviceCheckForm from '../components/DeviceCheckForm';

export default {
  title: 'DeviceCheckForm',
  component: DeviceCheckForm,
  excludeStories: /.*Data$/,
};

export const withDevicesData = {
  cameraList: [
    {
      name: 'Facetime HD Camera (Built-in)',
      value: 'Facetime HD Camera (Built-in)',
    }
  ],
  microphoneList: [
    {
      name: 'MacBook Pro Microphone (Built-in)',
      value: 'MacBook Pro Microphone (Built-in)',
    }
  ]
}

export const withNoDevices = () => <DeviceCheckForm/>;
export const withDevices = () => <DeviceCheckForm {...withDevicesData}/>;