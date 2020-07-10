import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const ExitButton = ({ onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
    >
      <i className="material-icons md-24">exit_to_app</i>
    </ControlButton>
  )
}

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ExitButton;
