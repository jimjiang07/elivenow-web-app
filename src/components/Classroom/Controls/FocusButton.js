import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const FocusButton = ({ enabled, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      active={enabled}
    >
      <i className='flaticon-chat' />
    </ControlButton>
  )
}

FocusButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FocusButton;
