// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  MeetingSessionStatusCode
} from 'amazon-chime-sdk-js';
import React, {
  useContext,
  useRef,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import get from "lodash/get";

import getChimeContext from '../context/getChimeContext';
import getMeetingContext from '../context/getMeetingContext';
import { MEETING_STATUS, DEFAULT_REGION, DEFAULT_ROOM_NAME, USER_ROLES } from '../constants'

export default function MeetingProvider(props) {
  const MeetingStatusContext = getMeetingContext();

  const { children } = props;
  const chime = useContext(getChimeContext());
  const [meetingStatus, setMeetingStatus] = useState({
    meetingStatus: MEETING_STATUS.LOADING
  });
  const [localUserRole, setLocalUserRole] = useState(USER_ROLES.STUDENT);
  const [localAttendeeId, setLocalAttendeeId] = useState();
  const history = useHistory();
  const audioElement = useRef(null);

  const startMeeting = async ({ userName, userRole }) => {
    try {
      await chime.createRoom(
        DEFAULT_ROOM_NAME,
        userName,
        DEFAULT_REGION,
        userRole,
      );

      setMeetingStatus({
        meetingStatus: MEETING_STATUS.SUCCEEDED
      });

      chime.audioVideo.addObserver({
        audioVideoDidStop: (sessionStatus) => {
          if (
            sessionStatus.statusCode() ===
            MeetingSessionStatusCode.AudioCallEnded
          ) {
            history.push('/');
            chime.leaveRoom(true);
          }
        }
      });

      await chime.joinRoom(audioElement.current);

      console.log("localAttendeeId: ", chime.configuration);

      setLocalAttendeeId(get(chime, 'configuration.credentials.attendeeId'));
      setLocalUserRole(userRole);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      setMeetingStatus({
        meetingStatus: MEETING_STATUS.FAILED,
        errorMessage: error.message
      });
    }
  };

  return (
    <MeetingStatusContext.Provider value={{
      meetingStatus,
      localUserRole,
      localAttendeeId,
      startMeeting,
    }}>
      {/* eslint-disable-next-line */}
      <audio ref={audioElement} style={{ display: 'none' }} />
      {children}
    </MeetingStatusContext.Provider>
  );
}
