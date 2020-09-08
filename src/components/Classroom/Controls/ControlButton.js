import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

const ControlButton = ({ children, onClick, disabled, color, position, tooltip, isOn }) => {
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
      {tooltip && <span class="tooltip">{tooltip}</span>}
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
