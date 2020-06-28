import React from 'react';

import BodyLayout from '../common/BodyLayout';
import Header from '../Header';
import CheckInForm from '../CheckInForm';

const Lobby = () => {
  return (
    <BodyLayout>
      <Header>ELiveNow Dance Room</Header>
      <CheckInForm />
    </BodyLayout>
  );
}

export default Lobby;