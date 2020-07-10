import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

const ControlButton = ({ children, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={classNames('ControlButton', {
        disabled,
        'ripple': !disabled,
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
