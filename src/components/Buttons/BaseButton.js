import React from 'react';
import classNames from 'classnames';

const BaseButton = ({ styleType, disabled, children, onClick }) => {
  return (
    <button
      className={classNames('base-button', {
        disabled,
        neon: !styleType || styleType === 'neon'
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
