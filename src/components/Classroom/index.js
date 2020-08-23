import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Contexts
import getMeetingContext from '../../context/getMeetingContext';
import getChimeContext from '../../context/getChimeContext';

// Components
import ClassroomBase from "./ClassroomBase"

// Hooks
import useTeacherMessage from '../../hooks/useTeacherMessage'

// Others
import { USER_ROLES } from '../../constants';

const Classroom = () => {
  const chime = useContext(getChimeContext());
  const history = useHistory();
  const { localUserRole } = useContext(getMeetingContext());

  const { focusMode } = useTeacherMessage();

  useEffect(() => {
    const initialSetup = async () => {
      if (!chime || !chime.audioVideo) {
        history.push('/');
        return;
      }

      const joinRoomMessaging = async () => {
        await chime.joinRoomMessaging();
      };
      joinRoomMessaging();

      if (localUserRole === USER_ROLES.TEACHER) {
        chime.audioVideo.realtimeUnmuteLocalAudio();
      } else if (localUserRole === USER_ROLES.STUDENT) {
        chime.audioVideo.realtimeMuteLocalAudio();
      }
    }

    initialSetup();
  }, [chime, history, localUserRole])

  return (
    <ClassroomBase localUserRole={localUserRole} focusMode={focusMode} />
  )
}


export default Classroom;