// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState } from 'react';

import getChimeContext from '../context/getChimeContext';

export default function useDevices() {
  const chime = useContext(getChimeContext());
  const [deviceSwitcherState, setDeviceUpdated] = useState({
    currentMicrophone: chime.currentAudioInputDevice,
    currentSpeaker: chime.currentAudioOutputDevice,
    currentCamera: chime.currentVideoInputDevice,
    microphoneList: chime.audioInputDevices || [],
    speakerList: chime.audioOutputDevices || [],
    cameraList: chime.videoInputDevices || [],
  });
  useEffect(() => {
    const devicesUpdatedCallback = (fullDeviceInfo) => {
      setDeviceUpdated({
        ...fullDeviceInfo
      });
    };

    chime.subscribeToDevicesUpdated(devicesUpdatedCallback);
    return () => {
      chime.unsubscribeFromDevicesUpdated(devicesUpdatedCallback);
    };
  }, [chime]);
  return deviceSwitcherState;
}
