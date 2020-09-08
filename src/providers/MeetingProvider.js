// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { MeetingSessionStatusCode } from 'amazon-chime-sdk-js';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';

import getChimeContext from '../context/getChimeContext';
import getMeetingContext from '../context/getMeetingContext';
import getLocalUserContext from '../context/getLocalUserContext';
import {
  MEETING_STATUS,
  DEFAULT_REGION,
  DEFAULT_ROOM_NAME,
} from '../constants';

export default function MeetingProvider(props) {
  const MeetingStatusContext = getMeetingContext();

  const { children } = props;
  const chime = useContext(getChimeContext());
  const { localUserName, localUserRole, setLocalAttendeeId } = useContext(
    getLocalUserContext(),
  );

  const [meetingStatus, setMeetingStatus] = useState({
    status: MEETING_STATUS.LOADING,
  });

  const history = useHistory();
  const audioElement = useRef(null);

  useEffect(() => {
    const startMeeting = async () => {
      try {
        await chime.createRoom(
          DEFAULT_ROOM_NAME,
          localUserName,
          DEFAULT_REGION,
          localUserRole,
        );

        setMeetingStatus({
          status: MEETING_STATUS.SUCCEEDED,
        });

        chime.audioVideo.addObserver({
          audioVideoDidStop: (sessionStatus) => {
            if (
              sessionStatus.statusCode() ===
              MeetingSessionStatusCode.AudioCallEnded
            ) {
              history.push('/');
              chime.leaveRoom(false);
            }
          },
        });

        await chime.joinRoom(audioElement.current);

        console.log('localAttendeeId: ', chime.configuration);

        setLocalAttendeeId(get(chime, 'configuration.credentials.attendeeId'));
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        setMeetingStatus({
          status: MEETING_STATUS.FAILED,
          errorMessage: error.message,
        });
      }
    };

    startMeeting();
  }, []);

  return (
    <MeetingStatusContext.Provider
      value={{
        meetingStatus,
      }}
    >
      {/* eslint-disable-next-line */}
      <audio ref={audioElement} style={{ display: 'none' }} />
      {children}
    </MeetingStatusContext.Provider>
  );
}
