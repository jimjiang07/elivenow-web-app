// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState, useCallback } from 'react';

import getChimeContext from '../context/getChimeContext';
import getMeetingContext from '../context/getMeetingContext';
import { USER_ROLES } from '../constants';

export default function useTeacherMessage() {
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getMeetingContext());
  const [focusMode, setFocusMode] = useState(false);

  const handleFocus = useCallback(({ payload }) => {
    if (localUserRole === USER_ROLES.TEACHER) {
      return;
    }

    chime.audioVideo.realtimeSetCanUnmuteLocalAudio(!payload.focus);

    if (payload.focus === true) {
      chime.audioVideo.realtimeMuteLocalAudio();
    }

    setFocusMode(!!payload.focus);
  }, [chime.audioVideo, localUserRole]);

  useEffect(() => {
    const callback = (message) => {
      const { type, payload } = message;

      if (!type || !payload) {
        return;
      }

      if (type === 'focus') {
        handleFocus(message);
      }
    };
    chime.subscribeToMessageUpdate(callback);
    return () => {
      chime.unsubscribeFromMessageUpdate(callback);
    };
  }, [chime, localUserRole, handleFocus]);

  return {
    focusMode,
  };
}
