import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const MicrophoneButton = ({ isOn, onClick, banned }) => {
  return (
    <ControlButton
      onClick={onClick}
      active={!banned}
    >
      <i className="material-icons md-24">{ isOn ? 'mic' : 'mic_off'}</i>
    </ControlButton>
  )
}

MicrophoneButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MicrophoneButton;
