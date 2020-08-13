import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const ExitButton = ({ onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      color={'red'}
      position={'left'}
    >
      <i className="material-icons md-24">highlight_off</i>
      <span>LEAVE CLASS</span>
    </ControlButton>
  )
}

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ExitButton;
