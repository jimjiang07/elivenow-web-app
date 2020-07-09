import React from 'react';
import PropTypes from 'prop-types';
import MicrophoneButton from './MicrophoneButton';
import VideoButton from './VideoButton';
import ExitButton from './ExitButton';
import FocusButton from './FocusButton';

const ControlsGroup = ({ microphoneControl, videoControl, exitControl, focusControl = null }) => {
  return (
    <div className='ControlsGroup'>
      <MicrophoneButton {...microphoneControl}/>
      <VideoButton {...videoControl}/>
      {focusControl && <FocusButton {...focusControl}/>}
      <ExitButton {...exitControl}/>
    </div>
  )
}

const controlType = PropTypes.shape({
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
})

ControlsGroup.propTypes = {
  microphoneControl: controlType.isRequired,
  videoControl: controlType,
  exitControl: controlType,
}

export default ControlsGroup
