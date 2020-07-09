import React from 'react';
import PropTypes from 'prop-types';
// Components
import LocalVideo from "./LocalVideo";
import RemoteVideoGroup from "./RemoteVideoGroup";
import Controls from './Controls';

const ClassroomBase = ({ localUserRole }) => {
  return (
    <div className="classroom">
      <RemoteVideoGroup localUserRole={localUserRole} />
      <LocalVideo />
      <Controls localUserRole={localUserRole} />
    </div>
  )
}

ClassroomBase.propTypes = {
  localUserRole: PropTypes.string.isRequired,
}

export default ClassroomBase;
