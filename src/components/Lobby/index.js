import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import BodyLayout from '../common/BodyLayout';
import Header from '../Header';
import CheckInForm from '../CheckInForm';

import getLocalUserContext from '../../context/getLocalUserContext';

const Lobby = (props) => {
  const history = useHistory();
  const { setLocalUserName, setLocalUserRole } = useContext(
    getLocalUserContext(),
  );

  const onCheckInSubmit = async ({ userName, userRole }) => {
    setLocalUserName(userName);
    setLocalUserRole(userRole);
    history.push('/classroom');
  };

  return (
    <BodyLayout>
      <Header>ELiveNow Dance Room</Header>
      <CheckInForm onCheckInSubmit={onCheckInSubmit} />
    </BodyLayout>
  );
};

export default Lobby;
