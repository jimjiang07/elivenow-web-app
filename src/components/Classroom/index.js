import React, { useContext } from 'react';
import LocalVideo from "./LocalVideo";
import RemoteVideoGroup from "./RemoteVideoGroup";
import getMeetingContext from '../../context/getMeetingContext';

const Classroom = () => {
  const { localUserRole } = useContext(getMeetingContext());

  return (
    <div className="classroom">
      <RemoteVideoGroup localUserRole={localUserRole} />
      <LocalVideo />
    </div>
  )
}


export default Classroom;