import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

const ControlButton = ({ children, onClick, disabled, color, position, isOn }) => {
  return (
    <button
      type="button"
      className={classNames('ControlButton', {
        disabled,
        'ripple': !disabled,
        'red': color === 'red',
        'left': position === 'left',
        'isOff': isOn !== undefined && !isOn
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

ControlButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

ControlButton.defaultProps = {
  disabled: false,
  children: {}
}

export default ControlButton;
