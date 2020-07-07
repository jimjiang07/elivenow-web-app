import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const ExitButton = ({ enabled, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      active={enabled}
    >
      <i className='flaticon-exit' />
    </ControlButton>
  )
}

ExitButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ExitButton;
