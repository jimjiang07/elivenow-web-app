// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import getChimeContext from '../context/getChimeContext';
import getMeetingContext from '../context/getMeetingContext';
import { USER_ROLES, MESSAGE_TOPIC } from '../constants';

export default function useTeacherMessage() {
  const chime = useContext(getChimeContext());
  const history = useHistory();
  const { localUserRole } = useContext(getMeetingContext());
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const handleFocus = (message) => {
      if (localUserRole === USER_ROLES.TEACHER) {
        return;
      }

      const { focus } = message.json();

      chime.audioVideo.realtimeSetCanUnmuteLocalAudio(!focus);

      if (focus === true) {
        chime.audioVideo.realtimeMuteLocalAudio();
      }

      setFocusMode(!!focus);
    };

    const handleEndClass = () => {
      chime.leaveRoom(false);
      history.push('/');
    };

    const focusMessageUpdateCallback = {
      topic: MESSAGE_TOPIC.FOCUS,
      callback: handleFocus,
    };

    const endClassMessageUpdateCallback = {
      topic: MESSAGE_TOPIC.END_CLASS,
      callback: handleEndClass,
    };

    chime.subscribeToMessageUpdate(focusMessageUpdateCallback);
    chime.subscribeToMessageUpdate(endClassMessageUpdateCallback);
    return () => {
      chime.unsubscribeFromMessageUpdate(focusMessageUpdateCallback);
      chime.unsubscribeFromMessageUpdate(endClassMessageUpdateCallback);
    };
  }, [chime, localUserRole, history]);

  return {
    focusMode,
  };
}
