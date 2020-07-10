import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const MicrophoneButton = ({ isOn, onClick, disabled }) => {
  return (
    <ControlButton
      onClick={onClick}
      disabled={disabled}
    >
      <i className="material-icons md-24">{ isOn ? 'mic' : 'mic_off'}</i>
    </ControlButton>
  )
}

MicrophoneButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

MicrophoneButton.defaultProps = {
  disabled: false,
}

export default MicrophoneButton;
