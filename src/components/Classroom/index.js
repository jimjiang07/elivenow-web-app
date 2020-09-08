import React, { useContext } from 'react';

// Contexts
import getChimeContext from '../../context/getChimeContext';
import getLocalUserContext from '../../context/getLocalUserContext';
import getMeetingContext from '../../context/getMeetingContext';

// Components
import ClassroomBase from './ClassroomBase';
import Loading from '../Loading';

// Hooks
import useTeacherMessage from '../../hooks/useTeacherMessage';
import useDevices from "../../hooks/useDevices";

// Others
import { MEETING_STATUS } from '../../constants';

const Classroom = () => {
  const { meetingStatus } = useContext(getMeetingContext());
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getLocalUserContext());

  const { focusMode } = useTeacherMessage();
  const deviceState = useDevices();

  return (
    <>
      {meetingStatus.status === MEETING_STATUS.LOADING || !chime.currentVideoInputDevice ? (
        <Loading text={'Joining class now...'} />
      ) : (
        <ClassroomBase localUserRole={localUserRole} focusMode={focusMode} deviceState={deviceState}/>
      )}
    </>
  );
};

export default Classroom;
