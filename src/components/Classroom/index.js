import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Contexts
import getMeetingContext from '../../context/getMeetingContext';
import getChimeContext from '../../context/getChimeContext';
import getTilesContext from '../../context/getTilesContext';

// Components
import ClassroomBase from './ClassroomBase';

// Hooks
import useTeacherMessage from '../../hooks/useTeacherMessage';

// Others
import { USER_ROLES } from '../../constants';

const Classroom = () => {
  const chime = useContext(getChimeContext());
  const history = useHistory();
  const { localUserRole } = useContext(getMeetingContext());
  const { observeTiles, resetObserver } = useContext(getTilesContext());

  const { focusMode } = useTeacherMessage();

  const initialSetup = useCallback(async () => {
    if (!chime || !chime.audioVideo) {
      history.push('/');
      return;
    }

    if (localUserRole === USER_ROLES.TEACHER) {
      chime.audioVideo.realtimeUnmuteLocalAudio();
    } else if (localUserRole === USER_ROLES.STUDENT) {
      chime.audioVideo.realtimeMuteLocalAudio();
    }

    if (!chime.currentVideoInputDevice) {
      throw new Error('currentVideoInputDevice does not exist');
    }

    await chime.chooseVideoInputDevice(chime.currentVideoInputDevice);

    chime.audioVideo.startLocalVideoTile();
  }, [chime, history, localUserRole]);

  useEffect(() => {
    initialSetup();
  }, [initialSetup]);

  useEffect(() => {
    console.log('observeTiles');
    observeTiles();

    return () => {
      console.log('resetObserver');
      resetObserver();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ClassroomBase localUserRole={localUserRole} focusMode={focusMode} />;
};

export default Classroom;
