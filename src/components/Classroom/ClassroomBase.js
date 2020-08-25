import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import StudentView from './StudentView';
import TeacherView from './TeacherView';
import LocalVideo from './LocalVideo';
import Controls from './Controls';
import { BaseSidebar } from './Sidebar';

import { USER_ROLES } from '../../constants';

const ClassroomBase = ({ localUserRole, focusMode }) => {
  const [sideBarCollapsed, setsideBarCollapsed] = useState(true);

  return (
    <div className="classroom">
      {localUserRole === USER_ROLES.STUDENT ? (
        <StudentView localUserRole={localUserRole} />
      ) : (
        <TeacherView localUserRole={localUserRole} />
      )}
      {sideBarCollapsed && <LocalVideo />}
      <Controls localUserRole={localUserRole} focusMode={focusMode} />
      {localUserRole === USER_ROLES.STUDENT && (
        <BaseSidebar onClick={() => setsideBarCollapsed(!sideBarCollapsed)} collapsed={sideBarCollapsed}/>
      )}
    </div>
  );
};

ClassroomBase.propTypes = {
  localUserRole: PropTypes.string.isRequired,
};

export default ClassroomBase;
