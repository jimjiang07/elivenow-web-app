import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import StudentView from './StudentView';
import TeacherView from './TeacherView';
import Controls from './Controls';
import { BaseSidebar } from './Sidebar';

// Contexts
import getChimeContext from '../../context/getChimeContext';
import getTilesContext from '../../context/getTilesContext';

// Others
import { USER_ROLES } from '../../constants';

const ClassroomBase = ({ localUserRole, focusMode }) => {
  const chime = useContext(getChimeContext());
  const history = useHistory();

  const { observeTiles, resetObserver } = useContext(getTilesContext());
  const [sideBarCollapsed, setsideBarCollapsed] = useState(true);

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

  return (
    <div className="classroom">
      {localUserRole === USER_ROLES.STUDENT ? (
        <StudentView localUserRole={localUserRole} />
      ) : (
        <TeacherView localUserRole={localUserRole} />
      )}
      <Controls localUserRole={localUserRole} focusMode={focusMode} />
      <BaseSidebar
        onClick={() => setsideBarCollapsed(!sideBarCollapsed)}
        collapsed={sideBarCollapsed}
        withNoVideo={localUserRole === USER_ROLES.TEACHER}
      />
    </div>
  );
};

ClassroomBase.propTypes = {
  localUserRole: PropTypes.string.isRequired,
};

export default ClassroomBase;
