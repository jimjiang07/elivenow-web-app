import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from "./ControlButton";

const VideoButton = ({ isOn, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      isOn={isOn}
      tooltip={ isOn ? 'Cam On' : 'Cam Off'}
    >
      <i className="material-icons md-24">{ isOn ? 'videocam' : 'videocam_off'}</i>
    </ControlButton>
  )
}

VideoButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default VideoButton;
