// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import getChimeContext from '../../../context/getChimeContext';
import ControlsGroup from "./ControlsGroup";

import { USER_ROLES } from '../../../constants'

export default function Controls({ localUserRole, focusMode }) {
  const chime = useContext(getChimeContext());
  const history = useHistory();
  const [microphoneEnabled, setMicrophoneEnabled] = useState(localUserRole === USER_ROLES.TEACHER);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!chime) {
      return;
    }

    const callback = (localMuted) => {
      setMicrophoneEnabled(!localMuted);
    };

    chime.audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(callback);

    return () => {
      if (chime && chime.audioVideo) {
        chime.audioVideo.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(callback);
      }
    };
  }, [chime]);

  const onMicrophoneButtonClick = () => {
    if (microphoneEnabled) {
      chime.audioVideo.realtimeMuteLocalAudio();
    } else {
      chime.audioVideo.realtimeUnmuteLocalAudio();
    }
  }

  const onVideoButtonClick = async () => {
    if (!videoEnabled) {
      setVideoEnabled(true);
      try {
        await chime.chooseCurrentVideoInputDevice();
        chime.audioVideo.startLocalVideoTile();
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        setVideoEnabled(false);
      }
    } else if (videoEnabled) {
      setVideoEnabled(false);
      chime.audioVideo.stopLocalVideoTile();
    }
  }

  const onExitButtonClick = () => {
    setVideoEnabled(false);
    chime.leaveRoom(localUserRole === USER_ROLES.TEACHER);
    history.push('/');
  }

  const onFocusButtonClick = () => {
    const newFocusState = !focus;
    chime.sendMessage('focus', { focus: newFocusState });
    setFocus(newFocusState);
  }

  return (
    <ControlsGroup
      microphoneControl={{
        isOn: microphoneEnabled,
        banned: focusMode,
        onClick: onMicrophoneButtonClick,
      }}
      videoControl={{
        isOn: videoEnabled,
        onClick: onVideoButtonClick,
      }}
      focusControl={ localUserRole === USER_ROLES.TEACHER ? {
        isOn: focus,
        onClick: onFocusButtonClick,
      } : null}
      exitControl={{
        onClick: onExitButtonClick,
      }}
    />
  );
}
