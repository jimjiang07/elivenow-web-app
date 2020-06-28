import React from 'react';
import Header from '../Header';
import CheckInForm from '../CheckInForm';

const Lobby = () => {
  return (
    <div className='Lobby'>
      <Header>ELiveNow Dance Room</Header>
      <CheckInForm />
    </div>
  );
}

export default Lobby;