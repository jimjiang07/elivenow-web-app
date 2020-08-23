import React from 'react';
import PropTypes from 'prop-types';
// Components
import StudentView from './StudentView';
import TeacherView from './TeacherView';
import LocalVideo from './LocalVideo'
import Controls from './Controls';
import { StudentSideBar } from './Sidebar';

import { USER_ROLES } from '../../constants';

const ClassroomBase = ({ localUserRole, focusMode }) => {
  return (
    <div className="classroom">
      {localUserRole === USER_ROLES.STUDENT ? (
        <StudentView localUserRole={localUserRole} />
      ) : (
        <TeacherView localUserRole={localUserRole} />
      )}
      <LocalVideo />
      <Controls localUserRole={localUserRole} focusMode={focusMode} />
      {localUserRole === USER_ROLES.STUDENT && <StudentSideBar />}
    </div>
  );
};

ClassroomBase.propTypes = {
  localUserRole: PropTypes.string.isRequired,
};

export default ClassroomBase;
