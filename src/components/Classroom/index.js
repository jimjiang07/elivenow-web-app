import React, { useContext } from 'react';
import LocalVideo from "./LocalVideo";
import RemoteVideoGroup from "./RemoteVideoGroup";
import getMeetingContext from '../../context/getMeetingContext';
import { USER_ROLES } from '../../constants'

const Classroom = () => {
  const { localUserRole } = useContext(getMeetingContext());

  return (
    <div className="classroom">
      <RemoteVideoGroup />
      <LocalVideo />
    </div>
  )
}


export default Classroom;