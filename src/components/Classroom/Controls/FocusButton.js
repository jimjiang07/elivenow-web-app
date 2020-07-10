import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const FocusButton = ({ isOn, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
    >
      <i className="material-icons md-24">{isOn ? 'volume_off' : 'volume_up'}</i>
    </ControlButton>
  )
}

FocusButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FocusButton;
