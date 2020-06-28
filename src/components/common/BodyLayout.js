import React from 'react';
import PropTypes from 'prop-types';

const BodyLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      {children}
    </div>
  );
};

BodyLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BodyLayout;
