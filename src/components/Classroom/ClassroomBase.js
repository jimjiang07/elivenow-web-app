import React from 'react';
import PropTypes from 'prop-types';
// Components
import LocalVideo from "./LocalVideo";
import RemoteVideoGroup from "./RemoteVideoGroup";
import Controls from './Controls';
import { StudentSideBar } from './Sidebar'

import { USER_ROLES } from '../../constants'

const ClassroomBase = ({ localUserRole, focusMode }) => {
  return (
    <div className="classroom">
      <RemoteVideoGroup localUserRole={localUserRole} />
      <LocalVideo />
      <Controls localUserRole={localUserRole} focusMode={focusMode} />
      {localUserRole === USER_ROLES.STUDENT && <StudentSideBar />}
    </div>
  )
}

ClassroomBase.propTypes = {
  localUserRole: PropTypes.string.isRequired,
}

export default ClassroomBase;
