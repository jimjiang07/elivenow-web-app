import React, { useState, useContext } from 'react';

import BodyLayout from '../common/BodyLayout';
import Header from '../Header';
import CheckInForm from '../CheckInForm';
import DeviceCheckForm from '../DeviceCheckForm';
import Loading from '../Loading';

import getMeetingContext from '../../context/getMeetingContext';

const Lobby = (props) => {
  const [isMeetingInitialized, setIsMeetingInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { meetingStatus, startMeeting } = useContext(getMeetingContext());

  const onCheckInSubmit = async ({ userName, userRole }) => {
    console.log(`Creating a meeting for ${userRole} ${userName}`);

    setIsLoading(true);

    await startMeeting({ userName, userRole });

    setIsLoading(false);
    setIsMeetingInitialized(true);
  }

  return (
    <BodyLayout>
      <Header>ELiveNow Dance Room</Header>
      {
        isLoading
          ? <Loading text={'Joining class now...'}/>
          : isMeetingInitialized
            ? <DeviceCheckForm />
            : <CheckInForm onCheckInSubmit={onCheckInSubmit}/>
      }
    </BodyLayout>
  );
}

export default Lobby;