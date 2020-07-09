import React, { useContext, useEffect } from 'react';

// Contexts
import getMeetingContext from '../../context/getMeetingContext';
import getChimeContext from '../../context/getChimeContext';

// Components
import ClassroomBase from "./ClassroomBase"

// Hooks
import useFocusMode from '../../hooks/useFocusMode'

// Others
import { USER_ROLES } from '../../constants';

const Classroom = () => {
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getMeetingContext());

  useFocusMode();

  useEffect(() => {
    if (!chime) {
      return;
    }

    const joinRoomMessaging = async () => {
      await chime.joinRoomMessaging();
    };
    joinRoomMessaging();
  }, [chime]);

  useEffect(() => {
    const initialSetup = async () => {
      if (!chime || !chime.audioVideo) {
        return;
      }

      if (localUserRole === USER_ROLES.STUDENT) {
        chime.audioVideo.realtimeMuteLocalAudio();
      }
    }

    initialSetup();
  }, [chime, localUserRole])

  return (
    <ClassroomBase localUserRole={localUserRole}/>
  )
}


export default Classroom;