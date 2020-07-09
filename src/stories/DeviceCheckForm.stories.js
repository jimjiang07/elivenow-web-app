import React from 'react';
import DeviceCheckFormBase from '../components/DeviceCheckForm/DeviceCheckFormBase';

export default {
  title: 'DeviceCheckFormBase',
  component: DeviceCheckFormBase,
  excludeStories: /.*Data$/,
};

export const withDevicesData = {
  cameraList: [
    {
      label: 'Facetime HD Camera (Built-in)',
      value: 'Facetime HD Camera (Built-in)',
    }
  ],
  microphoneList: [
    {
      label: 'MacBook Pro Microphone (Built-in)',
      value: 'MacBook Pro Microphone (Built-in)',
    }
  ]
}

export const withNoDevices = () => <DeviceCheckFormBase/>;
export const withDevices = () => <DeviceCheckFormBase devices={withDevicesData}/>;