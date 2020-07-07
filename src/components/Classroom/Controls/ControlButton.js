import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import './ControlButton.css'

const ControlButton = ({ children, onClick, active }) => {
  return (
    <button
      type="button"
      className={classNames('ControlButton', {
        active,
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

export default ControlButton;
