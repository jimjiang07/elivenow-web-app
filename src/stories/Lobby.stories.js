import React from 'react';

import Lobby from '../components/Lobby';

export default {
  title: 'Lobby',
  component: Lobby,
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

export const withNoDevices = () => <Lobby/>;
export const withDevices = () => <Lobby {...withDevicesData}/>;