import React, { useContext } from 'react';
import getMeetingContext from '../../context/getMeetingContext';
import LocalVideo from "./LocalVideo";
import RemoteVideoGroup from "./RemoteVideoGroup";
import Controls from './Controls'

const Classroom = () => {
  const { localUserRole } = useContext(getMeetingContext());

  return (
    <div className="classroom">
      <RemoteVideoGroup localUserRole={localUserRole} />
      <LocalVideo />
      <Controls localUserRole={localUserRole} />
    </div>
  )
}


export default Classroom;