import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const MicrophoneButton = ({ enabled, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      active={enabled}
    >
      <i className="flaticon-microphone-1" />
    </ControlButton>
  )
}

MicrophoneButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MicrophoneButton;
