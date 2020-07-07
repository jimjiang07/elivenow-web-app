import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const VideoButton = ({ enabled, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      active={enabled}
    >
      <i className='flaticon-video-camera' />
    </ControlButton>
  )
}

VideoButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default VideoButton;
