// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState } from 'react';

import getChimeContext from '../context/getChimeContext';
import getMeetingContext from '../context/getMeetingContext';
import { USER_ROLES } from '../constants';

export default function useFocusMode() {
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getMeetingContext());
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const callback = (message) => {
      console.log('focusModeCallback', localUserRole, message);

      if (localUserRole === USER_ROLES.TEACHER) {
        return;
      }

      const { type, payload } = message;

      if (type === 'focus' && payload) {
        chime.audioVideo.realtimeSetCanUnmuteLocalAudio(!payload.focus);

        if (payload.focus === true) {
          chime.audioVideo.realtimeMuteLocalAudio();
        }
        setFocusMode(!!payload.focus);
      }
    };
    chime.subscribeToMessageUpdate(callback);
    return () => {
      chime.unsubscribeFromMessageUpdate(callback);
    };
  }, [chime, localUserRole]);

  return focusMode;
}
