import React from 'react';
import PropTypes from 'prop-types';
import MicrophoneButton from './MicrophoneButton';
import VideoButton from './VideoButton';
import FocusButton from './FocusButton';

const ControlsGroup = ({ microphoneControl, videoControl, exitControl, focusControl = null }) => {
  return (
    <div className='ControlsGroup'>
      <MicrophoneButton {...microphoneControl}/>
      <VideoButton {...videoControl}/>
      {focusControl && <FocusButton {...focusControl}/>}
    </div>
  )
}

const controlType = PropTypes.shape({
  isOn: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
})

ControlsGroup.propTypes = {
  microphoneControl: controlType.isRequired,
  videoControl: controlType,
  exitControl: controlType,
}

export default ControlsGroup
