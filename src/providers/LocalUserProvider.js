import React, { useState } from 'react';

import getLocalUserContext from '../context/getLocalUserContext';
import { USER_ROLES } from '../constants';

export default function LocalUserProvider(props) {
  const { children } = props;
  const LocalUserContext = getLocalUserContext();
  const [localUserName, setLocalUserName] = useState(USER_ROLES.STUDENT);
  const [localUserRole, setLocalUserRole] = useState(USER_ROLES.STUDENT);
  const [localAttendeeId, setLocalAttendeeId] = useState();

  return (
    <LocalUserContext.Provider
      value={{
        localUserName,
        localUserRole,
        localAttendeeId,
        setLocalUserName,
        setLocalUserRole,
        setLocalAttendeeId,
      }}
    >
      {children}
    </LocalUserContext.Provider>
  );
}
