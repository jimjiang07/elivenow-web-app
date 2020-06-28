import React from 'react';

import BodyLayout from '../common/BodyLayout';
import Header from '../Header';
import CheckInForm from '../CheckInForm';

const Lobby = (props) => {
  return (
    <BodyLayout>
      <Header>ELiveNow Dance Room</Header>
      <CheckInForm cameraList={props.cameraList} microphoneList={props.microphoneList}/>
    </BodyLayout>
  );
}

export default Lobby;